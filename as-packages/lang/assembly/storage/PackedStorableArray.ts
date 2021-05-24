
/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { ReturnCode } from "as-contract-runtime";
import { ArrayEntry, Codec, Hash, ScaleString } from "..";
import { Crypto } from "../primitives/crypto";
import { Storage } from "./storage";

export class PackedStorableArray<T extends Codec> implements Codec {
    [key: number]: T;

    protected keyPrefix: string;
    protected arrayInner: Array<T>;
  private synced: bool;
  constructor(prefix: string = "", capacity: i32 = 0) {
      this.keyPrefix = prefix;
      this.arrayInner = new Array<T>(capacity);
      this.synced = false;
      this.loadAllItems();
  }

  toU8a(): u8[] {
      return (new ScaleString(this.keyPrefix)).toU8a();
  }

  encodedLength(): i32 {
      return (new ScaleString(this.keyPrefix)).encodedLength();
  }

  populateFromBytes(bytes: u8[], index: i32): void {
      let s: ScaleString = new ScaleString();
      s.populateFromBytes(bytes, index);
      this.keyPrefix = s.toString();
  }

  eq(other: PackedStorableArray<T>): bool {
      return this.keyPrefix == other.keyPrefix;
  }

  notEq(other: PackedStorableArray<T>): bool {
      return !this.eq(other);
  }

  protected loadArrayEntry(): ArrayEntry | null {
      let strg = new Storage(Crypto.blake256s(this.keyPrefix + ".length"));
      let entryInfo = strg.load<ArrayEntry>();
      return entryInfo;
  }

  protected storeArrayEntry(storedBytes: i32 = 0): ReturnCode {
      let entryHash = Crypto.blake256s(this.keyPrefix + ".length");
      let strg = new Storage(entryHash);
      let v: ArrayEntry = new ArrayEntry(
          this.arrayInner.length,
          storedBytes
      );
      let r = strg.store(v);
      return r;
  }

  protected indexToHashKey(index: i32): Hash {
      return Crypto.blake256s(this.keyPrefix + index.toString());
  }

  get length(): i32 {
      return this.arrayInner.length;
  }

  get entryKey(): string {
      return this.keyPrefix;
  }

  set entryKey(str: string) {
      this.keyPrefix = str;
  }

  @operator("[]")
  private __get(index: i32): T {
      return this.at(index);
  }

  @operator("[]=")
  private __set(index: i32, value: T): void {
      this.setValueAt(index, value);
  }


  push(value: T): i32 {
      return this.pushValue(value);
  }

  pop(): T {
      return this.popValue();
  }

  delete(index: i32): bool {
      return this.deleteValueAt(index);
  }

  at(index: i32): T {
      assert(index < this.arrayInner.length, "out of bounds");
      return this.visitValueAt(index);
  }

  fill(value: T, start: i32 = 0, end: i32 = i32.MAX_VALUE): this {
      this.arrayInner.fill(value, start, end);
      this.storeItemsFrom(start);
      return this;
  }

  every(callbackfn: (element: T, index: i32, array?: Array<T>) => bool): bool {
      for (let i = 0; i < this.arrayInner.length; i++) {
          let v = this.at(i);
          if (!callbackfn(v, i, this.arrayInner)) return false;
      }
      return true;
  }

  findIndex(predicate: (element: T, index: i32, array?: Array<T>) => bool): i32 {
      let index = this.arrayInner.findIndex(predicate);
      if (index != -1) return index;

      for (let i = 0; i < this.arrayInner.length; i++) {
          let v = this.at(i);
          if (predicate(v, i, this.arrayInner))
              return i;
      }
      return -1;
  }

  includes(searchElement: T, fromIndex: i32 = 0): bool {
      return this.indexOf(searchElement, fromIndex) >= 0;
  }

  indexOf(searchElement: T, fromIndex: i32 = 0): i32 {
      let index = this.arrayInner.indexOf(searchElement, fromIndex);
      if (index != -1) return index;

      for (let i = fromIndex; i < this.arrayInner.length; i++) {
          if (this.at(i).eq(searchElement)) return i;
      }

      return -1;
  }

  lastIndexOf(searchElement: T, fromIndex: i32 = 0): i32 {
      let index = this.arrayInner.lastIndexOf(searchElement, fromIndex);
      if (index != -1) return index;

      let length = this.arrayInner.length;
      if (length == 0) return -1;
      if (fromIndex < 0) fromIndex = length + fromIndex;
      else if (fromIndex >= length) fromIndex = length - 1;
      while(fromIndex >= 0) {
          let v = this.at(fromIndex);
          if (v.eq(searchElement)) return fromIndex;
          --fromIndex;
      }
      return -1;
  }

  concat(items: T[]): T[] {
      let oldlen = this.arrayInner.length;
      this.arrayInner = this.arrayInner.concat(items);
      this.storeItemsFrom(oldlen);

      return this.arrayInner;
  }

  forEach(callbackfn: (value: T, index: i32, array: Array<T>) => void): void {
      for (let i = 0; i < this.arrayInner.length; i++) {
          let v = this.at(i);
          callbackfn(v, i, this.arrayInner);
      }
  }

  map<U>(callbackfn: (value: T, index: i32, array: Array<T>) => U): Array<U> {
      let uarr = new Array<U>(this.arrayInner.length);
      for (let i = 0; i < this.arrayInner.length; i++) {
          let v = this.at(i);
          let mv = callbackfn(v, i, this.arrayInner);
          uarr.push(mv);
      }
      return uarr;
  }

  filter(callbackfn: (value: T, index: i32, array: Array<T>) => bool): Array<T> {
      let uarr = new Array<T>();
      for (let i = 0; i < this.arrayInner.length; i++) {
          let v = this.at(i);
          if (callbackfn(v, i, this.arrayInner)) {
              uarr.push(v);
          }
      }
      return uarr;
  }

  reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: i32, array: Array<T>) => U, initialValue: U): U {
      return this.arrayInner.reduce<U>(callbackfn, initialValue);
  }

  reduceRight<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: i32, array: Array<T>) => U, initialValue: U): U {
      return this.arrayInner.reduceRight<U>(callbackfn, initialValue);
  }

  some(callbackfn: (element: T, index: i32, array?: Array<T>) => bool): bool {
      for (let i = 0; i < this.arrayInner.length; i++) {
          let v = this.at(i);
          if (callbackfn(v, i, this.arrayInner)) return true;
      }
      return false;
  }

  slice(from: i32, to: i32 = i32.MAX_VALUE): Array<T> {
      return this.arrayInner.slice(from, to);
  }

  splice(start: i32, deleteCount: i32 = i32.MAX_VALUE): Array<T> {
      return this.arrayInner.splice(start, deleteCount);
  }

  sort(comparator: (a: T, b: T) => i32): this {
      this.loadItemsFrom(0);
      this.arrayInner = this.arrayInner.sort(comparator);
      this.storeItemsFrom(0);
      return this;
  }

  reverse(): T[] {
      this.loadItemsFrom(0);
      this.arrayInner = this.arrayInner.reverse();
      this.storeItemsFrom(0);
      return this.arrayInner;
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

      (new Storage(Crypto.blake256s(this.keyPrefix))).storeRaw(buffer);
      return buffer.length;
  }

  private loadAllItems(): this {
      if (this.synced) return this;

      let sai = this.loadArrayEntry();
      if (sai && sai.arrayLength > 0) {
          this.arrayInner.length = sai.arrayLength;
          let startIndex = 0;
          let rawBytes = (new Storage(Crypto.blake256s(this.keyPrefix))).loadRaw(sai.rawBytesCount);
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

  pushValue(value: T): i32 {
      let newlen: i32 = 0;
      newlen = this.arrayInner.push(value);
      let bytesCount = this.storeAllItems();
      this.storeArrayEntry(bytesCount);
      return newlen;
  }

  popValue(): T {
      assert(this.arrayInner.length > 0, "can not pop from empty array.");
      let t = this.arrayInner.pop();
      let bytesCount = this.storeAllItems();
      this.storeArrayEntry(bytesCount);
      return t;
  }

  setValueAt(index: i32, value: T): void {
      assert(index < this.arrayInner.length, "out of bounds");

      if (this.arrayInner[index].notEq(value)) {
          this.arrayInner[index] = value;
          let bytesCount = this.storeAllItems();
          this.storeArrayEntry(bytesCount);
      }
  }

  deleteValueAt(index: i32): bool {
      this.arrayInner[index] = instantiate<T>();
      let bytesCount = this.storeAllItems();
      this.storeArrayEntry(bytesCount);

      return true;
  }

  visitValueAt(index: i32): T {
      return this.arrayInner[index];
  }

  storeItemsFrom(index: i32): void {
      index = 0; // to supress warning
      let bytesCount = this.storeAllItems();
      this.storeArrayEntry(bytesCount);
  }

  loadItemsFrom(index: i32): void {
      index = 0; // to supress warning
      this.loadAllItems();
  }
}
