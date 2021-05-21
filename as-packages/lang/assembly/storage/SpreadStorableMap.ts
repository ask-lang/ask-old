/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */
import { Codec, Hash } from "as-scale-codec";
import { Storage } from ".";
import { Crypto } from "../primitives/crypto";
import { DoubleLinkKVStore } from "./DoubleLinkKVStore";
import { StorableMap } from "./StorableMap";
import { NullHash } from "./storage";

export class SpreadStorableMap<K extends Codec, V extends Codec> extends StorableMap<K, V> {
  private synced: bool;

  constructor(ep: string = "") {
      super(ep);
      this.synced = false;
  }

  hasKey(key: K): K | null {
      let kv = this.load_kvstore_node(Crypto.blake256(key));
      if (!kv) return null;

      let k = this.find_key_inner(key);
      if (!k) {
          k = kv.key;
          this.mapInner.set(k, kv.value);
      }
      return k;
  }

  setKeyValuePair(key: K, value: V): void {
      let isNew = this.store_an_item(key, value);
      if (!isNew) { // to update existed k/v in map inner.
          let k = this.find_key_inner(key);
          if (k) key = k;
      }
      this.mapInner.set(key, value);
  }

  deleteKey(key: K): void {
      let k = this.find_key_inner(key);
      if (k) {
          this.mapInner.delete(k);
      }
      this.remove_an_item(key);
  }

  clearAll(): void {
      this.load_all_items();
      let keys = this.mapInner.keys();
      for (let i = 0; i < keys.length; ++i) {
          this.remove_an_item(keys[i]);
      }
      this.mapInner.clear();
      this.store_entry_point(NullHash, 0);
  }

  allKeys(): K[] {
      this.load_all_items();
      return this.mapInner.keys();
  }

  allValues(): V[] {
      this.load_all_items();
      return this.mapInner.values();
  }

  private load_kvstore_node(keyHash: Hash): DoubleLinkKVStore<K, V> | null {
      let strg = new Storage(keyHash);
      let v = strg.load<DoubleLinkKVStore<K, V>>();
      return v;
  }

  private remove_an_item(key: K): bool {
      let keyHash = Crypto.blake256(key);
      let item = this.load_kvstore_node(keyHash);
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
          let thisstrg = new Storage(Crypto.blake256(key));
          thisstrg.clear();

          return true;
      }

      return false;
  }

  private store_an_item(key: K, value: V): bool {
      let isNewItem = true;
      let strg = new Storage(Crypto.blake256(key));
      let item = strg.load<DoubleLinkKVStore<K, V>>();
      if (item == null) { // new item, shift to head.
          let newHead: DoubleLinkKVStore<K, V>;
          let size: i32 = 0;
          let entryInfo = this.load_entry_point();
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
          oldHead!.prevkey = Crypto.blake256(key);
          strg.store(oldHead!);
              }
              newHead = new DoubleLinkKVStore<K, V>(key, value, entryInfo.entries, NullHash);
              size = entryInfo.size.unwrap() + 1;
          }
          // store new head
          strg.store(newHead);

          this.store_entry_point(Crypto.blake256(key), size);
      } else { // just update the exist item.
          item.value = value;
          strg.store(item as DoubleLinkKVStore<K, V>);
          isNewItem = false;
      }

      return isNewItem;
  }

  private load_all_items(): void {
      if (this.synced) return;

      let entryInfo = this.load_entry_point();

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