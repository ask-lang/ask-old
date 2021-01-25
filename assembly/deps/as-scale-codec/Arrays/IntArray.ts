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

import { BytesReader } from "..";
import { CompactInt } from "../Int/CompactInt";
import { DecodedData } from "../interfaces/DecodedData";
import { AbstractArray } from "./AbstractArray";


// @ts-ignore
export class IntArray extends AbstractArray<CompactInt, i64> {

    /**
    * @description BoolArray elements decryption implementation
    */
    public decodeElement (value: u8[]): DecodedData<u64> {
        const compactInt = CompactInt.fromU8a(value);

        return new DecodedData<u64>(
            compactInt.unwrap(),
            compactInt.encodedLength()
        )
    }

    /**
     * @description Returns encoded byte length of the type
     */
    public encodedLength(): i32{
        let len: i32 = new CompactInt(this.values.length).encodedLength();
        for (let i: i32 = 0; i < this.values.length; i++){
            const value = new CompactInt(this.values[i]);
            len += value.encodedLength();
        }
        return len;
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
            const element: CompactInt = bytesReader.readInto<CompactInt>();
            this.values.push(element.unwrap());
        }
    }
    /**
    * @description Instantiates ScaleIntArray from u8[] SCALE encoded bytes (Decode)
    */
    static fromU8a (input: u8[]): IntArray {
        return AbstractArray.fromU8a<IntArray>(input);
    }

    @inline @operator('==')
    static eq(a: IntArray, b: IntArray): bool {
        return a.eq(b);
    }

    @inline @operator('!=')
    static notEq(a: IntArray, b: IntArray): bool {
        return a.notEq(b);
    }
}

