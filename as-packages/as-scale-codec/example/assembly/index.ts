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
import {
    Bool,
    Byte,
    BytesReader,
    CompactInt,
    Hash,
    Int16,
    Int32,
    Int64,
    Int8,
    ScaleMap,
    ScaleString,
    UInt128,
    UInt128Array,
    UInt16,
    UInt32,
    UInt64,
    UInt8,
} from "pl-as-scale-codec";

export function demonstrate(): void {
    trace(`Encoding examples:`);

    // Bool
    const scaleBool = new Bool(true);
    trace("bool(true) -> " + scaleBool.toU8a().toString());

    // Byte
    const scaleByte = new Byte(0x01);
    trace("Byte(0x01) -> " + scaleByte.toU8a().toString());

    // String
    const scaleString = new ScaleString("a");
    trace("String(a) -> " + scaleString.toU8a().toString());

    // ScaleMap
    const scaleMap = new ScaleMap<Int32, Bool>();
    scaleMap.set(new Int32(1), new Bool(false));
    trace("ScaleMap(new Map([[1, false]])" + scaleMap.toU8a().toString()); // => [4, 1, 0, 0, 0, 0];

    // Hash
    const scaleHash = new Hash([0xff, 0x00, 0xab]);
    trace("Hash([0xff, 0x00, 0xab]) -> " + scaleHash.toU8a().toString()); // => [0xff, 0x00, 0xab, 0x00, ... 0x00] (32 bytes long)

    // Compact Int
    const scaleCompactInt = new CompactInt(1);
    trace("CompactInt(1) ->  " + scaleCompactInt.toU8a().toString()); // => [0x04]

    // Int
    const scaleInt8 = new Int8(-1);
    trace("Int8(-1) -> " + scaleInt8.toU8a().toString()); // => [0xff]

    const scaleInt16 = new Int16(-1);
    trace("Int16(-1) -> " + scaleInt16.toU8a().toString()); // => [0xff, 0xff]

    const scaleInt32 = new Int32(-1);
    trace("Int32(-1) -> " + scaleInt32.toU8a().toString()); // => [0xff, 0xff, 0xff, 0xff]

    const scaleInt64 = new Int64(-1);
    trace("Int64(-1)  -> " + scaleInt64.toU8a().toString()); // => [0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]

    const scaleUInt8 = new UInt8(1);
    trace("UInt8(1)  -> " + scaleUInt8.toU8a().toString()); // => [0x01]

    const scaleUInt16 = new UInt16(1);
    trace("Uint16(1) -> " + scaleUInt16.toU8a().toString()); // => [0x01, 0x00]

    const scaleUInt32 = new UInt32(1);
    trace("Uint32(1) -> " + scaleUInt32.toU8a().toString()); // => [0x01, 0x00, 0x00, 0x00]

    const scaleUInt64 = new UInt64(1);
    trace("Uint64(1) -> " + scaleUInt64.toU8a().toString()); // => [0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]

    const scaleUInt128 = new UInt128(u128.fromU64(18446744073709551615));
    trace(
        "Uint128(18446744073709551615) -> " + scaleUInt128.toU8a().toString()
    ); // => [0x13, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]

    trace("Bool [0x01] -> " + Bool.fromU8a([0x01]).value.toString());
    trace("Byte [0x01] -> " + Byte.fromU8a([0x01]).value.toString());

    const decodeStr = ScaleString.fromU8a([0x04, 0x61]);
    trace("String [0x04, 0x61] -> " + decodeStr.valueStr.toString());
    const decodeHash = Hash.fromU8a([0xff, 0x00, 0xab]);
    trace("Hash [0xff, 0x00, 0xab] -> " + decodeHash.toString());
    trace(
        "CompactInt [0x04] -> " + CompactInt.fromU8a([0x04]).value.toString()
    );
    trace("Int8 [0xff] -> " + Int8.fromU8a([0xff]).value.toString());
    trace(
        "Int16 [0xff, 0xff] -> " + Int16.fromU8a([0xff, 0xff]).value.toString()
    );
    trace(
        "Int32 [0xff, 0xff, 0xff, 0xff] -> " +
            Int32.fromU8a([0xff, 0xff, 0xff, 0xff]).toString()
    );
    trace(
        "Int64 [0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff] -> " +
            Int64.fromU8a([
                0xff,
                0xff,
                0xff,
                0xff,
                0xff,
                0xff,
                0xff,
                0xff,
            ]).value.toString()
    );

    trace("UInt8 [0x01] -> " + UInt8.fromU8a([0x01]).value.toString());
    trace(
        "UInt16 [0x01, 0x00] -> " +
            UInt16.fromU8a([0x01, 0x00]).value.toString()
    );
    trace(
        "UInt32 [0x01, 0x00, 0x00, 0x00] -> " +
            UInt32.fromU8a([0x01, 0x00, 0x00, 0x00]).toString()
    );
    trace(
        "UInt64 [0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00] -> " +
            UInt64.fromU8a([
                0x01,
                0x00,
                0x00,
                0x00,
                0x00,
                0x00,
                0x00,
                0x00,
            ]).value.toString()
    );
    trace(
        "UInt128 [0x33, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff] -> " +
            UInt128.fromU8a([
                0x33,
                0x00,
                0x00,
                0x00,
                0x00,
                0x00,
                0x00,
                0x00,
                0x00,
                0xff,
                0xff,
                0xff,
                0xff,
                0xff,
                0xff,
                0xff,
                0xff,
            ]).toString()
    );

    trace("Decoding using popualateFromBytes Codec method");
    const hash = new Hash();
    hash.populateFromBytes([
        12,
        123,
        123,
        12,
        12,
        12,
        3,
        31,
        12,
        12,
        123,
        3,
        5,
        1,
        2,
        34,
        6,
        8,
        9,
        12,
        12,
        32,
        21,
        53,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
    ]);
    trace(
        "Hash [12, 123, 123, 12, 12, 12, 3, 31, 12, 12, 123, 3, 5, 1, 2, 34, 6, 8, 9, 12, 12, 32, 21, 53, 0, 0, 0, 0, 0, 0, 0, 0] -> " +
            hash.toString()
    );
    const int64 = new Int64();
    int64.populateFromBytes([255, 255, 255, 1]);
    trace("Int64 [21, 21, 2, 1] -> " + int64.value.toString());
    const cmpInt = new CompactInt();
    cmpInt.populateFromBytes([145, 2]);
    trace("CompactInt [145, 2] -> " + cmpInt.value.toString());
    const uInt64 = new UInt64();
    uInt64.populateFromBytes([1, 1, 1, 1]);
    trace("UInt64 [1, 1, 1, 1] -> " + uInt64.value.toString());
    const scaleString1 = new ScaleString();
    scaleString1.populateFromBytes([20, 99, 99, 100, 112, 103]);
    trace(
        "ScaleString [97, 99, 99, 100, 112, 103] -> " + scaleString1.valueStr
    );
    const byte = new Byte();
    byte.populateFromBytes([8]);
    trace("Byte [8] -> " + byte.toU8a().toString());
    const int32 = new Int32();
    int32.populateFromBytes([255, 0, 0, 0]);
    trace("Int32 [255, 0, 0, 0] -> " + int32.value.toString());

    trace("Decoding using BytesReader");
    const bytes: u8[] = [
        0xff,
        0xff,
        0xff,
        0xff,
        0xff,
        0xff,
        0xff,
        0xff,
        69,
        0,
        0,
        0,
        110,
        125,
        239,
        2,
        56,
        97,
        115,
        45,
        115,
        99,
        97,
        108,
        101,
        45,
        99,
        111,
        100,
        101,
        99,
        128,
        1,
        10,
        0,
        0,
        0,
        2,
        2,
        1,
        123,
        33,
        3,
        1,
        35,
        34,
        5,
        8,
        22,
        52,
        1,
        0,
        0,
        0,
        1,
        1,
        1,
        56,
        21,
        142,
        13,
        13,
        1,
        0,
    ];

    const bytesReader = new BytesReader(bytes);
    trace(
        "Int64 [0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff] -> " +
            bytesReader.readInto<Int64>().value.toString()
    );
    trace(
        "UInt32 [69, 0, 0, 0] -> " +
            bytesReader.readInto<UInt32>().value.toString()
    );
    trace(
        "CompactInt [110, 125, 239, 2] -> " +
            bytesReader.readInto<CompactInt>().value.toString()
    );
    trace(
        "ScaleString [56, 97, 115, 45, 115, 99, 97, 108, 101, 45, 99, 111, 100, 101, 99] -> " +
            bytesReader.readInto<ScaleString>().valueStr
    );
    trace(
        "Hash [128, 1, 10, 0, 0, 0, 2, 2, 1, 123, 33, 3, 1, 35, 34, 5, 8, 22, 52, 1, 0, 0, 0, 1, 1, 1, 56, 21, 142, 13, 13, 1] -> " +
            bytesReader.readInto<Hash>().toString()
    );
    trace("Bool [0] -> " + bytesReader.readInto<Bool>().toString());
    trace(
        "CompactInt [169, 2] -> " +
            BytesReader.decodeInto<CompactInt>([169, 2]).toString()
    );
    trace(
        "Int8 [0xff] -> " + BytesReader.decodeInto<Int8>([0xff]).toString()
    );
    trace(
        "UInt8 [123] -> " + BytesReader.decodeInto<UInt8>([123]).toString()
    );
    trace(
        "UInt128Array [0x10, 0x04, 0x0c, 0x0c, 0x10] -> " +
            BytesReader.decodeInto<UInt128Array>([
                0x10,
                0x04,
                0x0c,
                0x0c,
                0x10,
            ]).values.toString()
    );
    trace(
        "ScaleMap(new Map([[1, false]] -> " +
            BytesReader.decodeInto<ScaleMap<Int32, Bool>>([4, 1, 0, 0, 0, 0])
                .toU8a()
                .toString()
    );
}
