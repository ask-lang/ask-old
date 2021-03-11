/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { seal_clear_storage, seal_get_storage, seal_set_storage } from "../seal/seal0";
import { ReturnCode } from "../primitives/alias";

import { Codec } from '../deps/as-scale-codec';
import { ReadBuffer } from "../primitives/readbuffer";
import { WriteBuffer } from "../primitives/writebuffer";
import { Crypto } from "../primitives/crypto";

export enum StoreMode {W = 0, R = 1, WR = 2}

export class Storage<T extends Codec> {
  // store mode, to limit store value to native in `mutates = false`
  private static sStoreMode: StoreMode = StoreMode.WR;
  static set mode(mode: StoreMode) {
    Storage.sStoreMode = mode;
  }

  private key: string;

  constructor(_key: string) {
    this.key = _key;
  }


  store(value: T): ReturnCode {
    assert(Storage.sStoreMode != StoreMode.R, "Storage: only read allowed");

    const buf = new WriteBuffer(value.toU8a().buffer);
    seal_set_storage(
      this.hashKey(),
      buf.buffer,
      buf.size
    );
    return ReturnCode.Success;
  }

  load(): T {
    const value = instantiate<T>();
    const len = value.encodedLength();

    const readBuf = new ReadBuffer(len);
    const status = seal_get_storage(
      this.hashKey(),
      readBuf.valueBuffer,
      readBuf.sizeBuffer
    );
    // if read storage from native successfully, then populate it.
    // otherwise let it alon with default constructed value.
    if (status == ReturnCode.Success && readBuf.readSize <= len) {
      value.populateFromBytes(readBuf.valueBytes, 0);
    }

    return value;
  }

  clear(): void {
    seal_clear_storage(this.hashKey());
  }

  private hashKey(): ArrayBuffer {
    const hash = Crypto.blake256s(this.key);
    return hash.toU8a().buffer;
  }
}