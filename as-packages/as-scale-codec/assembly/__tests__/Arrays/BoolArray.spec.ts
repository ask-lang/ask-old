import { BoolArray } from "../../Arrays/BoolArray";

describe("Bool Array", () => {
    it("should encode bool array", () => {
        const boolArray: BoolArray = new BoolArray([true, false, true]);
        expect<Array<u8>>(boolArray.toU8a()).toStrictEqual([
            0x0c,
            0x01,
            0x00,
            0x01,
        ]);
    });

    it("should decode bool array", () => {
        const boolTest1: u8[] = [0x00];
        expect<BoolArray>(BoolArray.fromU8a(boolTest1)).toStrictEqual(
            new BoolArray([])
        );

        const boolTest2: u8[] = [0x0c, 0x01, 0x00, 0x01];
        expect<BoolArray>(BoolArray.fromU8a(boolTest2)).toStrictEqual(
            new BoolArray([true, false, true])
        );
    });

    it("should decode bool array with populate method", () => {
        const boolArray1 = new BoolArray();
        boolArray1.populateFromBytes([0x08, 0x00, 0x01]);
        expect<BoolArray>(boolArray1).toStrictEqual(
            new BoolArray([false, true])
        );
        const boolArray = new BoolArray();
        boolArray.populateFromBytes([0x0c, 0x00, 0x01, 0x01]);
        expect<BoolArray>(boolArray).toStrictEqual(
            new BoolArray([false, true, true])
        );
    });
    itThrows("should throw because of invalid bytes", () => {
        const boolTest: u8[] = [0x0c, 0x00, 0x01, 0xff];
        BoolArray.fromU8a(boolTest);
    });

    itThrows("should throw on incorrect encoding", () => {
        const boolTest: u8[] = [0x0c]; // Encoded length = 3, actual data length = 0
        BoolArray.fromU8a(boolTest);
    });
});
