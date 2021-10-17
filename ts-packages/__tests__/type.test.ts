import { AstUtil } from "../transform/src/utils/utils";


describe("Test AstUtil", () => {

    test("test type", () => {
        let rs = AstUtil.getArrayArgument("Array<UInt>");
        expect(rs).toBe("UInt");

        rs = AstUtil.getArrayArgument(" u8 []");
        expect(rs).toBe("u8");

        rs = AstUtil.getArrayArgument("u8[]");
        expect(rs).toBe("u8");

        rs = AstUtil.getArrayArgument("Array< UInt>");
        expect(rs).toBe("UInt");

        rs = AstUtil.getArrayArgument("Array<UInt>");
        expect(rs).toBe("UInt");

        rs = AstUtil.getArrayArgument("Car");
        expect(rs).toBe("Car");
    });

});