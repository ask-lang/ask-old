/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { Hash } from "as-scale-codec";
import { seal_hash_blake2_128, seal_hash_blake2_256, seal_hash_keccak_256, seal_hash_sha2_256 } from "../env/seal0";
import { typedToArray } from "../utils/ArrayUtils";
import { WriteBuffer } from "./writebuffer";

function invoke_hash_algo(message: string, outLen: u32,
    fn: (i: ArrayBuffer, is: u32, o: ArrayBuffer) => void): Hash {
  const wbuf = new WriteBuffer(String.UTF8.encode(message));

  const outbuf = new Uint8Array(outLen);
  fn(wbuf.buffer, wbuf.size, outbuf.buffer);
  return Hash.bytesToHash(typedToArray(outbuf))
}

export function sha256(message: string): Hash {
  return invoke_hash_algo(message, 32, seal_hash_sha2_256);
}

export function keccak256(message: string): Hash {
  return invoke_hash_algo(message, 32, seal_hash_keccak_256);
}

export function blake256(message: string): Hash {
  return invoke_hash_algo(message, 32, seal_hash_blake2_256);
}

export function blake128(message: string): Hash {
  return invoke_hash_algo(message, 16, seal_hash_blake2_128);
}