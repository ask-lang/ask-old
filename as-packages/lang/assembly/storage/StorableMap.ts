/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */
import { ReturnCode } from "as-contract-runtime";
import { Codec, Hash} from "as-scale-codec";
import { Storage } from ".";
import { Crypto } from "../primitives/crypto";
import { MapEntry } from "./MapEntry";

export abstract class StorableMap<K extends Codec, V extends Codec> {
  abstract hasKey(key: K): K | null;
  abstract setKeyValuePair(key: K, value: V): void;
  abstract deleteKey(key: K): void;
  abstract clearAll(): void;
  abstract allKeys(): K[];
  abstract allValues(): V[];

  protected entrypoint: Hash;
  protected mapInner: Map<K, V>;

  constructor(ep: string = "") {
    this.entrypoint = Crypto.blake256s(ep);
    this.mapInner = new Map<K, V>();
  }

  protected find_key_inner(key: K): K | null {
    let keysInner = this.mapInner.keys();
    for (let i = 0; i < keysInner.length; i++) {
      if (keysInner[i].eq(key)) return keysInner[i];
    }
    return null;
  }

  protected load_entry_point(): MapEntry | null {
    let strg = new Storage(this.entrypoint);
    let entry = strg.load<MapEntry>();
    return entry;
  }

  protected store_entry_point(entries: Hash, size: i32): void {
    let strg = new Storage(this.entrypoint);
    let entry = new MapEntry(entries, size);
    let r = strg.store(entry)
    assert(r == ReturnCode.Success, "store entry point of map failed.");
  }

  // FIXME(liangqin.fan)
  // Map<K, V> use reference as the key storage,
  // so we should find the inner key storage to retrieve the stored value.
  has(key: K): bool {
    let innerKey = this.hasKey(key);
    return !!innerKey;
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