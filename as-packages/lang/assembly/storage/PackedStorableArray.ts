
/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { ReturnCode } from "pl-as-contract-runtime";
import { ArrayEntry, Codec, Hash } from "..";
import { Crypto } from "../primitives/crypto";
import { NullHash, Storage } from "./storage";

/**
 * @class PackedStorableArray
 *
 * This class stores the `packed` contents of a storable array.
 * `packed` means all items of this array are stored in one slot,
 * and any store and load operation will impact all items.
 * So, it is used in the situation of little items, or sometimes you know what happened backend.
 *
 * There are 3 properties:
 * @property keyPrefix The hash of store point of this array
 * @property isLazy Bool value, the store mode of this array, refer to `QuickStart.md` for more details about store mode.
 * @property arrayInner Array of T, it stores the elements in an array.
 */
export class PackedStorableArray<T extends Codec> implements Codec {
    [key: number]: T;

    protected keyPrefix: Hash;
    protected isLazy: bool;
    protected arrayInner: Array<T>;
    private synced: bool;

    constructor(prefix: Hash = NullHash, lazy: bool = true, capacity: i32 = 0) {
        this.keyPrefix = prefix;
        this.isLazy = lazy;
        this.arrayInner = new Array<T>(capacity);
        this.synced = false;
        this.loadAllItems();
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
    }

    eq(other: PackedStorableArray<T>): bool {
        return this.keyPrefix == other.keyPrefix;
    }

    notEq(other: PackedStorableArray<T>): bool {
        return !this.eq(other);
    }

    private __entryHash(): Hash {
        return Crypto.blake256s(this.keyPrefix.toString() + ".length");
    }

    protected loadArrayEntry(): ArrayEntry | null {
        let strg = new Storage(this.__entryHash());
        let entryInfo = strg.load<ArrayEntry>();
        return entryInfo;
    }

    protected storeArrayEntry(storedBytes: i32 = 0): ReturnCode {
        let strg = new Storage(this.__entryHash());
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
     * To get the length of arrayInner.
     *
     * @readonly
     * @type {i32}
     * @memberof PackedStorableArray
     */
    get length(): i32 {
        return this.arrayInner.length;
    }
    /**
     * To get the hash of store point
     *
     * @type {Hash}
     * @memberof PackedStorableArray
     */
    get entryKey(): Hash {
        return this.keyPrefix;
    }
    /**
     * To set the hash of store point
     *
     * @memberof PackedStorableArray
     */
    set entryKey(hash: Hash) {
        this.keyPrefix = hash;
    }

    /**
     * To get a specific element of array,
     * throws if out of bounds.
     *
     * @param index the index of element to get
     * @returns T
     */
    @operator("[]")
    private __get(index: i32): T {
        return this.at(index);
    }
    /**
     * To set or update an element,
     * throws if out of bounds
     *
     * @param index the index of element to set or update
     * @param value the value to set
     */
    @operator("[]=")
    private __set(index: i32, value: T): void {
        this.setValueAt(index, value);
    }

    /**
     * To push an element at the end of array
     *
     * @param value the value to pushed at the end of array .
     * @returns the length of array
     */
    push(value: T): i32 {
        return this.pushValue(value);
    }
    /**
     * To pop an element from the array,
     * if array is empty, then throws
     * @returns T
     */
    pop(): T {
        return this.popValue();
    }
    /**
     * To delete an item at specific position, all elements after if will moved forward
     * It is a heavy operation.
     * throws if index out of bounds.
     *
     * @param index the index to delete
     * @returns bool, means operation successful or failed
     */
    delete(index: i32): bool {
        return this.deleteValueAt(index);
    }
    /**
     * To get a specific element of array,
     * throws if out of bounds.
     *
     * @param index the index of element to get
     * @returns T
     */
    at(index: i32): T {
        assert(index < this.arrayInner.length, "out of bounds");
        return this.visitValueAt(index);
    }

    // to sotre this instance as packed,
    // use hash of this.keyPrefix as storage key.
    private storeAllItems(): i32 {
        let length = this.arrayInner.length;
        let buffer = new Array<u8>();
        for (let i = 0; i < length; i++) {
            let v = this.arrayInner[i].toU8a();
            buffer = buffer.concat(v);
        }

        (new Storage(this.keyPrefix)).storeRaw(buffer);
        return buffer.length;
    }

    private loadAllItems(): this {
        if (this.synced) return this;

        let sai = this.loadArrayEntry();
        if (sai && sai.arrayLength > 0) {
            this.arrayInner.length = sai.arrayLength;
            let startIndex = 0;
            let rawBytes = (new Storage(this.keyPrefix)).loadRaw(sai.rawBytesCount);
            for (let i = 0; i < this.arrayInner.length; i++) {
                let v = instantiate<T>();
                v.populateFromBytes(rawBytes, startIndex);
                startIndex += v.encodedLength();

                this.arrayInner[i] = v;
            }
        }
        this.synced = true;
        return this;
    }

    protected pushValue(value: T): i32 {
        let newlen: i32 = 0;
        newlen = this.arrayInner.push(value);

        if (!this.isLazy) this.__commit_storage__();

        return newlen;
    }

    protected popValue(): T {
        assert(this.arrayInner.length > 0, "can not pop from empty array.");
        let t = this.arrayInner.pop();

        if (!this.isLazy) this.__commit_storage__();

        return t;
    }

    protected setValueAt(index: i32, value: T): void {
        assert(index < this.arrayInner.length, "out of bounds");

        if (this.arrayInner[index].notEq(value)) {
            this.arrayInner[index] = value;

            if (!this.isLazy) this.__commit_storage__();
        }
    }

    protected deleteValueAt(index: i32): bool {
        this.arrayInner[index] = instantiate<T>();

        if (!this.isLazy) this.__commit_storage__();

        return true;
    }

    protected visitValueAt(index: i32): T {
        return this.arrayInner[index];
    }

    protected storeItemsFrom(index: i32): void {
        index = 0; // to supress warning
        if (!this.isLazy) this.__commit_storage__();
    }

    protected loadItemsFrom(index: i32): void {
        index = 0; // to supress warning
        this.loadAllItems();
    }

    __commit_storage__(): void {
        let bytesCount = this.storeAllItems();
        this.storeArrayEntry(bytesCount);
    }
}
