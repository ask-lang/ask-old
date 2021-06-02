
/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { ArrayEntry, Codec, Crypto, Hash, ScaleString } from "..";
import { ReturnCode } from "../primitives/alias";
import { Storage } from "./storage";

export class SpreadStorableArray<T extends Codec> implements Codec {
  private synced: bool;
  constructor(prefix: string = "", capacity: i32 = 0) {
      this.keyPrefix = prefix;
      this.arrayInner = new Array<T>(capacity);

      if (prefix.length != 0 && capacity == 0) {
          this.initArrayInner();
      }

      this.synced = false;
  }

  [key: number]: T;

  protected keyPrefix: string;
  protected arrayInner: Array<T>;

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
      if (this.keyPrefix.length != 0) this.initArrayInner();
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
      let len = this.arrayInner.length;
      if (len == 0) {
          let entry = this.loadArrayEntry();
          if (entry) len = entry.arrayLength;
      }
      return len;
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
}
