import { BytesReader } from "../BytesReader";
import { Hash, Bool } from "../index";
import { UInt32, UInt16, UInt64, UInt8 } from "../UInt";
import { Int8, Int16, Int32, Int64, CompactInt } from "../Int";
import { ScaleString } from "../ScaleString";
import { ByteArray } from "../Arrays";

describe("BytesReader", () => {
    it("decodes single type", () => {
        const buffer = new BytesReader([0]);
        assert(
            buffer.readInto<Bool>() == new Bool(false),
            "Not correctly decoded"
        );
    });

    it("decoding simplified", () => {
        const buffer = new BytesReader([1, 1, 0]);
        expect<UInt8>(buffer.readInto<UInt8>()).toStrictEqual(new UInt8(1));
        expect<UInt16>(buffer.readInto<UInt16>()).toStrictEqual(new UInt16(1));
    });

    it("decodes two types", () => {
        const buffer = new BytesReader([1, 69, 0, 0, 0]);
        expect<Bool>(buffer.readInto<Bool>()).toStrictEqual(new Bool(true));
        expect<UInt32>(buffer.readInto<UInt32>()).toStrictEqual(new UInt32(69));
    });

    it("decodes many types", () => {
        const u32Bytes: u8[] = [12, 0, 0, 0];
        const hashBytes: u8[] = [
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
        ];
        const scaleStringBytes: u8[] = [16, 110, 105, 99, 101];
        const buffer = new BytesReader(
            u32Bytes.concat(hashBytes).concat([1]).concat(scaleStringBytes)
        );
        expect<UInt32>(buffer.readInto<UInt32>()).toStrictEqual(new UInt32(12));
        expect<Hash>(buffer.readInto<Hash>()).toStrictEqual(
            new Hash(hashBytes)
        );
        expect<Bool>(buffer.readInto<Bool>()).toStrictEqual(new Bool(true));
        expect<ScaleString>(buffer.readInto<ScaleString>()).toStrictEqual(
            new ScaleString("nice")
        );
    });

    it("decodes list of unsigned integers", () => {
        const bytes: u8[] = [1, 0, 0, 0, 0, 0, 0, 0, 69, 0, 0, 0, 4, 0, 223];
        const buffer = new BytesReader(bytes);
        expect<UInt64>(buffer.readInto<UInt64>()).toStrictEqual(new UInt64(1));
        expect<UInt32>(buffer.readInto<UInt32>()).toStrictEqual(new UInt32(69));
        expect<UInt16>(buffer.readInto<UInt16>()).toStrictEqual(new UInt16(4));
        expect<UInt8>(buffer.readInto<UInt8>()).toStrictEqual(new UInt8(223));
    });

    it("decodes list of signed integers", () => {
        const bytes: u8[] = [
            0xff,
            0xff,
            0xff,
            0xff,
            0xff,
            0xff,
            0xff,
            0xff,
            0xff,
            0xff,
            0xff,
            0xdd,
            0xfe,
            0xff,
            0xf1,
        ];
        const buffer = new BytesReader(bytes);
        expect<Int64>(buffer.readInto<Int64>()).toStrictEqual(new Int64(-1));
        expect<Int32>(buffer.readInto<Int32>()).toStrictEqual(
            new Int32(-570425345)
        );
        expect<Int16>(buffer.readInto<Int16>()).toStrictEqual(new Int16(-2));
        expect<Int8>(buffer.readInto<Int8>()).toStrictEqual(new Int8(-15));
    });

    it("decodes list of CompactInts correctly", () => {
        const bytes: u8[] = [4, 40, 69, 2, 21, 1, 110, 125, 239, 2];
        const buffer = new BytesReader(bytes);
        expect<CompactInt>(buffer.readInto<CompactInt>()).toStrictEqual(
            new CompactInt(1)
        );
        expect<CompactInt>(buffer.readInto<CompactInt>()).toStrictEqual(
            new CompactInt(10)
        );
        expect<CompactInt>(buffer.readInto<CompactInt>()).toStrictEqual(
            new CompactInt(145)
        );
        expect<CompactInt>(buffer.readInto<CompactInt>()).toStrictEqual(
            new CompactInt(69)
        );
        expect<CompactInt>(buffer.readInto<CompactInt>()).toStrictEqual(
            new CompactInt(12312411)
        );
    });

    it("decodes byteArray correctly", () => {
        const bytes: u8[] = [40, 12, 123, 1, 21, 12, 33, 12, 21, 12, 1];
        const buffer = new BytesReader(bytes);
        expect<ByteArray>(buffer.readInto<ByteArray>()).toStrictEqual(
            new ByteArray(bytes.slice(1))
        );
    });

    it("decodes ScaleString correctly", () => {
        const bytes: u8[] = [
            8,
            97,
            115,
            20,
            115,
            99,
            97,
            108,
            101,
            20,
            99,
            111,
            100,
            101,
            99,
        ];
        const buffer = new BytesReader(bytes);
        expect<ScaleString>(buffer.readInto<ScaleString>()).toStrictEqual(
            new ScaleString("as")
        );
        expect<ScaleString>(buffer.readInto<ScaleString>()).toStrictEqual(
            new ScaleString("scale")
        );
        expect<ScaleString>(buffer.readInto<ScaleString>()).toStrictEqual(
            new ScaleString("codec")
        );
    });
    it("static method works", () => {
        const byteArray: u8[] = [40, 12, 123, 1, 21, 12, 33, 12, 21, 12, 1];
        expect<ByteArray>(
            BytesReader.decodeInto<ByteArray>(byteArray)
        ).toStrictEqual(new ByteArray(byteArray.slice(1)));
        const uintU8a: u8[] = [1, 0, 0, 0, 0, 0, 0, 0];
        expect<UInt64>(BytesReader.decodeInto<UInt64>(uintU8a)).toStrictEqual(
            new UInt64(1)
        );
        const stringU8a: u8[] = [20, 99, 111, 100, 101, 99];
        expect<ScaleString>(
            BytesReader.decodeInto<ScaleString>(stringU8a)
        ).toStrictEqual(new ScaleString("codec"));
        const compactU8a: u8[] = [110, 125, 239, 2];
        expect<CompactInt>(
            BytesReader.decodeInto<CompactInt>(compactU8a)
        ).toStrictEqual(new CompactInt(12312411));
        const u32U8a: u8[] = [69, 0, 0, 0];
        expect<UInt32>(BytesReader.decodeInto<UInt32>(u32U8a)).toStrictEqual(
            new UInt32(69)
        );
        const hashU8a: u8[] = [
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
        ];
        expect<Hash>(BytesReader.decodeInto<Hash>(hashU8a)).toStrictEqual(
            new Hash(hashU8a)
        );
    });
});
