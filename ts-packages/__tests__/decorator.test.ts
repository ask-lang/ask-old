import { getSimilarityDecorator } from "../transform/src/contract/decorator";
import { DecoratorUtil } from "../transform/src/utils/decoratorutil";
import { Strings } from "../transform/src/utils/primitiveutil";

describe("Test Decorator", () => {
    
    test("test decorartor", () => {
        let value = 4;
        expect(value).toBeGreaterThan(3);
    });

    test("test similarity", () => {
        let cmp1 = Strings.similarity("messsageABCzxyOscar", "massgerABZxyCarOf");
        let cmp2 = Strings.similarity("massgerABZxyCarOf", "messsageABCzxyOscar");
        expect(cmp1).toBe(cmp2);
    });

    test("test decorator similarity", () => {
        let rst = getSimilarityDecorator("massage");
        expect(rst).toBe("message");
    });


    test("test decorator type", () => {
        let rst = DecoratorUtil.checkType("true", 'string');
        expect(rst).toBe(true);

        rst = DecoratorUtil.checkType("true", 'boolean');
        expect(rst).toBe(false);

        rst = DecoratorUtil.checkType(false, 'boolean');
        expect(rst).toBe(true);
    });

});