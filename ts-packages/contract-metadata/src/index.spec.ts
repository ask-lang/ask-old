import { ConstructorSpec } from ".";

describe("ToMetadata", () => {
    it("ConstructorSpec", () => {
        const json = {
            name: ["foo"],
            selector: "0x075bcd15",
            args: [],
            docs: [],
        };

        const spec = new ConstructorSpec(["foo"], "0x075bcd15");
        expect(spec.toMetadata()).toStrictEqual(json);
    });
});
