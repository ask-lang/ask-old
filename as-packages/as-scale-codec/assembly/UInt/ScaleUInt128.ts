// Copyright 2020 LimeChain Ltd.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { u128 } from "as-bignum";
import { UnwrappableCodec } from "../interfaces/UnwrappableCodec";
import { BIT_LENGTH, Bytes } from "../utils/Bytes";

/** Representation for a ScaleUInt128 value in the system. */
export class ScaleUInt128 implements UnwrappableCodec<u128> {
    private _value: u128;
    protected bitLength: i32;

    constructor(value: u128 = u128.Zero) {
        this._value = value;
        this.bitLength = ScaleUInt128._computeBitLength(value);
    }

    /**
     * @description Return inner value
     */
    unwrap(): u128 {
        return this._value;
    }

    /** Encodes the value as u8[] as per the SCALE codec specification */
    toU8a(): u8[] {
        const bytes = new Array<u8>();
        if (this._value < u128.fromU32(1 << 6)) {
            // if value < 1 << 6
            Bytes.appendUint<u8>(
                bytes,
                u8(this._value.as<u8>()) << 2,
                BIT_LENGTH.INT_8
            ); // 1 byte
        } else if (this._value < u128.fromU32(1 << 14)) {
            // if value < 1 << 14
            Bytes.appendUint<u16>(
                bytes,
                u16(this._value.as<u16>() << 2) + 1,
                BIT_LENGTH.INT_16
            ); // 2 bytes
        } else if (this._value < u128.fromU64(1 << 30)) {
            // if value < 1 << 30
            Bytes.appendUint<u32>(
                bytes,
                u32(this._value.as<u32>() << 2) + 2,
                BIT_LENGTH.INT_32
            ); // 4 bytes
        } else {
            const valueInBytes = this._value.toBytes();
            Bytes.trimEmptyBytes(valueInBytes);

            const topSixBits: u8 = u8(valueInBytes.length - 4);
            const lengthByte: u8 = (topSixBits << 2) + 3;

            // Encode Mode and Bytes length
            bytes.push(lengthByte);
            // copy the u128 bytes
            Bytes.copy(valueInBytes, bytes, 1);
        }
        return bytes;
    }

    toString(): string {
        return this._value.toString();
    }
    /**
     * @description Non-static constructor method used to populate defined properties of the model
     * @param bytes SCALE encoded bytes
     * @param index index to start decoding the bytes from
     */
    populateFromBytes(bytes: u8[], index: i32 = 0): void {
        assert(
            bytes.length - index > 0,
            "Invalid input: Byte array should not be empty"
        );
        const value = ScaleUInt128._computeValue(bytes, index);
        this._value = value;
        this.bitLength = ScaleUInt128._computeBitLength(this._value);
    }
    /**
     * @description The length of Int when the value is encoded
     */
    public encodedLength(): i32 {
        return this.bitLength;
    }

    /**
     * Internal static private function to compute value of the ScaleUInt128
     * @param bytes
     * @param index
     */
    static _computeValue(bytes: u8[], index: i32 = 0): u128 {
        const mode = bytes[index] & 0x03;
        if (i32(mode) <= 2) {
            return new u128(
                u64(Bytes.decodeSmallInt(bytes, mode, index).value),
                0
            );
        }
        const topSixBits = bytes[index] >> 2;
        const byteLength = topSixBits + 4;

        const value = bytes.slice(index + 1, byteLength + index + 1);
        Bytes.appendZeroBytes(value, BIT_LENGTH.INT_128);
        return u128.fromBytesLE(value);
    }

    /**
     * Internal private function to compute bit length of the value
     * @param value
     */
    static _computeBitLength(value: u128): i32 {
        if (value < u128.fromU32(1 << 6)) return BIT_LENGTH.INT_8;
        else if (value < u128.fromU32(1 << 14)) return BIT_LENGTH.INT_16;
        else if (value < u128.fromU32(1 << 30)) return BIT_LENGTH.INT_32;
        else {
            const valueInBytes = value.toBytes();
            Bytes.trimEmptyBytes(valueInBytes);
            return 1 + valueInBytes.length;
        }
    }

    /** Instantiates new ScaleUInt128 from u8[] SCALE encoded bytes */
    static fromU8a(input: u8[], index: i32 = 0): ScaleUInt128 {
        assert(
            input.length - index != 0,
            "Invalid input: Byte array should not be empty"
        );
        return new ScaleUInt128(ScaleUInt128._computeValue(input, index));
    }

    eq(other: ScaleUInt128): bool {
        return this._value == other.unwrap();
    }

    notEq(other: ScaleUInt128): bool {
        return this._value != other.unwrap();
    }

    // Commonly used values of ScaleUInt128
    @inline static get Zero(): ScaleUInt128 {
        return new ScaleUInt128(u128.Zero);
    }
    @inline static get One(): ScaleUInt128 {
        return new ScaleUInt128(u128.One);
    }
    @inline static get Min(): ScaleUInt128 {
        return new ScaleUInt128(new u128());
    }
    @inline static get Max(): ScaleUInt128 {
        return new ScaleUInt128(new u128(-1, -1));
    }

    static eq(a: ScaleUInt128, b: ScaleUInt128): bool {
        return a.eq(b);
    }

    static notEq(a: ScaleUInt128, b: ScaleUInt128): bool {
        return a.notEq(b);
    }
}
