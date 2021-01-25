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
import { BytesReader, CompactInt } from "..";
import { DecodedData } from "../interfaces/DecodedData";
import { UInt128 } from "../UInt/UInt128";
import { BIT_LENGTH } from "../utils/Bytes";
import { AbstractArray } from "./AbstractArray";

// @ts-ignore
export class UInt128Array extends AbstractArray<UInt128, u128> {

    /**
    * @description BoolArray elements decryption implementation
    */
    public decodeElement (value: u8[]): DecodedData<u128> {
        const u128Instance = UInt128.fromU8a(value);

        return new DecodedData<u128>(
            u128Instance.unwrap(),
            u128Instance.encodedLength()
        )
    }

    /**
     * @description Non-static constructor method used to populate defined properties of the model
     * @param bytes SCALE encoded bytes
     * @param index index to start decoding the bytes from
     */
    populateFromBytes(bytes: u8[], index: i32 = 0): void {
        const bytesReader = new BytesReader(bytes.slice(index));
        const data = bytesReader.readInto<CompactInt>();
        for(let i: i32 = 0; i < data.unwrap(); i++){
            const element: UInt128 = bytesReader.readInto<UInt128>();
            this.values.push(element.unwrap());
        }
    }

    /**
    * @description Instantiates ScaleIntArray from u8[] SCALE encoded bytes (Decode)
    */
    static fromU8a (input: u8[]): UInt128Array {
        return AbstractArray.fromU8a<UInt128Array>(input);
    }

    /**
     * @description Returns encoded byte length of the type
     */
    public encodedLength(): i32{
        return (new CompactInt(this.values.length).encodedLength()) + super.values.length * BIT_LENGTH.INT_128;
    }

    @inline @operator('==')
    static eq(a: UInt128Array, b: UInt128Array): bool {
        return a.eq(b);
    }

    @inline @operator('!=')
    static notEq(a: UInt128Array, b: UInt128Array): bool {
        return a.notEq(b);
    }
}

