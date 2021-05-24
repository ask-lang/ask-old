/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */
import { ReturnCode } from "as-contract-runtime";
import { Codec, Hash, ScaleString } from "as-scale-codec";
import { Storage } from ".";
import { Crypto } from "../primitives/crypto";
import { DoubleLinkKVStore } from "./DoubleLinkKVStore";
import { MapEntry } from "./MapEntry";
import { NullHash } from "./storage";

export class SpreadStorableMap<K extends Codec, V extends Codec> implements Codec {
  private synced: bool;

  constructor(ep: string = "") {
      this.keyPrefix = ep;
      this.mapInner = new Map<K, V>();
      this.synced = false;
  }

  protected keyPrefix: string;
  protected mapInner: Map<K, V>;

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
      let t = new ScaleString(this.keyPrefix);
      return t.toU8a();
  }

  encodedLength(): i32 {
      return (new ScaleString(this.keyPrefix)).encodedLength();
  }

  populateFromBytes(bytes: u8[], index: i32 = 0): void {
      let s = new ScaleString();
      s.populateFromBytes(bytes, index);
      this.keyPrefix = s.toString();
  }

  eq(other: SpreadStorableMap<K, V>): bool {
      return this.keyPrefix == other.keyPrefix;
  }

  notEq(other: SpreadStorableMap<K, V>): bool {
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
      let keyHash = this.itemStoredPosition(key);
      let kv = this.loadKVStoreNode(keyHash);
      if (!kv) return null;

      let k = this.findKeyInner(key);
      if (!k) {
          k = kv.key;
          this.mapInner.set(k, kv.value);
      }
      return k;
  }

  setKeyValuePair(key: K, value: V): void {
      let isNew = this.storeAnItem(key, value);
      if (!isNew) { // to update existed k/v in map inner.
          let k = this.findKeyInner(key);
          if (k) key = k;
      }
      this.mapInner.set(key, value);
  }

  deleteKey(key: K): void {
      let k = this.findKeyInner(key);
      if (k) {
          this.mapInner.delete(k);
      }
      this.removeAnItem(key);
  }

  clearAll(): void {
      this.loadAllItems();
      let keys = this.mapInner.keys();
      for (let i = 0; i < keys.length; ++i) {
          this.removeAnItem(keys[i]);
      }
      this.mapInner.clear();
      this.storeMapEntry(NullHash, 0);
  }

  allKeys(): K[] {
      this.loadAllItems();
      return this.mapInner.keys();
  }

  allValues(): V[] {
      this.loadAllItems();
      return this.mapInner.values();
  }

  private itemStoredPosition(key: K): Hash {
      let pos = this.keyPrefix + String.UTF8.decode(key.toU8a().buffer);
      return Crypto.blake256s(pos);
  }

  private loadKVStoreNode(keyHash: Hash): DoubleLinkKVStore<K, V> | null {
      let strg = new Storage(keyHash);
      let v = strg.load<DoubleLinkKVStore<K, V>>();
      return v;
  }

  private removeAnItem(key: K): bool {
      let keyHash = this.itemStoredPosition(key);
      let item = this.loadKVStoreNode(keyHash);
      if (item != null) {
          if (item.prevkey == NullHash) { // the head node
              if (item.nextkey != NullHash) {
                  let strg = new Storage(item.nextkey);
                  let newhead = strg.load<DoubleLinkKVStore<K, V>>();
                  newhead!.prevkey = NullHash;
                  strg.store(newhead!);
              }
          } else if (item.nextkey == NullHash) { // the tail node
              if (item.prevkey != NullHash) {
                  let strg = new Storage(item.prevkey);
                  let newtail = strg.load<DoubleLinkKVStore<K, V>>();
                  newtail!.nextkey = NullHash;
                  strg.store(newtail!);
              }
          } else { // the middle node
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
      }

      return false;
  }

  private storeAnItem(key: K, value: V): bool {
      let isNewItem = true;
      let keyHash = this.itemStoredPosition(key);
      let strg = new Storage(keyHash);
      let item = strg.load<DoubleLinkKVStore<K, V>>();
      if (item == null) { // new item, shift to head.
          let newHead: DoubleLinkKVStore<K, V>;
          let size: i32 = 0;
          let entryInfo = this.loadMapEntry();
          if (entryInfo == null) {
              newHead = new DoubleLinkKVStore<K, V>(key, value, NullHash, NullHash);
              size++;
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
              size = entryInfo.size.unwrap() + 1;
          }
          // store new head
          strg.store(newHead);

          this.storeMapEntry(keyHash, size);
      } else { // just update the exist item.
          item.value = value;
          strg.store(item as DoubleLinkKVStore<K, V>);
          isNewItem = false;
      }

      return isNewItem;
  }

  private loadAllItems(): void {
      if (this.synced) return;

      let entryInfo = this.loadMapEntry();

      if (entryInfo == null) return;

      let mapsize = entryInfo.size;
      if (mapsize.unwrap() == this.mapInner.size) return; // all items loaded, do nothing.

      this.mapInner.clear();

      let key = entryInfo.entries;
      let mapStrg = new Storage(NullHash);
      while (key != NullHash) {
          mapStrg.updateKey(key);
          let item = mapStrg.load<DoubleLinkKVStore<K, V>>();
          let k = item!.key;
          let v = item!.value;

          this.mapInner.set(k, v);

          key = item!.nextkey;
      }

      this.synced = true;
  }
}