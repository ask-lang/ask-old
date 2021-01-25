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

import { UnwrappableCodec } from "../interfaces/UnwrappableCodec";
import { BIT_LENGTH, Bytes } from "../utils/Bytes";
import { BytesBuffer } from "../utils/BytesBuffer";

/** 
 * @description Representation for a CompactInt value in the system. 
*/
export class CompactInt implements UnwrappableCodec<i64> {

    private _value: i64;
    protected bitLength: i32;

    constructor (value: i64 = 0) {
        this._value = value;
        this.bitLength = CompactInt._computeBitLength(value);
    }

    /**
     * @description Return inner native value
     */
    unwrap(): i64{
        return this._value;
    }

    /**
    * @description  Encodes the value as u8[] as per the SCALE codec specification
    */
    public toU8a (): u8[] {
        const bytesBuffer = new BytesBuffer();
        bytesBuffer.encodeCompactInt(this._value);

        return bytesBuffer.bytes;
    }
    /**
     * @description Non-static constructor method used to populate defined properties of the model
     * @param bytes SCALE encoded bytes
     * @param index index to start decoding the bytes from
     */
    public populateFromBytes(bytes: u8[], index: i32 = 0): void{
        assert(bytes.length - index > 0, "CompactInt: Empty bytes array provided");
        const decodedData = Bytes.decodeCompactInt(bytes, index);
        this._value = decodedData.value;
        this.bitLength = CompactInt._computeBitLength(decodedData.value);
    }
    /**
    * @description Returns the string representation of the value
    */
    toString (): string {
        return this._value.toString();
    }

    /**
     * Internal private function to compute bit length of the value
     * @param value 
     */
    static _computeBitLength(value: u64): i32 {
        if (value < 1 << 6) return BIT_LENGTH.INT_8;
        else if (value < 1 << 14) return BIT_LENGTH.INT_16;
        else if (value < 1 << 30) return BIT_LENGTH.INT_32;
        else {
            return BIT_LENGTH.INT_64;
        }
    }
    /**
     * @description The length of Int when the value is encoded
     */
    public encodedLength (): i32 {
        return this.bitLength;
    }


    eq(other: CompactInt): bool {
        return this._value == other.unwrap();
    }

    notEq(other: CompactInt): bool {
        return this._value != other.unwrap();
    }

    /**
     * @description Instantiates Compact Int from u8[] SCALE encoded bytes
     * Compact Int decodes int8, int16, int32, int64 size correctly  
     * @param input SCALE encoded bytes
     * @param index an index of input to start decoding from
     */
    static fromU8a (value: u8[], index: i32 = 0): CompactInt {
        assert(value.length - index > 0, "CompactInt: Empty bytes array provided");
        const decodedData = Bytes.decodeCompactInt(value, index);
        return new CompactInt(decodedData.value);
    }

    @inline @operator('==')
    static eq(a: CompactInt, b: CompactInt): bool {
        return a.eq(b);
    }

    @inline @operator('!=')
    static notEq(a: CompactInt, b: CompactInt): bool {
        return a.notEq(b);
    }
}
