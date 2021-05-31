/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import {
    seal_clear_storage,
    seal_get_storage,
    seal_set_storage,
    ReturnCode,
} from "as-contract-runtime";

import { Codec, Hash, PackableCodec, ScaleString } from "as-scale-codec";
import { ReadBuffer } from "../primitives/readbuffer";
import { WriteBuffer } from "../primitives/writebuffer";

export const MaxStorageSize = 16 * 1024;

export const NullHash = new Hash((new Array<u8>(32)).fill(0x00));

export enum StoreMode { W = 0, R = 1, WR = 2 }

export class Storage {
  // store mode, to limit store value to native in `mutates = false`
  private static sStoreMode: StoreMode = StoreMode.WR;
  static set mode(mode: StoreMode) {
      Storage.sStoreMode = mode;
  }

  private key: Hash;

  constructor(_key: Hash = NullHash) {
      this.key = _key;
  }

  updateKey(key: Hash): void {
      this.key = key;
  }

  store<T extends Codec>(value: T): ReturnCode {
      assert(Storage.sStoreMode != StoreMode.R, "Storage: only read allowed");

      const valueBytes = value.toU8a();
      const buf = new WriteBuffer(valueBytes);
      // FIXME(liangqin.fan) if value.length == 0 , should `clear` this storage??
      seal_set_storage(
          this.hashKey(),
          buf.buffer,
          buf.size
      );
      return ReturnCode.Success;
  }

  storePacked<U extends PackableCodec>(value: U): ReturnCode {
      assert(Storage.sStoreMode != StoreMode.R, "Storage: only read allowed");

      const valueBytes = value.toU8aPacked();
      const buf = new WriteBuffer(valueBytes);
      // FIXME(liangqin.fan) if value.length == 0 , should `clear` this storage??
      seal_set_storage(
          this.hashKey(),
          buf.buffer,
          buf.size
      );
      return ReturnCode.Success;
  }

  load<T extends Codec>(): T | null {
      const value = instantiate<T>();

      // FIXME(liangqin.fan) It is innecessory to read by MasStorageSize,
      // but has no way to detect the real buffer size need.

      // let len = value.encodedLength();
      // if (len == 0 || (value instanceof ScaleString)) {
      //   len = MaxStorageSize;
      // }

      const readBuf = new ReadBuffer(MaxStorageSize);
      const status = seal_get_storage(
          this.hashKey(),
          readBuf.valueBuffer,
          readBuf.sizeBuffer
      );
      // if read storage from native successfully, then populate it.
      // otherwise let it alon with default constructed value.
      if (status == ReturnCode.Success/* && readBuf.readSize <= len*/) {
          value.populateFromBytes(readBuf.valueBytes, 0);
          return value;
      }

      return null;
  }

  loadPacked<U extends PackableCodec>(): U | null {
      const value = instantiate<U>();

      let len = value.encodedLengthPacked();
      if (len == 0 || value instanceof ScaleString) len = MaxStorageSize;

      const readBuf = new ReadBuffer(len);
      const status = seal_get_storage(
          this.hashKey(),
          readBuf.valueBuffer,
          readBuf.sizeBuffer
      );
      // if read storage from native successfully, then populate it.
      // otherwise let it alon with default constructed value.
      if (status == ReturnCode.Success && readBuf.readSize <= len) {
          value.populateFromPackedBytes(readBuf.valueBytes, 0);
          return value;
      }

      return null;
  }

  // to store raw bytes at `key`.
  storeRaw(data: Array<u8>): void {
      assert(Storage.sStoreMode != StoreMode.R, "Storage: only read allowed");

      const buf = new WriteBuffer(data);
      seal_set_storage(
          this.hashKey(),
          buf.buffer,
          buf.size
      );
  }
  // to load raw bytes at `key`
  loadRaw(size: i32): u8[] {
      let readBuf = new ReadBuffer(size);

      const status = seal_get_storage(
          this.hashKey(),
          readBuf.valueBuffer,
          readBuf.sizeBuffer
      );
      // if read storage from native successfully, then populate it.
      // otherwise let it alon with default constructed value.
      if (status == ReturnCode.Success && readBuf.readSize <= size) {
          return readBuf.valueBytes;
      }

      return [];
  }


  clear(): void {
      seal_clear_storage(this.hashKey());
  }

  private hashKey(): usize {
      // const hash = Crypto.blake256s(this.key);
      // return hash.toU8a().buffer;
      return this.key.toU8a().dataStart;
  }
}
