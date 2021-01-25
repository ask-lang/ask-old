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

import { ByteArray } from "./Arrays/ByteArray";
import { Bytes } from "./utils/Bytes";

export class ScaleString extends ByteArray {

    private _valueStr: string;

    constructor (input: string = "") {
        super([]);
        this._valueStr = input;

        const inputBuffer: ArrayBuffer = String.UTF8.encode(input);
        const u8Input = Uint8Array.wrap(inputBuffer);

        for (let i = 0; i < u8Input.length; i++) {
            this.values[i] = u8Input[i];
        }
    }
    /**
     * @description Non-static constructor method used to populate defined properties of the model
     * @param bytes SCALE encoded bytes
     * @param index index to start decoding the bytes from
     */
    populateFromBytes(bytes: u8[], index: i32 = 0): void{
        // constructor
        this._valueStr = ScaleString._computeValueStr(bytes, index);
        const inputBuffer: ArrayBuffer = String.UTF8.encode(this._valueStr);
        const u8Input = Uint8Array.wrap(inputBuffer);

        for (let i = 0; i < u8Input.length; i++) {
            this.values[i] = u8Input[i];
        }
    }

    /**
     * @description Returns the string representation
     */
    toString (): string {
        return this._valueStr;
    }

    /**
     * Internal private function to compute the string value from the bytes
     * @param bytes 
     * @param index 
     */
    static _computeValueStr(bytes: u8[], index: i32 = 0): string {
        const len = Bytes.decodeCompactInt(bytes, index);
        const bytesLength = i32(len.value);
        const stringStart = i32(len.decBytes);
        assert(bytes.length - index - len.decBytes >= 1, "ScaleString: Incorrectly encoded input");
        const buff = new Uint8Array(bytesLength);
        Bytes.copyToTyped(bytes, buff, 0, index+stringStart);
        return String.UTF8.decode(buff.buffer);
    }
    /**
    * @description Instantiates String from u8[] SCALE encoded bytes (Decode)
    */
    static fromU8a (input: u8[], index: i32 = 0): ScaleString {
        return new ScaleString(ScaleString._computeValueStr(input, index));
    }

    @inline @operator('==')
    static eq(a: ScaleString, b: ScaleString): bool {
        return a.eq(b);
    }

    @inline @operator('!=')
    static notEq(a: ScaleString, b: ScaleString): bool {
        return a.notEq(b);
    }
}
