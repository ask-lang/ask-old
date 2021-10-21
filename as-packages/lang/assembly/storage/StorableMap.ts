/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */
import { ReturnCode } from "pl-as-contract-runtime";
import { Codec, Hash, ScaleString} from "pl-as-scale-codec";
import { Storage } from ".";
import { Crypto } from "../primitives/crypto";
import { MapEntry } from "./MapEntry";

export abstract class StorableMap<K extends Codec, V extends Codec> implements Codec {
  abstract hasKey(key: K): K | null;
  abstract setKeyValuePair(key: K, value: V): void;
  abstract deleteKey(key: K): void;
  abstract clearAll(): void;
  abstract allKeys(): K[];
  abstract allValues(): V[];

  protected keyPrefix: string;
  protected mapInner: Map<K, V>;

  constructor(ep: string = "") {
      this.keyPrefix = ep;
      this.mapInner = new Map<K, V>();
  }

  protected findKeyInner(key: K): K | null {
      let keysInner = this.mapInner.keys();
      for (let i = 0; i < keysInner.length; i++) {
          if (keysInner[i].eq(key)) return keysInner[i];
      }
      return null;
  }

  protected loadEntryPoint(): MapEntry | null {
      let strg = new Storage(Crypto.blake256s(this.keyPrefix));
      let entry = strg.load<MapEntry>();
      return entry;
  }

  protected storeEntryPoint(entries: Hash, size: i32): void {
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

  eq(other: StorableMap<K, V>): bool {
      return this.keyPrefix == other.keyPrefix;
  }

  notEq(other: StorableMap<K, V>): bool {
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
}