import { ConstructorSpec, TypeSpec } from "pl-contract-metadata/src";
import { NamedTypeNodeDef } from "../contract/typedef";
import { KeySelector } from "../preprocess/selector";

export class MetadataUtil {

    static createTypeSpec(type: NamedTypeNodeDef | null): TypeSpec | null{
        if (type) {
            return new TypeSpec(type.index, type.plainType);
        } else {
            return null;
        }
    }

    static createDefaultCntr(): ConstructorSpec {
        let selector = new KeySelector("new");
        return new ConstructorSpec([selector.key], selector.short, [], [""]);
    }
}