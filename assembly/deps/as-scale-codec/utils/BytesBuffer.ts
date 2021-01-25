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

import { BIT_LENGTH, Bytes } from "./Bytes";

export class BytesBuffer {

    public bytes: Array<u8>;

    constructor () {
        this.bytes = new Array<u8>();
    }

    /**
    * @description Encodes array length
    */
    encodeCompactInt (i: i64): void {
        if (i < 1 << 6) {
            Bytes.appendUint<u8>(this.bytes, u8(i) << 2, BIT_LENGTH.INT_8);
        } else if (i < 1 << 14) {
            Bytes.appendUint<u16>(this.bytes, u16(i << 2) + 1, BIT_LENGTH.INT_16);
        } else if (i < 1 << 30) {
            Bytes.appendUint<u32>(this.bytes, u32(i << 2) + 2, BIT_LENGTH.INT_32);
        } else {
            const o = new Array<u8>(8);
            let m = i;

            let numBytes = 0;
            for (; numBytes < 256 && m != 0; numBytes++) {
                m = m >> 8;
            }

            const topSixBits: u8 = u8(numBytes - 4);
            const lengthByte: u8 = (topSixBits << 2) + 3;

            Bytes.putUint<u8>(this.bytes, lengthByte, BIT_LENGTH.INT_8);
            Bytes.putUint<u64>(o, i64(i), BIT_LENGTH.INT_64);

            Bytes.copy<u8>(o.slice(0, numBytes), this.bytes, 1);
        }
    }

    /**
    * @description Push input in this.bytes
    */
    write (input: u8[]): void {
        Bytes.copy(input, this.bytes, this.bytes.length);
    }
}
