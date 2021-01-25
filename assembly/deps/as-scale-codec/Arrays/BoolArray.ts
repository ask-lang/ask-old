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

import { BytesReader, CompactInt } from "..";
import { DecodedData } from "../interfaces/DecodedData";
import { Bool } from "./../Bool";
import { AbstractArray } from "./AbstractArray";


// @ts-ignore
export class BoolArray extends AbstractArray<Bool, bool> {

    /**
    * @description BoolArray elements decryption implementation
    */
    public decodeElement (value: u8[]): DecodedData<bool> {
        const scaleBool = Bool.fromU8a([value[0]]);

        return new DecodedData<bool>(
            scaleBool.unwrap(),
            scaleBool.encodedLength()
        )
    }
    
    /**
     * @description Returns encoded byte length of the type
     */
    public encodedLength(): i32{
        return (new CompactInt(this.values.length).encodedLength()) + super.values.length;
    }
    
    /**
     * @description Non-static constructor method used to populate defined properties of the model
     * @param bytes SCALE encoded bytes
     * @param index index to start decoding the bytes from
     */
    populateFromBytes(bytes: u8[], index: i32 = 0): void{
        const bytesReader = new BytesReader(bytes.slice(index));
        const data = bytesReader.readInto<CompactInt>();

        for(let i: i32 = 0; i < data.unwrap() - index; i++){
            const element = bytesReader.readInto<Bool>();
            this.values.push(element.unwrap());
        }
    }
    /**
    * @description Instantiates ScaleBoolArray from u8[] SCALE encoded bytes (Decode)
    */
    static fromU8a (input: u8[]): BoolArray {
        return AbstractArray.fromU8a<BoolArray>(input);
    }

    @inline @operator('==')
    static eq(a: BoolArray, b: BoolArray): bool {
        return a.eq(b);
    }

    @inline @operator('!=')
    static notEq(a: BoolArray, b: BoolArray): bool {
        return a.notEq(b);
    }
}
