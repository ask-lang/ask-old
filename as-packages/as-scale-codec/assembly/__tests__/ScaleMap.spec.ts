import { u128 } from "as-bignum";
import { BytesReader } from "..";
import { ByteArray } from "../Arrays";
import { Bool } from "../Bool";
import { Hash } from "../Hash";
import { ScaleMap } from "../ScaleMap";
import { ScaleString } from "../ScaleString";
import { UInt128, UInt16, UInt32, UInt64 } from "../UInt";

describe("String", () => {
    it("should encode ScaleMap", () => {
        const scaleMap1 = new ScaleMap<ScaleString, ByteArray>();
        scaleMap1.set(
            new ScaleString("scale"),
            new ByteArray([2, 3, 1, 9, 2, 12])
        );
        scaleMap1.set(
            new ScaleString("codec"),
            new ByteArray([12, 23, 12, 59])
        );
        scaleMap1.set(
            new ScaleString("as"),
            new ByteArray([12, 23, 52, 59, 92])
        );
        expect<u8[]>(scaleMap1.toU8a()).toStrictEqual([
            12,
            20,
            115,
            99,
            97,
            108,
            101,
            24,
            2,
            3,
            1,
            9,
            2,
            12,
            20,
            99,
            111,
            100,
            101,
            99,
            16,
            12,
            23,
            12,
            59,
            8,
            97,
            115,
            20,
            12,
            23,
            52,
            59,
            92,
        ]);

        const scaleMap2 = new ScaleMap<UInt64, ByteArray>();
        scaleMap2.set(new UInt64(0), new ByteArray([10, 2, 3, 10, 9, 2, 12]));
        scaleMap2.set(new UInt64(1), new ByteArray([98, 123, 23, 12, 59]));
        scaleMap2.set(new UInt64(2), new ByteArray([12, 23, 52, 59, 92]));
        scaleMap2.set(
            new UInt64(3),
            new ByteArray([12, 123, 98, 59, 92, 123, 0, 93, 2, 1])
        );
        expect<u8[]>(scaleMap2.toU8a()).toStrictEqual([
            16,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            28,
            10,
            2,
            3,
            10,
            9,
            2,
            12,
            1,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            20,
            98,
            123,
            23,
            12,
            59,
            2,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            20,
            12,
            23,
            52,
            59,
            92,
            3,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            40,
            12,
            123,
            98,
            59,
            92,
            123,
            0,
            93,
            2,
            1,
        ]);
    });

    it("should decode ScaleMap", () => {
        const mapU8a: u8[] = [
            16,
            0,
            0,
            0,
            0,
            28,
            10,
            2,
            3,
            10,
            9,
            2,
            12,
            1,
            0,
            0,
            0,
            32,
            1,
            0,
            98,
            123,
            23,
            12,
            59,
            1,
            2,
            0,
            0,
            0,
            12,
            12,
            23,
            52,
            3,
            0,
            0,
            0,
            44,
            0,
            12,
            123,
            98,
            59,
            92,
            123,
            0,
            93,
            2,
            1,
        ];
        const decodedMap = BytesReader.decodeInto<ScaleMap<UInt32, ByteArray>>(
            mapU8a
        );
        const scaleMap = new ScaleMap<UInt32, ByteArray>();
        scaleMap.set(new UInt32(0), new ByteArray([10, 2, 3, 10, 9, 2, 12]));
        scaleMap.set(
            new UInt32(1),
            new ByteArray([1, 0, 98, 123, 23, 12, 59, 1])
        );
        scaleMap.set(new UInt32(2), new ByteArray([12, 23, 52]));
        scaleMap.set(
            new UInt32(3),
            new ByteArray([0, 12, 123, 98, 59, 92, 123, 0, 93, 2, 1])
        );
        expect<bool>(decodedMap.eq(scaleMap)).toStrictEqual(true);

        const map1U8a: u8[] = [
            24,
            1,
            0,
            1,
            3,
            0,
            0,
            12,
            0,
            1,
            4,
            0,
            0,
            10,
            0,
            1,
            11,
            0,
            0,
        ];
        const decodedMap1 = BytesReader.decodeInto<ScaleMap<UInt16, Bool>>(
            map1U8a
        );
        const scaleMap1 = new ScaleMap<UInt16, Bool>();
        scaleMap1.set(new UInt16(1), new Bool(true));
        scaleMap1.set(new UInt16(3), new Bool(false));
        scaleMap1.set(new UInt16(12), new Bool(true));
        scaleMap1.set(new UInt16(4), new Bool(false));
        scaleMap1.set(new UInt16(10), new Bool(true));
        scaleMap1.set(new UInt16(11), new Bool(false));
        expect<bool>(decodedMap1.eq(scaleMap1)).toStrictEqual(true);

        const map2U8a: u8[] = [
            8,
            1,
            12,
            12,
            12,
            1,
            1,
            1,
            0,
            0,
            0,
            1,
            12,
            123,
            123,
            11,
            123,
            33,
            121,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0xff,
            0x00,
            0xab,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            64,
            226,
            1,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
        ];
        const decodedMap2 = BytesReader.decodeInto<ScaleMap<Hash, UInt128>>(
            map2U8a
        );
        const scaleMap2 = new ScaleMap<Hash, UInt128>();
        scaleMap2.set(
            new Hash([
                1,
                12,
                12,
                12,
                1,
                1,
                1,
                0,
                0,
                0,
                1,
                12,
                123,
                123,
                11,
                123,
                33,
                121,
            ]),
            new UInt128(u128.fromU32(1))
        );
        scaleMap2.set(
            new Hash([0xff, 0x00, 0xab]),
            new UInt128(u128.fromU32(123456))
        );
        expect<bool>(decodedMap2.eq(scaleMap2)).toStrictEqual(true);
    });
});
