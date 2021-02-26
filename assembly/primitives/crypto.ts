/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { Codec, Hash } from "../deps/as-scale-codec";
import { seal_hash_blake2_128, seal_hash_blake2_256, seal_hash_keccak_256, seal_hash_sha2_256, seal_random } from "../seal/seal0";
import { typedToArray } from "../utils/ArrayUtils";
import { ReadBuffer } from "./readbuffer";

function invoke_hash_algo(message: ArrayBuffer, outLen: u32,
  fn: (i: ArrayBuffer, is: u32, o: ArrayBuffer) => void): Hash {
  const outbuf = new Uint8Array(outLen);
  fn(message, message.byteLength, outbuf.buffer);
  return Hash.bytesToHash(typedToArray(outbuf));
}

// Wrapped crypto algorithms as a class for readable.
export class Crypto {
  static sha256<T extends Codec>(obj: T): Hash {
    return invoke_hash_algo(obj.toU8a().buffer, 32, seal_hash_sha2_256);
  }

  static keccak256256<T extends Codec>(obj: T): Hash {
    return invoke_hash_algo(obj.toU8a().buffer, 32, seal_hash_keccak_256);
  }

  static blake256<T extends Codec>(obj: T): Hash {
    return invoke_hash_algo(obj.toU8a().buffer, 32, seal_hash_blake2_256);
  }

  static blake128<T extends Codec>(obj: T): Hash {
    return invoke_hash_algo(obj.toU8a().buffer, 16, seal_hash_blake2_128);
  }

  static random(subject: u8[]): Hash {
    const outbuf = new ReadBuffer(32);
    seal_random(subject.buffer, subject.length, outbuf.valueBuffer, outbuf.sizeBuffer);
    return Hash.bytesToHash(outbuf.valueBytes);
  }

  // Special hash functions for type string,
  // why not **ScaleString** ?
  // because ScaleString.toU8a() will insert length information,
  // which is not wanted.
  static sha256s(message: string): Hash {
    return invoke_hash_algo(String.UTF8.encode(message), 32, seal_hash_sha2_256);
  }

  static keccak256s(message: string): Hash {
    return invoke_hash_algo(String.UTF8.encode(message), 32, seal_hash_keccak_256);
  }

  static blake256s(message: string): Hash {
    return invoke_hash_algo(String.UTF8.encode(message), 32, seal_hash_blake2_256);
  }

  static blake128s(message: string): Hash {
    return invoke_hash_algo(String.UTF8.encode(message), 16, seal_hash_blake2_128);
  }
}