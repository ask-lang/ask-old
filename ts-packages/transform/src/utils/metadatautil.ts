import { TypeSpec } from "../../../contract-metadata/src";
import { NamedTypeNodeDef } from "../contract/typedef";

export class MetadataUtil {

    static createTypeSpec(type: NamedTypeNodeDef | null): TypeSpec | null{
        if (type) {
            return new TypeSpec(type.index, type.plainType);
        } else {
            return null;
        }
    }
}