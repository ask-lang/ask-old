/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */
import { ReturnCode } from "as-contract-runtime";
import { Codec, Hash } from "as-scale-codec";
import { Storage } from ".";
import { Crypto } from "../primitives/crypto";
import { DoubleLinkKVStore } from "./DoubleLinkKVStore";
import { MapEntry } from "./MapEntry";
import { NullHash } from "./storage";

const STATUS_DELETED: u8 = 1;
const STATUS_MODIFIED: u8 = 2;

class MapStorage<K extends Codec, V extends Codec> {
    private valueSlots: Map<K, V>;
    private statusSlots: Map<K, u8>;

    constructor() {
        this.valueSlots = new Map<K, V>();
        this.statusSlots = new Map<K, u8>();
    }

    keys(): K[] { return this.valueSlots.keys(); }

    values(): V[] { return this.valueSlots.values(); }

    size(): i32 { return this.keys().length; }

    contains(key: K): bool { return this.findKeyInner(key) != null; }

    findKeyInner(key: K): K | null {
        let keysInner = this.keys();
        for (let i = 0; i < keysInner.length; i++) {
            if (keysInner[i].eq(key)) return keysInner[i];
        }
        return null;
    }

    set(key: K, value: V, force: bool = false): void {
        if (force) { // already know that there is no key existed.
            this.valueSlots.set(key, value);
            this.statusSlots.set(key, STATUS_MODIFIED);
        } else {
            let k = this.findKeyInner(key);
            if (!k) {
                this.valueSlots.set(key, value);
                this.statusSlots.set(key, STATUS_MODIFIED);
            } else {
                this.valueSlots.set(k, value);
                this.statusSlots.set(k, STATUS_MODIFIED);
            }
        }
    }

    get(key: K): V | null {
        let k = this.findKeyInner(key);
        if (!k) return null;
        return this.valueSlots.get(k);
    }

    delete(key: K): bool {
        let k = this.findKeyInner(key);
        if (k) {
            this.valueSlots.delete(k!); // sure
            this.statusSlots.set(k, STATUS_DELETED);
        }

        return k != null;
    }

    clear(): void {
        let keys = this.keys();
        for (let i = 0; i < keys.length; i++) {
            this.statusSlots.set(keys[i], STATUS_DELETED);
        }
        this.valueSlots.clear();
    }

    statusKeys(): K[] {
        return this.statusSlots.keys();
    }

    getStatus(key: K): u8 {
        return this.statusSlots.get(key);
    }
}

export class SpreadStorableMap<K extends Codec, V extends Codec> implements Codec {
  private synced: bool;
  private isLazy: bool;
  protected keyPrefix: Hash;
  protected mapStorage: MapStorage<K, V>;

  constructor(ep: Hash = NullHash, lazy: bool = true) {
      this.keyPrefix = ep;
      this.isLazy = lazy;
      this.mapStorage = new MapStorage<K, V>();
      this.synced = false;
  }

  get entryKey(): Hash {
      return this.keyPrefix;
  }

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
  }

  eq(other: SpreadStorableMap<K, V>): bool {
      return this.keyPrefix.eq(other.keyPrefix);
  }

  notEq(other: SpreadStorableMap<K, V>): bool {
      return !this.eq(other);
  }

  // FIXME(liangqin.fan)
  // Map<K, V> use reference as the key storage,
  // so we should find the inner key storage to retrieve the stored value.
  has(key: K): bool {
      let contains = this.mapStorage.contains(key);
      if (contains) return true;

      let v = this.loadItemFromNative(key);
      if (!v) return false;

      this.mapStorage.set(key, v, true);
      return true;
  }

  @operator("[]=")
  set(key: K, value: V): this {
      this.mapStorage.set(key, value);

      if (!this.isLazy) {
          this.storeItemToNative(key, value);
      }

      return this;
  }

  @operator("[]")
  get(key: K): V | null {
      let contains = this.mapStorage.contains(key);
      if (contains) return this.mapStorage.get(key);

      let v = this.loadItemFromNative(key);
      if (!v) return null;

      this.mapStorage.set(key, v, true);
      return v;
  }

  delete(key: K): bool {
      if (!this.has(key)) return false;

      this.mapStorage.delete(key);

      if (!this.isLazy) {
          this.removeItemFromNative(key);
      }

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

  private loadMapEntry(): MapEntry | null {
      let strg = new Storage(this.keyPrefix);
      let entry = strg.load<MapEntry>();
      return entry;
  }

  private storeMapEntry(entries: Hash, size: i32 = 0): void {
      let strg = new Storage(this.keyPrefix);
      let entry = new MapEntry(entries, size);
      let r = strg.store(entry);
      assert(r == ReturnCode.Success, "store entry point of map failed.");
  }

  private clearAll(): void {
      if (!this.synced) this.loadAllItems();

      if (!this.isLazy) {
          let keys = this.mapStorage.keys();
          for (let i = 0; i < keys.length; ++i) {
              this.removeItemFromNative(keys[i]);
          }
      }

      this.mapStorage.clear();
  }

  private allKeys(): K[] {
      if (!this.synced) this.loadAllItems();
      return this.mapStorage.keys();
  }

  private allValues(): V[] {
      if (!this.synced) this.loadAllItems();
      return this.mapStorage.values();
  }

  private loadAllItems(): void {
      if (this.synced) return;

      let entryInfo = this.loadMapEntry();

      if (entryInfo == null) return;

      let key = entryInfo.entries;
      let mapStrg = new Storage(NullHash);
      while (key != NullHash) {
          mapStrg.updateKey(key);
          let item = mapStrg.load<DoubleLinkKVStore<K, V>>();
          let k = item!.key;
          let v = item!.value;

          this.mapStorage.set(k, v);

          key = item!.nextkey;
      }

      this.synced = true;
  }

  private getHashByKey(key: K): Hash {
      let pos = this.keyPrefix.toString() + String.UTF8.decode(changetype<ArrayBuffer>(key.toU8a().dataStart));
      return Crypto.blake256s(pos);
  }

  private doLoadItemBy(keyHash: Hash): DoubleLinkKVStore<K, V> | null {
      let strg = new Storage(keyHash);
      let v = strg.load<DoubleLinkKVStore<K, V>>();
      return v;
  }

  private loadItemFromNative(key: K): V | null {
      let keyHash = this.getHashByKey(key);
      let kv = this.doLoadItemBy(keyHash);
      if (!kv) return null;

      return kv.value;
  }

  private removeItemFromNative(key: K): bool {
      let keyHash = this.getHashByKey(key);
      let item = this.doLoadItemBy(keyHash);

      do {
          if (item == null) break;
          if (item.prevkey == NullHash && item.nextkey == NullHash) {
              // the last item, new head hash should be null
              this.storeMapEntry(NullHash);
          } else if (item.prevkey == NullHash && item.nextkey != NullHash) { // the head item
              let strg = new Storage(item.nextkey);
              let newhead = strg.load<DoubleLinkKVStore<K, V>>();
              newhead!.prevkey = NullHash;
              strg.store(newhead!);

              this.storeMapEntry(item.nextkey);
          } else if (item.prevkey != NullHash && item.nextkey == NullHash) { // the tail item
              let strg = new Storage(item.prevkey);
              let newtail = strg.load<DoubleLinkKVStore<K, V>>();
              newtail!.nextkey = NullHash;
              strg.store(newtail!);
          } else {                                                           // the middle item
              let prevstrg = new Storage(item.prevkey);
              let previtem = prevstrg.load<DoubleLinkKVStore<K, V>>()!;
              previtem.nextkey = item.nextkey;
              prevstrg.store(previtem);

              let nextstrg = new Storage(item.nextkey);
              let nextitem = nextstrg.load<DoubleLinkKVStore<K, V>>()!;
              nextitem.prevkey = item.prevkey;
              nextstrg.store(nextitem);
          }

          // remove this key/value from native storage.
          let thisstrg = new Storage(keyHash);
          thisstrg.clear();

          return true;

      } while (0);

      return false;
  }

  private storeItemToNative(key: K, value: V): bool {
      let isNewItem = true;
      let keyHash = this.getHashByKey(key);
      let strg = new Storage(keyHash);
      let item = strg.load<DoubleLinkKVStore<K, V>>();
      if (item == null) { // new item, shift to head.
          let newHead: DoubleLinkKVStore<K, V>;
          let entryInfo = this.loadMapEntry();
          if (!entryInfo) {
              newHead = new DoubleLinkKVStore<K, V>(key, value, NullHash, NullHash);
          } else {
              if (entryInfo.entries.notEq(NullHash)) {
                  // update previous head item info
                  let keyHash = entryInfo.entries;
                  let strg = new Storage(keyHash);
                  let oldHead = strg.load<DoubleLinkKVStore<K, V>>();
                  assert(oldHead != null, "head item must be stored.");
                  oldHead!.prevkey = keyHash;
                  strg.store(oldHead!);
              }
              newHead = new DoubleLinkKVStore<K, V>(key, value, entryInfo.entries, NullHash);
          }
          // store new head
          strg.store(newHead);

          this.storeMapEntry(keyHash);
      } else { // just update the exist item.
          item.value = value;
          strg.store(item as DoubleLinkKVStore<K, V>);
          isNewItem = false;
      }

      return isNewItem;
  }

  __commit_storage__(): void {
      if (this.isLazy) {
          let statusKeys = this.mapStorage.statusKeys();
          for (let i = 0; i < statusKeys.length; i++) {
              let key = statusKeys[i];
              let status = this.mapStorage.getStatus(key);
              if (status == STATUS_MODIFIED) {
                  this.storeItemToNative(key, this.mapStorage.get(key)!);
              } else if (status == STATUS_DELETED) {
                  this.removeItemFromNative(key);
              }
          }
      }
  }
}