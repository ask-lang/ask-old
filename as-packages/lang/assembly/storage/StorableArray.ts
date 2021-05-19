
/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { Codec, Int32, UInt32, Hash, ScaleString } from "..";
import { ReturnCode } from "../primitives/alias";
import { Crypto } from "../primitives/crypto";
import { ArrayEntry } from "./ArrayEntry";
import { Storage } from "./storage";

export abstract class StorableArray<T extends Codec> implements Codec {
  [key: number]: T;

  protected keyPrefix: string;
  protected arrayInner: Array<T>;

  abstract push_value(value: T): i32;
  abstract pop_value(): T;
  abstract set_value_at(index: i32, value: T): void;
  abstract delete_value_at(index: i32): bool;
  abstract visit_value_at(index: i32): T;
  abstract store_items_from(index: i32): void;
  abstract load_items_from(index: i32): void;

  constructor(prefix: string = "", capacity: i32 = 0) {
    this.keyPrefix = prefix;
    this.arrayInner = new Array<T>(capacity);
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

  eq(other: StorableArray<T>): bool {
    return this.keyPrefix == other.keyPrefix;
  }

  notEq(other: StorableArray<T>): bool {
    return !this.eq(other);
  }

  protected load_array_entry(): ArrayEntry | null {
    let strg = new Storage(Crypto.blake256s(this.keyPrefix + ".length"));
    let entryInfo = strg.load<ArrayEntry>();
    return entryInfo;
  }

  protected store_array_entry(storedBytes: i32 = 0): ReturnCode {
    let entryHash = Crypto.blake256s(this.keyPrefix + ".length");
    let strg = new Storage(entryHash);
    let v: ArrayEntry = new ArrayEntry(
      this.arrayInner.length,
      storedBytes
    );
    let r = strg.store(v);
    return r;
  }

  protected index_to_hash_key(index: i32): Hash {
    return Crypto.blake256s(this.keyPrefix + index.toString());
  }

  @operator("[]")
  private __get(index: i32): T {
    return this.at(index);
  }

  @operator("[]=")
  private __set(index: i32, value: T): void {
    this.set_value_at(index, value);
  }


  push(value: T): i32 {
    return this.push_value(value);
  }

  pop(): T {
    return this.pop_value();
  }

  delete(index: i32): bool {
    return this.delete_value_at(index);
  }

  at(index: i32): T {
    assert(index < this.arrayInner.length, "out of bounds");
    return this.visit_value_at(index);
  }

  fill(value: T, start: i32 = 0, end: i32 = i32.MAX_VALUE): this {
    this.arrayInner.fill(value, start, end);
    this.store_items_from(start);
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
    this.store_items_from(oldlen);

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
    this.load_items_from(0);
    this.arrayInner = this.arrayInner.sort(comparator);
    this.store_items_from(0);
    return this;
  }

  reverse(): T[] {
    this.load_items_from(0);
    this.arrayInner = this.arrayInner.reverse();
    this.store_items_from(0);
    return this.arrayInner;
  }
}
