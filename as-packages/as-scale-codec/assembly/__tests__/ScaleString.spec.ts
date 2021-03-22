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

import { ScaleString } from "../ScaleString";

describe("String", () => {
    it("should encode string", () => {
        const test1 = new ScaleString("hello_world");
        expect<Array<u8>>(test1.toU8a()).toStrictEqual([
            0x2c,
            0x68,
            0x65,
            0x6c,
            0x6c,
            0x6f,
            0x5f,
            0x77,
            0x6f,
            0x72,
            0x6c,
            0x64,
        ]);
        expect<i32>(test1.toU8a().length).toStrictEqual(12);

        const str2 =
            "A set of words that is complete in itself, typically containing a subject and predicate";
        const test2 = new ScaleString(str2);
        expect<Array<u8>>(test2.toU8a()).toStrictEqual(
            append([0x5d, 0x01], str2)
        );
        expect<i32>(test2.toU8a().length).toStrictEqual(89);

        const str3 = "™ ± Ã ¿ £ µ";
        const test3 = new ScaleString(str3);
        expect<Array<u8>>(test3.toU8a()).toStrictEqual([
            0x48,
            0xe2,
            0x84,
            0xa2,
            0x20,
            0xc2,
            0xb1,
            0x20,
            0xc3,
            0x83,
            0x20,
            0xc2,
            0xbf,
            0x20,
            0xc2,
            0xa3,
            0x20,
            0xc2,
            0xb5,
        ]);
        expect<i32>(test3.toU8a().length).toStrictEqual(19);

        const str4 =
            "The 1963 Impala featured rectilinear styling with an engine-turned aluminum rear taillight panel surrounded by a chrome border on SS models.";
        const test4 = new ScaleString(repeatString(str4, 500));
        expect<Array<u8>>(test4.toU8a()).toStrictEqual(
            append([0xc2, 0x45, 0x04, 0x00], repeatString(str4, 500))
        );
        expect<i32>(test4.toU8a().length).toStrictEqual(70004);
    });

    it("should decode string", () => {
        const scaleString = ScaleString.fromU8a([0x04, 0x61]);
        expect<Array<u8>>(scaleString.values).toStrictEqual([0x61]);
        expect<string>(scaleString.toString()).toStrictEqual("a");

        const scaleString1 = ScaleString.fromU8a([
            0x08,
            0x64,
            0x61,
            0x62,
            0x62,
        ]);
        expect<Array<u8>>(scaleString1.values).toStrictEqual([0x64, 0x61]);
        expect<string>(scaleString1.toString()).toStrictEqual("da");
    });

    it("should encode to hex", () => {
        const scaleString = new ScaleString("as-scale-codec");
        expect<string>(scaleString.toHexString()).toStrictEqual(
            "0x61732d7363616c652d636f646563"
        );
        const scaleString1 = new ScaleString(
            "The 1963 Impala featured rectilinear styling with an engine-turned aluminum rear taillight panel surrounded by a chrome border on SS models."
        );
        expect<string>(scaleString1.toHexString()).toStrictEqual(
            "0x546865203139363320496d70616c612066656174757265642072656374696c696e656172207374796c696e67207769746820616e20656e67696e652d7475726e656420616c756d696e756d2072656172207461696c6c696768742070616e656c20737572726f756e6465642062792061206368726f6d6520626f72646572206f6e205353206d6f64656c732e"
        );
        const scaleString2 = new ScaleString(
            "A set of words that is complete in itself, typically containing a subject and predicate"
        );
        expect<string>(scaleString2.toHexString()).toStrictEqual(
            "0x4120736574206f6620776f726473207468617420697320636f6d706c65746520696e20697473656c662c207479706963616c6c7920636f6e7461696e696e672061207375626a65637420616e6420707265646963617465"
        );
    });

    itThrows("should throw on incorrect encoding", () => {
        ScaleString.fromU8a([0x04]); // Encoded length = 1, actual data length = 0
    });

    itThrows("should throw when index is out of range", () => {
        ScaleString.fromU8a([8, 0, 1, 12, 0, 1, 3], 8);
    });
});

function append(to: Array<u8>, from: string): Array<u8> {
    const strToBytes: ArrayBuffer = String.UTF8.encode(from);
    const strArray: Uint8Array = Uint8Array.wrap(strToBytes);

    for (let i = 0; i < strArray.length; i++) {
        to.push(strArray[i]);
    }

    return to;
}

function repeatString(str: string, numberOfRepeats: i32): string {
    let result: string = str;
    for (let i = 1; i < numberOfRepeats; i++) {
        result += str;
    }

    return result;
}
