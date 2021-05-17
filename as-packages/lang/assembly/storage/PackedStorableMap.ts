/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */
import { Codec, Hash } from "as-scale-codec";
import { Storage } from ".";
import { Crypto } from "../primitives/crypto";
import { StorableMap } from "./StorableMap";
import { NullHash, MaxStorageSize } from "./storage";

export class PackedStorableMap<K extends Codec, V extends Codec> extends StorableMap<K, V> {
  private valueHash: Hash;

  constructor(ep: string = "") {
    super(ep);
    this.valueHash = Crypto.blake256s(ep + ".values");
    this.load_all_items();
  }

  hasKey(key: K): K | null {
    return this.find_key_inner(key);
  }

  setKeyValuePair(key: K, value: V): void {
    let k = this.find_key_inner(key);
    if (k) key = k;
    this.mapInner.set(key, value);
    this.store_all_items();
  }

  deleteKey(key: K): void {
    this.mapInner.delete(key);
    this.store_all_items();
  }

  clearAll(): void {
    this.mapInner.clear();
    this.store_all_items();
  }

  allKeys(): K[] {
    return this.mapInner.keys();
  }

  allValues(): V[] {
    return this.mapInner.values();
  }

  private store_all_items(): void {
    let keys = this.mapInner.keys();
    if (keys.length == 0) {
      this.store_entry_point(NullHash, 0);
      (new Storage(this.valueHash)).clear();
    } else {
      this.store_entry_point(this.valueHash, keys.length);

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

  private load_all_items(): void {
    do {
      let entrypoint = this.load_entry_point();
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
