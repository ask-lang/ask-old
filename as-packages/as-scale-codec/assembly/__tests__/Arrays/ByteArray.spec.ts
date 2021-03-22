import { ByteArray } from "../../Arrays/ByteArray";

describe("ByteArray", () => {
    it("should encode bytes array", () => {
        const TEST_DATA_VAL: Array<Array<u8>> = [
            [0x01, 0x01, 0x01],
            [0xff],
            [0x01, 0x01],
            appendEmptyBytesTo([], 32),
            appendEmptyBytesTo([], 64),
            appendEmptyBytesTo([], 16384),
        ];

        const TEST_DATA_OUT: Array<Array<u8>> = [
            [0x0c, 0x01, 0x01, 0x01],
            [0x04, 0xff],
            [0x08, 0x01, 0x01],
            appendEmptyBytesTo([0x80], 32),
            appendEmptyBytesTo([0x01, 0x01], 64),
            appendEmptyBytesTo([0x02, 0x00, 0x01, 0x00], 16384),
        ];

        const ENCODED_BYTES: Array<i32> = [4, 2, 3, 33, 66, 16388];

        for (let i = 0; i < TEST_DATA_VAL.length; i++) {
            const byteArray = new ByteArray(TEST_DATA_VAL[i]);
            const encodedBytes = byteArray.toU8a();

            expect<i32>(encodedBytes.length).toStrictEqual(ENCODED_BYTES[i]);
            expect<u8[]>(encodedBytes).toStrictEqual(TEST_DATA_OUT[i]);
        }
    });

    it("should decode bytes array", () => {
        const TEST_DATA_VAL: Array<Array<u8>> = [
            [0x04, 0x01], // Output: [0x01]
            [0x04, 0xff], // Output: [0xff]
            [0x08, 0x01, 0x01], // Output: [0x01, 0x01]
            [0xc, 0x01, 0x01, 0x1], // Output: [0x01, 0x01, 0x01]
            [0x28, 0x42, 0x15, 0x50, 0x1c, 0x37, 0x7e, 0xd8, 0x66, 0x98, 0x2e], // Output: [0x42, 0x15, 0x50, 0x1c, 0x37, 0x7e, 0xd8, 0x66, 0x98, 0x2e]
            appendEmptyBytesTo([0x01, 0x01], 64), // Output: appendEmptyBytesTo([], 64),
            appendEmptyBytesTo([0xfd, 0xff], 16383), // Output: appendEmptyBytesTo([], 16383),
            appendEmptyBytesTo([0x02, 0x00, 0x01, 0x00], 16384), // Output: appendEmptyBytesTo([], 16384),
        ];

        const TEST_DATA_OUT: Array<Array<u8>> = [
            [0x01],
            [0xff],
            [0x01, 0x01],
            [0x01, 0x01, 0x1],
            [0x42, 0x15, 0x50, 0x1c, 0x37, 0x7e, 0xd8, 0x66, 0x98, 0x2e],
            appendEmptyBytesTo([], 64),
            appendEmptyBytesTo([], 16383),
            appendEmptyBytesTo([], 16384),
        ];

        for (let i = 0; i < TEST_DATA_VAL.length; i++) {
            const byteArray = ByteArray.fromU8a(TEST_DATA_VAL[i]);
            expect<ByteArray>(byteArray).toStrictEqual(
                new ByteArray(TEST_DATA_OUT[i])
            );
        }
    });

    it("should decode byte array with populate method", () => {
        const TEST_DATA_VAL: Array<Array<u8>> = [
            [0x04, 0x01], // Output: [0x01]
            [0x04, 0xff], // Output: [0xff]
            [0x08, 0x01, 0x01], // Output: [0x01, 0x01]
            [0xc, 0x01, 0x01, 0x1], // Output: [0x01, 0x01, 0x01]
            [0x28, 0x42, 0x15, 0x50, 0x1c, 0x37, 0x7e, 0xd8, 0x66, 0x98, 0x2e], // Output: [0x42, 0x15, 0x50, 0x1c, 0x37, 0x7e, 0xd8, 0x66, 0x98, 0x2e]
            appendEmptyBytesTo([0x01, 0x01], 64), // Output: appendEmptyBytesTo([], 64),
            appendEmptyBytesTo([0xfd, 0xff], 16383), // Output: appendEmptyBytesTo([], 16383),
            appendEmptyBytesTo([0x02, 0x00, 0x01, 0x00], 16384), // Output: appendEmptyBytesTo([], 16384),
        ];

        const TEST_DATA_OUT: Array<Array<u8>> = [
            [0x01],
            [0xff],
            [0x01, 0x01],
            [0x01, 0x01, 0x1],
            [0x42, 0x15, 0x50, 0x1c, 0x37, 0x7e, 0xd8, 0x66, 0x98, 0x2e],
            appendEmptyBytesTo([], 64),
            appendEmptyBytesTo([], 16383),
            appendEmptyBytesTo([], 16384),
        ];

        for (let i = 0; i < TEST_DATA_VAL.length; i++) {
            const byteArray = new ByteArray();
            byteArray.populateFromBytes(TEST_DATA_VAL[i]);
            expect<ByteArray>(byteArray).toStrictEqual(
                new ByteArray(TEST_DATA_OUT[i])
            );
        }
    });

    it("should return hex representation of byte array", () => {
        const byteArray = ByteArray.fromU8a([0x08, 0x01, 0x01]);
        expect<string>(byteArray.toHexString()).toStrictEqual("0x0101");
    });

    itThrows("should throw on incorrect encoding", () => {
        const byteTest: u8[] = [0x0c]; // Encoded length = 3, actual data length = 0
        ByteArray.fromU8a(byteTest);
    });

    itThrows("should throw when index is out of range", () => {
        ByteArray.fromU8a([8, 0, 1, 12, 0, 1, 3], 8);
    });
});

function appendEmptyBytesTo(arr: u8[], bytesToAppend: i32): u8[] {
    for (let i = 0; i < bytesToAppend; i++) {
        arr.push(0xff);
    }

    return arr;
}
