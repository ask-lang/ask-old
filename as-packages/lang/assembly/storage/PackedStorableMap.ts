/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */
import { ReturnCode } from "as-contract-runtime";
import { Codec, Hash } from "as-scale-codec";
import { Storage } from ".";
import { Crypto } from "../primitives/crypto";
import { MapEntry } from "./MapEntry";
import { NullHash, MaxStorageSize } from "./storage";
/**
 * @class PackedStorableMap
 *
 * This class stores the `packed` contents of a storable map.
 * `packed` means all items of this array are stored in one slot,
 * and any store and load operation will impact all items.
 * So, it is used in the situation of little items, or sometimes you know what happened backend.
 *
 * There are 3 properties:
 * @property keyPrefix The hash of store point of this array
 * @property isLazy Bool value, the store mode of this array, refer to `QuickStart.md` for more details about store mode.
 * @property mapInner Map of T, it stores the elements in a map.
 */
export class PackedStorableMap<K extends Codec, V extends Codec> implements  Codec {
  private valueHash: Hash;
  protected keyPrefix: Hash;
  protected mapInner: Map<K, V>;
  protected isLazy: bool;

  constructor(ep: Hash = NullHash, lazy: bool = true) {
      this.keyPrefix = ep;
      this.isLazy = lazy;
      this.mapInner = new Map<K, V>();
      this.valueHash = Crypto.blake256s(ep.toString() + ".values");
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
      let strg = new Storage(this.keyPrefix);
      let entry = strg.load<MapEntry>();
      return entry;
  }

  protected storeMapEntry(entries: Hash, size: i32): void {
      let strg = new Storage(this.keyPrefix);
      let entry = new MapEntry(entries, size);
      let r = strg.store(entry);
      assert(r == ReturnCode.Success, "store entry point of map failed.");
  }
  /**
   * To get the store point of this map
   *
   * @type {Hash}
   * @memberof PackedStorableMap
   */
  get entryKey(): Hash {
      return this.keyPrefix;
  }
  /**
   * To set the store point of this map
   *
   * @memberof PackedStorableMap
   */
  set entryKey(hash: Hash) {
      this.keyPrefix = hash;
  }

  toU8a(): u8[] {
      return this.keyPrefix.toU8a();
  }

  encodedLength(): i32 {
      return this.keyPrefix.encodedLength();
  }

  populateFromBytes(bytes: u8[], index: i32 = 0): void {
      this.keyPrefix = new Hash();
      this.keyPrefix.populateFromBytes(bytes, index);
      this.valueHash = Crypto.blake256s(this.keyPrefix.toString() + ".values");
      this.loadAllItems();
  }

  eq(other: PackedStorableMap<K, V>): bool {
      return this.keyPrefix == other.keyPrefix;
  }

  notEq(other: PackedStorableMap<K, V>): bool {
      return !this.eq(other);
  }

  /**
   * To test if a key existed or not
   * @param key the key value to test
   * @returns bool to indicate if contains `key` in the map
   * @memberof PackedStorableMap
   */
  has(key: K): bool {
      // FIXME(liangqin.fan)
      // Map<K, V> use reference as the key storage,
      // so we should find the inner key storage to retrieve the stored value.
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
  /**
   * To delete a key from the map,
   * return `false` if the key is not existed
   *
   * @param key key to delete
   * @returns bool means operation successful or not
   *
   * @memberof PackedStorableMap
   */
  delete(key: K): bool {
      let innerkey = this.hasKey(key);
      if (!innerkey) return false;

      this.deleteKey(innerkey);
      return true;
  }
  /**
   * To remove all items in these map
   */
  clear(): void {
      this.clearAll();
  }
  /**
   * To get all key items
   *
   * @returns {K[]}
   * @memberof PackedStorableMap
   */
  keys(): K[] {
      return this.allKeys();
  }
  /**
   * To get all value items
   *
   * @returns {V[]}
   * @memberof PackedStorableMap
   */
  values(): V[] {
      return this.allValues();
  }

  protected hasKey(key: K): K | null {
      return this.findKeyInner(key);
  }

  protected setKeyValuePair(key: K, value: V): void {
      let k = this.findKeyInner(key);
      if (k) key = k;
      this.mapInner.set(key, value);
      if (!this.isLazy) this.__commit_storage__();
  }

  protected deleteKey(key: K): void {
      this.mapInner.delete(key);
      if (!this.isLazy) this.__commit_storage__();
  }

  protected clearAll(): void {
      this.mapInner.clear();
      if (!this.isLazy) this.__commit_storage__();
  }

  protected allKeys(): K[] {
      return this.mapInner.keys();
  }

  protected allValues(): V[] {
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

  __commit_storage__(): void {
      this.storeAllItems();
  }
}
