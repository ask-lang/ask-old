/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */
import { ReturnCode } from "as-contract-runtime";
import { Codec, Hash, ScaleString } from "as-scale-codec";
import { Storage } from ".";
import { Crypto } from "../primitives/crypto";
import { MapEntry } from "./MapEntry";
import { NullHash, MaxStorageSize } from "./storage";

export class PackedStorableMap<K extends Codec, V extends Codec> implements  Codec {
  private valueHash: Hash;
  protected keyPrefix: string;
  protected mapInner: Map<K, V>;

  constructor(ep: string = "") {
      this.keyPrefix = ep;
      this.mapInner = new Map<K, V>();
      this.valueHash = Crypto.blake256s(ep + ".values");
      this.loadAllItems();
  }

  protected findKeyInner(key: K): K | null {
      let keysInner = this.mapInner.keys();
      for (let i = 0; i < keysInner.length; i++) {
          if (keysInner[i].eq(key)) return keysInner[i];
      }
      return null;
  }

  protected loadMapEntry(): MapEntry | null {
      let strg = new Storage(Crypto.blake256s(this.keyPrefix));
      let entry = strg.load<MapEntry>();
      return entry;
  }

  protected storeMapEntry(entries: Hash, size: i32): void {
      let strg = new Storage(Crypto.blake256s(this.keyPrefix));
      let entry = new MapEntry(entries, size);
      let r = strg.store(entry);
      assert(r == ReturnCode.Success, "store entry point of map failed.");
  }

  get entryKey(): string {
      return this.keyPrefix;
  }

  set entryKey(str: string) {
      this.keyPrefix = str;
  }


  toU8a(): u8[] {
      return (new ScaleString(this.keyPrefix)).toU8a();
  }

  encodedLength(): i32 {
      return (new ScaleString(this.keyPrefix)).encodedLength();
  }

  populateFromBytes(bytes: u8[], index: i32 = 0): void {
      let s = new ScaleString();
      s.populateFromBytes(bytes, index);
      this.keyPrefix = s.toString();
  }

  eq(other: PackedStorableMap<K, V>): bool {
      return this.keyPrefix == other.keyPrefix;
  }

  notEq(other: PackedStorableMap<K, V>): bool {
      return !this.eq(other);
  }

  // FIXME(liangqin.fan)
  // Map<K, V> use reference as the key storage,
  // so we should find the inner key storage to retrieve the stored value.
  has(key: K): bool {
      let innerKey = this.hasKey(key);
      return innerKey != null;
  }

  @operator("[]=")
  set(key: K, value: V): this {
      this.setKeyValuePair(key, value);
      return this;
  }

  @operator("[]")
  get(key: K): V {
      let innerkey = this.hasKey(key);
      if (!innerkey) return instantiate<V>();
      return this.mapInner.get(innerkey);
  }

  delete(key: K): bool {
      let innerkey = this.hasKey(key);
      if (!innerkey) return false;

      this.deleteKey(innerkey);
      return true;
  }

  clear(): void {
      this.clearAll();
  }

  keys(): K[] {
      return this.allKeys();
  }

  values(): V[] {
      return this.allValues();
  }

  hasKey(key: K): K | null {
      return this.findKeyInner(key);
  }

  setKeyValuePair(key: K, value: V): void {
      let k = this.findKeyInner(key);
      if (k) key = k;
      this.mapInner.set(key, value);
      this.storeAllItems();
  }

  deleteKey(key: K): void {
      this.mapInner.delete(key);
      this.storeAllItems();
  }

  clearAll(): void {
      this.mapInner.clear();
      this.storeAllItems();
  }

  allKeys(): K[] {
      return this.mapInner.keys();
  }

  allValues(): V[] {
      return this.mapInner.values();
  }

  private storeAllItems(): void {
      let keys = this.mapInner.keys();
      if (keys.length == 0) {
          this.storeMapEntry(NullHash, 0);
          (new Storage(this.valueHash)).clear();
      } else {
          this.storeMapEntry(this.valueHash, keys.length);

          let values = this.mapInner.values();
          let writeBuf = new Array<u8>();
          for (let i = 0; i < keys.length; ++i) {
              writeBuf = writeBuf.concat(keys[i].toU8a());
              writeBuf = writeBuf.concat(values[i].toU8a());
          }
          assert(writeBuf.length <= MaxStorageSize, "over max allowed storage size");
          (new Storage(this.valueHash)).storeRaw(writeBuf);
      }
  }

  private loadAllItems(): void {
      do {
          let entrypoint = this.loadMapEntry();
          if (entrypoint == null) break;
          if (entrypoint.size.unwrap() == 0) break;

          let key = entrypoint.entries;
          let rawBytes = (new Storage(key)).loadRaw(MaxStorageSize);
          let offset = 0;
          for (let i = 0; i < entrypoint.size.unwrap(); i++) {
              let k = instantiate<K>();
              k.populateFromBytes(rawBytes, offset);
              offset += k.encodedLength();

              let v = instantiate<V>();
              v.populateFromBytes(rawBytes, offset);
              offset += v.encodedLength();

              this.mapInner.set(k, v);
          }
      } while (false);
  }
}
