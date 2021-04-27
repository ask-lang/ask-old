import { TypeSpec } from "../../../contract-metadata/src";
import { NamedTypeNodeDef } from "../contract/elementdef";

export class MetadataUtil {

    static createTypeSpec(type: NamedTypeNodeDef | null): TypeSpec | null{
        if (type) {
            console.log(`createTypeSpec: index ${type.index}`);
            return new TypeSpec(type.index, type.plainType);
        } else {
            return null;
        }
    }
}