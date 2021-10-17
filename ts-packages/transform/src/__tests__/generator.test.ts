import { TypeKindEnum } from "../enums/customtype";
import { IndexSelector } from "../preprocess/selector";
import { TypeHelper } from "../utils/typeutil";

describe("Test generator", () => {

    test("test type", () => {
        let rs = TypeHelper.isPrimitiveType(TypeKindEnum.BIG_NUM);
        expect(rs).toBe(true);
    });


    test("test rename if arrar", () => {
        let rs = TypeHelper.renameIfArray("  []");
        expect(rs).toBe("Array");
    });

    
    // test("test index selector", () => {
    //     let rs = new IndexSelector(1);
    //     expect(rs.hex).toBe("0x0000000000000000000000000000000000000000000000000000000000000001");
    //     expect(rs.short).toBe("0x00000000");
    // });

});