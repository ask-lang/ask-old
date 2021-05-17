
/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { Codec } from "..";
import { Crypto } from "../primitives/crypto";
import { StorableArray } from "./StorableArray";
import { Storage } from "./storage";

export class PackedStorableArray<T extends Codec> extends StorableArray<T> {
  private synced: bool;
  constructor(prefix: string = "", capacity: i32 = 0) {
    super(prefix, capacity);
    this.synced = false;
    this.load_all_items();
  }

  // to sotre this instance as packed,
  // use hash of this.keyPrefix as storage key.
  private store_all_items(): i32 {
    let length = this.arrayInner.length;
    let buffer = new Array<u8>();
    for (let i = 0; i < length; i++) {
      let v = this.arrayInner[i].toU8a();
      buffer = buffer.concat(v);
    }

    (new Storage(Crypto.blake256s(this.keyPrefix))).storeRaw(buffer);
    return buffer.length;
  }

  private load_all_items(): this {
    if (this.synced) return this;

    let sai = this.load_array_entry();
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

  push_value(value: T): i32 {
    let newlen: i32 = 0;
    newlen = this.arrayInner.push(value)
    let bytesCount = this.store_all_items();
    this.store_array_entry(bytesCount);
    return newlen;
  }

  pop_value(): T {
    assert(this.arrayInner.length > 0, "can not pop from empty array.");
    let t = this.arrayInner.pop();
    let bytesCount = this.store_all_items();
    this.store_array_entry(bytesCount);
    return t;
  }

  set_value_at(index: i32, value: T): void {
    assert(index < this.arrayInner.length, "out of bounds");

    if (this.arrayInner[index].notEq(value)) {
      this.arrayInner[index] = value;
      let bytesCount = this.store_all_items();
      this.store_array_entry(bytesCount);
    }
  }

  delete_value_at(index: i32): bool {
    this.arrayInner[index] = instantiate<T>();
    let bytesCount = this.store_all_items();
    this.store_array_entry(bytesCount);

    return true;
  }

  visit_value_at(index: i32): T {
    return this.arrayInner[index];
  }

  store_items_from(index: i32): void {
    index = 0; // to supress warning
    let bytesCount = this.store_all_items();
    this.store_array_entry(bytesCount);
  }

  load_items_from(index: i32): void {
    index = 0; // to supress warning
    this.load_all_items();
  }
}
