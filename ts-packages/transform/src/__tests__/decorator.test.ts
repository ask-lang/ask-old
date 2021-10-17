import { getSimilarDecorator } from "../contract/decorator";
import { Strings } from "../utils/primitiveutil";

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
        let rst = getSimilarDecorator("massage");
        expect(rst).toBe("message");
    });
});