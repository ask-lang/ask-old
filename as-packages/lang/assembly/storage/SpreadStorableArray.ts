
/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { ArrayEntry, Codec, Crypto, Hash, Log } from "..";
import { ReturnCode } from "../primitives/alias";
import { NullHash, Storage } from "./storage";

/**
 * @class SpreadStorableArray
 *
 * This class stores an array,
 * `spread` means each item will store at a spread place,
 * and update or set operations only impact its own value,
 * it is the main different with `PackedStorableArray`.
 *
 * There are 3 properties:
 * @property keyPrefix The hash of store point of this array
 * @property isLazy Bool value, the store mode of this array, refer to `QuickStart.md` for more details about store mode.
 * @property arrayStorage ArrayStorage of T, it stores the elements in an array.
 */
export class SpreadStorableArray<T extends Codec> implements Codec {
    [key: number]: T;

    protected keyPrefix: Hash;
    protected arrayInner: Array<T>;
    private synced: bool;

    constructor(prefix: Hash = NullHash, lazy: bool = true, capacity: i32 = 0) {
        this.keyPrefix = prefix;
        this.arrayInner = new Array<T>(capacity);

        if (prefix.notEq(NullHash) && capacity == 0) {
            this.initArrayInner();
        }

        this.synced = false;
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
        if (this.keyPrefix.notEq(NullHash)) this.initArrayInner();
    }

    eq(other: SpreadStorableArray<T>): bool {
        return this.keyPrefix == other.keyPrefix;
    }

    notEq(other: SpreadStorableArray<T>): bool {
        return !this.eq(other);
    }

    private initArrayInner(): void {
        let v = this.loadArrayEntry();
        if (v) { this.arrayInner.length = v.arrayLength; }
    }

    protected loadArrayEntry(): ArrayEntry | null {
        let strg = new Storage(Crypto.blake256s(this.keyPrefix.toString() + ".length"));
        let entryInfo = strg.load<ArrayEntry>();
        return entryInfo;
    }

    protected storeArrayEntry(storedBytes: i32 = 0): ReturnCode {
        let entryHash = Crypto.blake256s(this.keyPrefix.toString() + ".length");
        let strg = new Storage(entryHash);
        let v: ArrayEntry = new ArrayEntry(
            this.arrayInner.length,
            storedBytes
        );
        let r = strg.store(v);
        return r;
    }

    protected indexToHashKey(index: i32): Hash {
        return Crypto.blake256s(this.keyPrefix.toString() + index.toString());
    }
    /**
       * To get the length of this array
       *
       * @readonly
       * @type {i32}
       * @memberof SpreadStorableArray
       */
    get length(): i32 {
        let len = this.arrayInner.length;
        if (len == 0) {
            let entry = this.loadArrayEntry();
            if (entry) len = entry.arrayLength;
        }
        return len;
    }
    /**
       * To get the store point of this array
       *
       * @type {Hash}
       * @memberof SpreadStorableArray
       */
    get entryKey(): Hash {
        return this.keyPrefix;
    }
    /**
       * To set the store point of this array
       *
       * @memberof SpreadStorableArray
       */
    set entryKey(hash: Hash) {
        this.keyPrefix = hash;
    }

    @operator("[]")
    private __get(index: i32): T | null {
        return this.at(index);
    }

    @operator("[]=")
    private __set(index: i32, value: T): void {
        this.setValueAt(index, value);
    }

    /**
     * To push value to the end of array
     * @param value value to be pushed to the end of this array
     * @returns the length of this array after pushing
     */
    push(value: T): i32 {
        return this.pushValue(value);
    }
    /**
     * To pop an item from the end of array
     * @returns T if array is not empty, otherwise null
     */
    pop(): T | null {
        return this.popValue();
    }
    /**
     * To delete an item from this array, items after the index will be moved forward.
     *
     * @param index item to be deleted
     */
    delete(index: i32): bool {
        return this.deleteValueAt(index);
    }
    /**
     * To access an item at specific index,
     * throws if index out of bounds.
     *
     * @param index access item at specific index
     * @returns T if value at this index is set, null if not set.
     */
    at(index: i32): T | null {
        assert(index < this.arrayInner.length, "out of bounds");
        return this.visitValueAt(index);
    }

    private storeValueAt(index: i32): ReturnCode {
        let strg = new Storage(this.indexToHashKey(index));
        return strg.store(this.arrayInner[index]);
    }

    private loadValueAt(index: i32): T | null {
        let strg = new Storage(this.indexToHashKey(index));
        return strg.load<T>();
    }

    private clearValueAt(index: i32): void {
        let strg = new Storage(this.indexToHashKey(index));
        strg.clear();
    }

    pushValue(value: T): i32 {
        let newlen: i32 = 0;
        newlen = this.arrayInner.push(value);
        this.storeValueAt(newlen - 1);
        this.storeArrayEntry();
        return newlen;
    }

    popValue(): T {
        assert(this.arrayInner.length > 0, "can not pop from empty array.");
        let t = this.arrayInner.pop();
        this.clearValueAt(this.arrayInner.length - 1);
        this.storeArrayEntry();
        return t;
    }

    setValueAt(index: i32, value: T): void {
        assert(index < this.arrayInner.length, "out of bounds");

        if (this.arrayInner[index].notEq(value)) {
            this.arrayInner[index] = value;
            this.storeValueAt(index);
        }
    }

    deleteValueAt(index: i32): bool {
        let deleted = this.loadValueAt(index);
        if (!deleted) return false;

        this.arrayInner[index] = instantiate<T>();
        this.clearValueAt(index);
        this.storeArrayEntry();

        return true;
    }

    visitValueAt(index: i32): T {
        let v = this.loadValueAt(index);
        if (!v) return instantiate<T>();

        this.arrayInner[index] = v;
        return this.arrayInner[index];
    }

    storeItemsFrom(index: i32): void {
        for (let i = index; i < this.arrayInner.length; ++i) {
            this.storeValueAt(i);
        }
        this.storeArrayEntry();
    }

    loadItemsFrom(index: i32): void {
        if (this.synced) return;

        for (let i = index; i < this.arrayInner.length; ++i) {
            let v = this.loadValueAt(i);
            if (!v) v = instantiate<T>();
            this.arrayInner[i] = v;
        }

        this.synced = true;
    }

    __commit_storage__(): void {
        // if (this.isLazy) {
        //     let endIndex = this.arrayStorage.statusLength;
        //     for (let i = 0; i < endIndex; ++i) {
        //         let status = this.arrayStorage.status(i);
        //         if (status == STATUS_ADDED || status == STATUS_MODIFIED) {
        //             this.storeValueToNative(i, this.arrayStorage.get(i)!);
        //         } else if (status == STATUS_DELETED) {
        //             this.deleteValueAtNative(i);
        //         }
        //     }
        // }
    }
}
