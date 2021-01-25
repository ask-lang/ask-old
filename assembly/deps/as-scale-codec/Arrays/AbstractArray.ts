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

import { Codec } from "../interfaces/Codec";
import { DecodedData } from "../interfaces/DecodedData";
import { UnwrappableCodec } from "../interfaces/UnwrappableCodec";
import { ArrayUtils } from "../utils/Arrays";
import { Bytes } from "../utils/Bytes";
import { BytesBuffer } from "../utils/BytesBuffer";

export abstract class AbstractArray<ScaleType extends Codec, NativeType> implements UnwrappableCodec<Array<NativeType>>{

    public values: Array<NativeType>;
    constructor(input: NativeType[] = []) {
        this.values = new Array<NativeType>(input.length);
        Bytes.copy<NativeType>(input, this.values);
    }
    
    /**
     * @description Returns the inner native value
     */
    public unwrap(): Array<NativeType>{
        return this.values;
    }

    public eq(other: AbstractArray<ScaleType, NativeType>): bool{
        return ArrayUtils.areArraysEqual(this.values, other.values);
    };
    
    public notEq(other: AbstractArray<ScaleType, NativeType>): bool{
        return !ArrayUtils.areArraysEqual(this.values, other.values);
    };
    
    /**
    * @description  Encodes values of all elements in u8[] successively as per the SCALE codec specification
    */
    public toU8a (): u8[] {
        const bytesBuffer = new BytesBuffer();
        bytesBuffer.encodeCompactInt(this.values.length);

        for (let i = 0; i < this.values.length; i++) {
            const element = instantiate<ScaleType>(this.values[i]);
            bytesBuffer.write(element.toU8a());
        }

        return bytesBuffer.bytes;
    }

    /**
     * @description Returns encoded byte length of the type
     */
    abstract encodedLength(): i32;
    
    /**
     * @description Non-static constructor method used to populate defined properties of the model
     * @param bytes SCALE encoded bytes
     * @param index index to start decoding the bytes from
     */
    abstract populateFromBytes(bytes: u8[], index: i32): void;

    /**
    * @description Each child class has to provide decryption implementation for elements
    */
    public abstract decodeElement (value: u8[]): DecodedData<NativeType>;

    /**
    * @description  Instantiates type of ScaleArray from u8[] SCALE encoded bytes (Decode)
    */
    static fromU8a<TypeOfScaleArray> (input: u8[]): TypeOfScaleArray {
        const data = Bytes.decodeCompactInt(input);
        let bytes = input.slice(data.decBytes);

        const scaleArray = instantiate<TypeOfScaleArray>([]);

        for (let i: u64 = 0; i < data.value; i++) {
            const element = scaleArray.decodeElement(bytes);
            scaleArray.values.push(element.value);

            bytes = bytes.slice(element.decBytes);
        }

        return scaleArray;
    }
}
