
/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { ArrayEntry, Codec, Crypto, Hash} from "..";
import { ReturnCode } from "../primitives/alias";
import { NullHash, Storage } from "./storage";

const STATUS_UNCHANGED: u8 = 0;
const STATUS_MODIFIED: u8 = 1;
const STATUS_DELETED: u8 = 2;
const STATUS_ADDED: u8 = 3;

class ArrayStorage <T extends Codec> {
    valueSlots: Array<T | null>;
    statusSlots: Array<u8>;
    initialLength: i32;

    constructor(capacity: i32, initLen: i32) {
        this.valueSlots = new Array<T | null>(capacity);
        this.statusSlots = new Array<u8>(capacity);
        for (let i = 0; i < capacity; ++i) {
            this.valueSlots[i] = null;
            this.statusSlots[i] = STATUS_UNCHANGED;
        }

        this.initialLength = initLen;
    }

    get length(): i32 { return this.valueSlots.length; }
    get originLength(): i32 { return this.originLength; }
    get statusLength(): i32 { return this.statusSlots.length; }

    push(v: T): i32 {
        this.valueSlots.push(v);
        // pop value make status slot with hole
        if (this.statusSlots.length >= this.valueSlots.length && this.statusSlots[this.valueSlots.length - 1] == STATUS_DELETED) {
            this.statusSlots[this.valueSlots.length - 1] = STATUS_MODIFIED;
        } else {
            this.statusSlots.push(STATUS_ADDED);
        }

        return this.valueSlots.length - 1;
    }

    pop(): T | null {
        if (this.valueSlots.length == this.initialLength) {
            this.initialLength -= 1;
        }

        this.statusSlots[this.valueSlots.length - 1] = STATUS_DELETED;
        return this.valueSlots.pop();
    }

    status(index: i32): u8 {
        assert(index < this.statusSlots.length, "out of status slots bounds");
        return this.statusSlots[index];
    }
    // after read value from storage, set to
    set(index: i32, v: T): void {
        this.valueSlots[index] = v;
    }
    // update value
    update(index: i32, v: T): void {
        this.valueSlots[index] = v;
        this.statusSlots[index] = STATUS_MODIFIED;
    }

    get(index: i32): T | null {
        return this.valueSlots[index];
    }

    delete(index: i32): bool {
        this.valueSlots.splice(index, 1);
        this.statusSlots.splice(index, 1);

        if (index < this.initialLength) {
            this.initialLength -= 1;
            return true;
        }
        return false;
    }
}

export class SpreadStorableArray<T extends Codec> implements Codec {
    [key: number]: T;

    protected keyPrefix: Hash;
    protected arrayStorage: ArrayStorage<T>;
    protected isLazy: bool;

    constructor(prefix: Hash = NullHash, lazy: bool = true, capacity: i32 = 0) {
        this.keyPrefix = prefix;
        this.isLazy = lazy;

        this.initArrayStorage(capacity);
    }

    toU8a(): u8[] {
        return this.keyPrefix.toU8a();
    }

    encodedLength(): i32 {
        return this.keyPrefix.encodedLength();
    }

    populateFromBytes(bytes: u8[], index: i32): void {
        this.keyPrefix = new Hash();
        this.keyPrefix.populateFromBytes(bytes, index);
        this.initArrayStorage(0);
    }

    eq(other: SpreadStorableArray<T>): bool {
        return this.keyPrefix == other.keyPrefix;
    }

    notEq(other: SpreadStorableArray<T>): bool {
        return !this.eq(other);
    }

    get length(): i32 {
        let len = this.arrayStorage.length;
        if (len == 0) {
            let entry = this.loadArrayEntry();
            if (entry) len = entry.arrayLength;
        }
        return len;
    }

    get entryKey(): Hash {
        return this.keyPrefix;
    }

    set entryKey(hash: Hash) {
        this.keyPrefix = hash;
    }

    @operator("[]")
    private __get(index: i32): T | null {
        return this.at(index);
    }

    @operator("[]=")
    private __set(index: i32, value: T): void {
        this.updateValueAt(index, value);
    }


    push(value: T): i32 {
        return this.pushValue(value);
    }

    pop(): T | null {
        return this.popValue();
    }

    delete(index: i32): void {
        this.deleteValueAt(index);
    }

    at(index: i32): T | null {
        assert(index < this.arrayStorage.length, "out of bounds");
        return this.visitValueAt(index);
    }

    protected pushValue(value: T): i32 {
        let index = this.arrayStorage.push(value);

        if (!this.isLazy) {
            this.storeValueToNative(index, value);
            this.storeArrayEntry();
        }

        return index;
    }

    protected popValue(): T | null {
        assert(this.arrayStorage.length > 0, "can not pop from empty array.");

        let t = this.arrayStorage.pop();

        if (!this.isLazy) {
            this.deleteValueAtNative(this.arrayStorage.length);
            this.storeArrayEntry();
        }
        return t;
    }

    protected updateValueAt(index: i32, value: T): void {
        assert(index < this.arrayStorage.length, "set out of bounds");

        this.arrayStorage.update(index, value);

        if (!this.isLazy) {
            this.storeValueToNative(index, value);
        }
    }

    protected deleteValueAt(index: i32): void {
        assert(index < this.arrayStorage.length, "delete out of bounds");

        this.arrayStorage.delete(index);
        // FIXME(liangqin.fan): save to native immediately if you delete element in an array.
        let endIndex = this.isLazy ? this.arrayStorage.originLength : this.arrayStorage.length;

        for (let i = index; i <= endIndex; i++) {
            this.deleteValueAtNative(index);
        }

        for (let i = index; i < endIndex; i++) {
            this.storeValueToNative(index, this.arrayStorage.get(i)!);
        }
        this.storeArrayEntry();
    }

    protected visitValueAt(index: i32): T | null {
        let v = this.arrayStorage.get(index);

        if (v == null) {
            let v = this.loadValueFromNative(index);
            if (!v) return null;

            this.arrayStorage.set(index, v);
        }

        return v;
    }

    private initArrayStorage(capacity: i32): void {
        let v = this.loadArrayEntry();
        if (v) {
            this.arrayStorage = new ArrayStorage<T>(capacity, v.arrayLength);
        } else {
            this.arrayStorage = new ArrayStorage<T>(capacity, -1);
        }
    }

    protected loadArrayEntry(): ArrayEntry | null {
        if (this.keyPrefix.eq(NullHash)) return null;

        let strg = new Storage(Crypto.blake256s(this.keyPrefix.toString() + ".length"));
        let entryInfo = strg.load<ArrayEntry>();
        return entryInfo;
    }

    protected storeArrayEntry(storedBytes: i32 = 0): ReturnCode {
        let entryHash = Crypto.blake256s(this.keyPrefix.toString() + ".length");
        let strg = new Storage(entryHash);
        let v: ArrayEntry = new ArrayEntry(
            this.arrayStorage.length,
            storedBytes
        );
        let r = strg.store(v);
        return r;
    }

    protected indexToHashKey(index: i32): Hash {
        return Crypto.blake256s(this.keyPrefix.toString() + index.toString());
    }

    private storeValueToNative(index: i32, v: T): ReturnCode {
        let strg = new Storage(this.indexToHashKey(index));
        return strg.store(v);
    }

    private loadValueFromNative(index: i32): T | null {
        let strg = new Storage(this.indexToHashKey(index));
        return strg.load<T>();
    }

    private deleteValueAtNative(index: i32): void {
        let strg = new Storage(this.indexToHashKey(index));
        strg.clear();
    }

    __commit_storage__(): void {
        if (this.isLazy) {
            let endIndex = this.arrayStorage.statusLength;
            for (let i = 0; i < endIndex; ++i) {
                let status = this.arrayStorage.status(i);
                if (status == STATUS_ADDED || status == STATUS_MODIFIED) {
                    this.storeValueToNative(i, this.arrayStorage.get(i)!);
                } else if (status == STATUS_DELETED) {
                    this.deleteValueAtNative(i);
                }
            }
        }
    }
}
