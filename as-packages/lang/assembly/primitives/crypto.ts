/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { Codec, Hash } from "as-scale-codec";
import {
    seal_hash_blake2_128,
    seal_hash_blake2_256,
    seal_hash_keccak_256,
    seal_hash_sha2_256,
    seal_random,
} from "as-contract-runtime";
import { toU8Array, typedToArray } from "../utils/ArrayUtils";
import { ReadBuffer } from "./readbuffer";
import { WriteBuffer } from "./writebuffer";

function invoke_hash_algo(
    message: Array<u8>,
    outLen: u32,
    fn: (i: usize, is: u32, o: usize) => void
): Hash {
    const wbuf = new WriteBuffer(message);
    const outbuf = new Uint8Array(outLen);
    fn(wbuf.buffer, wbuf.size, outbuf.dataStart);
    return Hash.bytesToHash(typedToArray(outbuf));
}

// Wrapped crypto algorithms as a class for readable.
export class Crypto {
    static sha256<T extends Codec>(obj: T): Hash {
        return invoke_hash_algo(obj.toU8a(), 32, seal_hash_sha2_256);
    }

    static keccak256256<T extends Codec>(obj: T): Hash {
        return invoke_hash_algo(obj.toU8a(), 32, seal_hash_keccak_256);
    }

    static blake256<T extends Codec>(obj: T): Hash {
        return invoke_hash_algo(obj.toU8a(), 32, seal_hash_blake2_256);
    }

    static blake128<T extends Codec>(obj: T): Hash {
        return invoke_hash_algo(obj.toU8a(), 16, seal_hash_blake2_128);
    }

    static random(subject: u8[]): Hash {
        const wbuf = new WriteBuffer(subject);
        const outbuf = new ReadBuffer(32);
        seal_random(
            wbuf.buffer,
            wbuf.size,
            outbuf.valueBuffer,
            outbuf.sizeBuffer
        );
        return Hash.bytesToHash(outbuf.valueBytes);
    }

    // Special hash functions for type string,
    // why not **ScaleString** ?
    // because ScaleString.toU8a() will insert length information,
    // which is not wanted.
    static sha256s(message: string): Hash {
        return invoke_hash_algo(
            toU8Array(String.UTF8.encode(message)),
            32,
            seal_hash_sha2_256
        );
    }

    static keccak256s(message: string): Hash {
        return invoke_hash_algo(
            toU8Array(String.UTF8.encode(message)),
            32,
            seal_hash_keccak_256
        );
    }

    static blake256s(message: string): Hash {
        return invoke_hash_algo(
            toU8Array(String.UTF8.encode(message)),
            32,
            seal_hash_blake2_256
        );
    }

    static blake128s(message: string): Hash {
        return invoke_hash_algo(
            toU8Array(String.UTF8.encode(message)),
            16,
            seal_hash_blake2_128
        );
    }
}
