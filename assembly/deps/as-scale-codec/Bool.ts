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

import { UnwrappableCodec } from "./interfaces/UnwrappableCodec";

/** Representation for a boolean value in the system. */
export class Bool implements UnwrappableCodec<bool> {

    private _value: bool;
    
    constructor (value: bool = false) {
        this._value = value;
    }

    /**
     * @description Returns the inner native value
     */
    public unwrap(): bool{
        return this._value;
    }

    /** Encodes the value as u8[] as per the SCALE codec specification
     * true -> [1]
     * false -> [0]
     */
    toU8a (): u8[] {
        let bytesEncoded = new Array<u8>(1);
        bytesEncoded[0] = this._value ? 0x01 : 0x00;
        return bytesEncoded;
    }

    /**
     * @description Non-static constructor method used to populate defined properties of the model.
     * @param bytes SCALE encoded bytes
     * @param index index to start decoding the bytes from
     */
    public populateFromBytes(bytes: u8[], index: i32 = 0): void{
        assert(bytes.length > 0 && (bytes[index] == 1 || bytes[index] == 0), 'Bool: Cannot decode invalid input');
        this._value = bytes[index] == 1;
    }

    /**
     * @description Returns the string representation of the value
     */
    toString (): string {
        return this._value.toString();
    }
    
    eq(other: Bool): bool {
        return this._value == other.unwrap();
    }

    notEq(other: Bool): bool {
        return this._value != other.unwrap();
    }
    /**
     * @description The length of Uint8Array when the value is encoded
     */
    public encodedLength (): i32 {
        return 1;
    }

    /** Instantiates new Bool from u8[] SCALE encoded bytes */
    static fromU8a (value: u8[], index: i32 = 0): Bool {
        assert(value.length - index > 0 && (value[index] == 1 || value[index] == 0), 'Bool: Cannot decode invalid input');

        return new Bool(value[index] == 1);
    }

    @inline @operator('==')
    static eq(a: Bool, b: Bool): bool {
        return a.eq(b);
    }

    @inline @operator('!=')
    static notEq(a: Bool, b: Bool): bool {
        return a.notEq(b);
    }
}
