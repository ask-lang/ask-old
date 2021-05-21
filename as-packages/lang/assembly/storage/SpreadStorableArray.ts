
/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { Codec } from "..";
import { ReturnCode } from "../primitives/alias";
import { StorableArray } from "./StorableArray";
import { Storage } from "./storage";

export class SpreadStorableArray<T extends Codec> extends StorableArray<T> {
  private synced: bool;
  constructor(prefix: string = "", capacity: i32 = 0) {
      super(prefix, capacity);

      if (capacity == 0) {
          let v = this.load_array_entry();
          if (v) { this.arrayInner.length = v.arrayLength; }
      }

      this.synced = false;
  }

  private store_value_at(index: i32): ReturnCode {
      let strg = new Storage(this.index_to_hash_key(index));
      return strg.store(this.arrayInner[index]);
  }

  private load_value_at(index: i32): T | null {
      let strg = new Storage(this.index_to_hash_key(index));
      return strg.load<T>();
  }

  private clear_value_at(index: i32): void {
      let strg = new Storage(this.index_to_hash_key(index));
      strg.clear();
  }

  push_value(value: T): i32 {
      let newlen: i32 = 0;
      newlen = this.arrayInner.push(value);
      this.store_value_at(newlen - 1);
      this.store_array_entry();
      return newlen;
  }

  pop_value(): T {
      assert(this.arrayInner.length > 0, "can not pop from empty array.");
      let t = this.arrayInner.pop();
      this.clear_value_at(this.arrayInner.length - 1);
      this.store_array_entry();
      return t;
  }

  set_value_at(index: i32, value: T): void {
      assert(index < this.arrayInner.length, "out of bounds");

      if (this.arrayInner[index].notEq(value)) {
          this.arrayInner[index] = value;
          this.store_value_at(index);
      }
  }

  delete_value_at(index: i32): bool {
      let deleted = this.load_value_at(index);
      if (!deleted) return false;

      this.arrayInner[index] = instantiate<T>();
      this.clear_value_at(index);
      this.store_array_entry();

      return true;
  }

  visit_value_at(index: i32): T {
      let v = this.load_value_at(index);
      if (!v) return instantiate<T>();

      this.arrayInner[index] = v;
      return this.arrayInner[index];
  }

  store_items_from(index: i32): void {
      for (let i = index; i < this.arrayInner.length; ++i) {
          this.store_value_at(i);
      }
      this.store_array_entry();
  }

  load_items_from(index: i32): void {
      if (this.synced) return;

      for (let i = index; i < this.arrayInner.length; ++i) {
          let v = this.load_value_at(i);
          if (!v) v = instantiate<T>();
          this.arrayInner[i] = v;
      }

      this.synced = true;
  }
}
