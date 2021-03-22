import { IntArray } from "../../Arrays/IntArray";

describe("IntArray", () => {
    it("should encode int array", () => {
        const dataInput: Array<Array<i64>> = [
            [1], // Expected output: [0x04, 0x04]
            [1, 2, 3, 4], // Expected output: [0x10, 0x04, 0x08, 0x0c, 0x10]
            [16384, 2, 3, 4], // Expected output: [0x10, 0x02, 0x00, 0x01, 0x00, 0x08, 0x0c, 0x10]
            [
                97222587,
                260918714,
                432884242,
                497178323,
                524283510,
                530431722,
                619955096,
                629855926,
                884757710,
                947465305,
            ],
        ];

        const expectedOutput: Array<Array<u8>> = [
            [0x04, 0x04],
            [0x10, 0x04, 0x08, 0x0c, 0x10],
            [0x10, 0x02, 0x00, 0x01, 0x00, 0x08, 0x0c, 0x10],
            [
                0x28,
                0xee,
                0xfe,
                0x2d,
                0x17,
                0xea,
                0x36,
                0x35,
                0x3e,
                0x4a,
                0x28,
                0x35,
                0x67,
                0x4e,
                0x5b,
                0x89,
                0x76,
                0xda,
                0xb9,
                0xff,
                0x7c,
                0xaa,
                0xfb,
                0x76,
                0x7e,
                0x62,
                0x0e,
                0xcf,
                0x93,
                0xda,
                0x5a,
                0x2b,
                0x96,
                0x3a,
                0x53,
                0xf1,
                0xd2,
                0x66,
                0xb1,
                0xe4,
                0xe1,
            ],
        ];

        for (let i = 0; i < dataInput.length; i++) {
            const intArray = new IntArray(dataInput[i]);
            expect<Array<u8>>(intArray.toU8a()).toStrictEqual(
                expectedOutput[i]
            );
        }
    });

    it("should decode int array", () => {
        const dataInput: Array<Array<u8>> = [
            [0x04, 0x04], // Expected output: [1]
            [0x10, 0x04, 0x08, 0x0c, 0x10], // Expected output: [1, 2, 3, 4]
            [0x10, 0x02, 0x00, 0x01, 0x00, 0x08, 0x0c, 0x10], // Expected output: [16384, 2, 3, 4]
            [
                0x28,
                0xee,
                0xfe,
                0x2d,
                0x17,
                0xea,
                0x36,
                0x35,
                0x3e,
                0x4a,
                0x28,
                0x35,
                0x67,
                0x4e,
                0x5b,
                0x89,
                0x76,
                0xda,
                0xb9,
                0xff,
                0x7c,
                0xaa,
                0xfb,
                0x76,
                0x7e,
                0x62,
                0x0e,
                0xcf,
                0x93,
                0xda,
                0x5a,
                0x2b,
                0x96,
                0x3a,
                0x53,
                0xf1,
                0xd2,
                0x66,
                0xb1,
                0xe4,
                0xe1,
            ],
        ];

        const expectedOutput: Array<Array<i64>> = [
            [1],
            [1, 2, 3, 4],
            [16384, 2, 3, 4],
            [
                97222587,
                260918714,
                432884242,
                497178323,
                524283510,
                530431722,
                619955096,
                629855926,
                884757710,
                947465305,
            ],
        ];

        for (let i = 0; i < dataInput.length; i++) {
            const result = IntArray.fromU8a(dataInput[i]);
            expect<IntArray>(result).toStrictEqual(
                new IntArray(expectedOutput[i])
            );
        }
    });

    it("should decode int array with populate method", () => {
        const dataInput: Array<Array<u8>> = [
            [0x04, 0x04], // Expected output: [1]
            [0x10, 0x04, 0x08, 0x0c, 0x10], // Expected output: [1, 2, 3, 4]
            [0x10, 0x02, 0x00, 0x01, 0x00, 0x08, 0x0c, 0x10], // Expected output: [16384, 2, 3, 4]
            [
                0x28,
                0xee,
                0xfe,
                0x2d,
                0x17,
                0xea,
                0x36,
                0x35,
                0x3e,
                0x4a,
                0x28,
                0x35,
                0x67,
                0x4e,
                0x5b,
                0x89,
                0x76,
                0xda,
                0xb9,
                0xff,
                0x7c,
                0xaa,
                0xfb,
                0x76,
                0x7e,
                0x62,
                0x0e,
                0xcf,
                0x93,
                0xda,
                0x5a,
                0x2b,
                0x96,
                0x3a,
                0x53,
                0xf1,
                0xd2,
                0x66,
                0xb1,
                0xe4,
                0xe1,
            ],
        ];

        const expectedOutput: Array<Array<i64>> = [
            [1],
            [1, 2, 3, 4],
            [16384, 2, 3, 4],
            [
                97222587,
                260918714,
                432884242,
                497178323,
                524283510,
                530431722,
                619955096,
                629855926,
                884757710,
                947465305,
            ],
        ];
        for (let i = 0; i < dataInput.length; i++) {
            const result = new IntArray();
            result.populateFromBytes(dataInput[i]);
            expect<IntArray>(result).toStrictEqual(
                new IntArray(expectedOutput[i])
            );
        }
    });

    itThrows("should throw on incorrect encoding", () => {
        const invalidEncodedArray1: u8[] = [0x10, 0x04];
        IntArray.fromU8a(invalidEncodedArray1);

        const invalidEncodedArray2: u8[] = [0x10];
        IntArray.fromU8a(invalidEncodedArray2);
    });
});
