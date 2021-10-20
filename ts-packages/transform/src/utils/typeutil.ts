import { CONFIG } from "../config/compile";
import { FieldDef } from "../contract/elementdef";
import { TypeKindEnum } from "../enums/customtype";
import { Strings } from "./primitiveutil";

export class TypeHelper {

    private static codecTypes = ["Int8", "Int16", "Int32", "Int64", "Int128", "UInt8", "UInt16", "UInt32", "UInt64"];

    static nativeType = ["i8", "i16", "i32", "i64", "u8", "u16", "u32", "u64", "boolean"];

    static bigNumType = ["u128", "i128"];

    static bigNumCodecType = ["UInt128", "Int128"];

    static primitiveToCodecMap: Map<string, string> = new Map([
        ["i8", "Int8"],
        ["i16", "Int16"],
        ["i32", "Int32"],
        ["i64", "Int64"],
        ["i128", "Int128"],
        ["u8", "UInt8"],
        ["u16", "UInt16"],
        ["u32", "UInt32"],
        ["u64", "UInt64"],
        ["u128", "UInt128"],
        ["bool", "Bool"],
        ["boolean", "Bool"],
        ["string", "ScaleString"],
        ["String", "ScaleString"],
        ["Array", "ScaleArray"],
        ["Map", "ScaleMap"]
    ]);


    /**
       * Test the declare type whether is array type or not.
       * @param declareType The declare type
       */
    static isArrayType(declareType: string): boolean {
        return declareType == "[]"
            || declareType == "Array"
            || declareType == "StorableArray"
            || declareType == "SpreadStorableArray"
            || declareType == "PackedStorableArray";
    }

    static getStoreMode(declareType: string): string {
        let isPack = declareType == "PackedStorableArray" || declareType == "PackedStorableMap";
        return isPack ? "pack" : "spread";
    }

    /**
       * Whether the declare type is map
       * @param declareType the declare type
       */
    static isMapType(declareType: string): boolean {
        return declareType == "Map"
            || declareType == "StorableMap"
            || declareType == "SpreadStorableMap"
            || declareType == "PackedStorableMap";
    }

    /**
     * If the type is [], rename the array type to 'Array'
     * @param name 
     * @returns 
     */
    static renameIfArray(name: string): string {
        if (name.replace(/ /g, "") == `[]`) {
            return 'Array';
        }
        return name;
    }

    static primitiveToAbiMap: Map<string, string> = new Map([
        ["i8", "i8"],
        ["i16", "i16"],
        ["i32", "i32"],
        ["i64", "i64"],
        ["u8", "u8"],
        ["u16", "u16"],
        ["u32", "u32"],
        ["u64", "u64"],
        ["u128", "u128"],
        ["i128", "i128"],
        ["bool", "bool"],
        ["boolean", "bool"],
        ["string", "str"], 
        ["Array", "arr"],
        ["Map", "map"]
    ]);


    static codecToAbiMap: Map<string, string> = new Map([
        ["Int8", "i8"],
        ["Int16", "i16"],
        ["Int32", "i32"],
        ["Int64", "i64"],
        ["UInt8", "u8"],
        ["UInt16", "u16"],
        ["UInt32", "u32"],
        ["UInt64", "u64"],
        ["UInt128", "u128"],
        ["Int128", "i128"],
        ["Bool", "bool"],
        ["ScaleString", "str"],
        ["Array", "arr"],
        ["Map", "map"]
    ]);


    static getCodecType(asType: string): string {
        let type: string | undefined = TypeHelper.primitiveToCodecMap.get(asType);
        return type == undefined ? asType : type;
    }

    static getAbiType(asType: string): string {
        let type: string | undefined = TypeHelper.primitiveToAbiMap.get(asType);
        if (!type) {
            type = TypeHelper.codecToAbiMap.get(asType);
        }
        return type == undefined ? Strings.EMPTY : type;
    }

    /**
     * Is primitive type
     * @param type 
     * @returns 
     */
    static isPrimitiveType(type: TypeKindEnum): boolean {
        return type == TypeKindEnum.NUMBER
            || type == TypeKindEnum.BIG_NUM
            || type == TypeKindEnum.STRING;
    }

    /**
     * Get the type kind that is not code type.
     * @param typeName 
     * @returns 
     */
    static getTypeKindFromUncodec(typeName: string): TypeKindEnum | null {
        if (typeName == "void") {
            return TypeKindEnum.VOID;
        }
        if (Strings.isString(typeName)) {
            return TypeKindEnum.STRING;
        }
        if (TypeHelper.nativeType.includes(typeName)) {
            return TypeKindEnum.NUMBER;
        }
        if (TypeHelper.bigNumType.includes(typeName)) {
            return TypeKindEnum.BIG_NUM;
        }
        return null;
    }


    /**
     * Get type by name
     * @param typeName 
     * @returns 
     */
    static getTypeKindByName(typeName: string): TypeKindEnum {
        if (typeName == "void") {
            return TypeKindEnum.VOID;
        }
        if (Strings.isString(typeName)) {
            return TypeKindEnum.STRING;
        }
        if (TypeHelper.isArrayType(typeName)) {
            return TypeKindEnum.ARRAY;
        }
        if (TypeHelper.isMapType(typeName)) {
            return TypeKindEnum.MAP;
        }
        if (TypeHelper.nativeType.includes(typeName)) {
            return TypeKindEnum.NUMBER;
        } 

        if (TypeHelper.codecTypes.includes(typeName)) {
            return TypeKindEnum.NUMBER;
        }
        
        if (TypeHelper.bigNumType.includes(typeName)) {
            return TypeKindEnum.BIG_NUM;
        }
    
        if (TypeHelper.bigNumCodecType.includes(typeName)) {
            return TypeKindEnum.BIG_NUM;
        }
        return TypeKindEnum.USER_CLASS;
    }
}


export class FieldDefHelper {

    /**
     * Get the storable array export
     * @param field 
     * @returns 
     */
    static getConcreteStorable(field: FieldDef): string {
        let plainVarious = `${CONFIG.scope}${field.type.plainTypeNode}`;
        return plainVarious;
    }

    /**
     * Get the storable array export
     * @param field 
     * @returns 
     */
    static getStorableExport(field: FieldDef): string {
        let typeArgs = field.type.typeArguments.map(item => item.codecType).join(",");
        let plainVarious = `${field.type.getNamespace()}${field.type.plainType}<${typeArgs}>`;
        return plainVarious;
    }
}
