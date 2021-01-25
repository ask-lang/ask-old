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

import { AbstractInt } from "../AbstractInt";
import { BIT_LENGTH, Bytes } from "../utils/Bytes";

/** Representation for a Int32 value in the system. */
export class Int32 extends AbstractInt<i32> {

    constructor (value: i32 = 0) {
        super(value, BIT_LENGTH.INT_32)
    }

    /** 
     * @description Instantiates new Int32 from u8[] SCALE encoded bytes  
     * NOTE: if the length of the provided value is less than the byte length of the Int32, 
     * it is filled with 0 bytes
    */
    static fromU8a (value: u8[], index: i32 = 0): Int32 {
        assert(value.length - index > 0, 'Int32: Empty bytes array provided');
        var res = Bytes.toUint<u32>(value, BIT_LENGTH.INT_32, index);
        return new Int32(res);
    }

    @inline @operator('==')
    static eq(a: Int32, b: Int32): bool {
        return a.eq(b);
    }

    @inline @operator('!=')
    static notEq(a: Int32, b: Int32): bool {
        return a.notEq(b);
    }
}
