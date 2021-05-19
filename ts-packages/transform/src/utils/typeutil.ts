import { CONFIG } from "../config/compile";
import { FieldDef } from "../contract/elementdef";
import { TypeKindEnum } from "../enums/customtype";
import { Strings } from "./primitiveutil";

export class TypeHelper {

    static codecTypes = ["Int8", "Int16", "Int32", "Int64", "Int128", "UInt8", "UInt16", "UInt32", "UInt64", "UInt128"];

    static nativeType = ["i8", "i16", "i32", "i64", "u8", "u16", "u32", "u64", "boolean"];

    static bigNumType = ["u128", "i128"];

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
        ["Array", "ScaleArray"],
        ["Map", "ScaleMap"]
    ]);

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

    static getCodecType(asType: string): string {
        let type: string | undefined = TypeHelper.primitiveToCodecMap.get(asType);
        return type == undefined ? asType : type;
    }

    static getAbiType(asType: string): string {
        let type: string | undefined = TypeHelper.primitiveToAbiMap.get(asType);
        return type == undefined ? Strings.EMPTY : type;
    }

    static isPrimitiveType(type: TypeKindEnum): boolean {
        return type == TypeKindEnum.NUMBER 
            || type == TypeKindEnum.BIG_NUM
            || type == TypeKindEnum.STRING;
    }
}


export class FieldDefHelper {

    /**
     * Get the storable array export
     * @param field 
     * @returns 
     */
    static getConcreteStorable(field: FieldDef): string {
        let typeArgs = field.type.typeArguments.map(item => item.codecType).join(",");
        let plainType = field.type.plainType;
        let arrayType = (field.decorators.isPacked ? "Packed" : "Spread") + plainType;
        let plainVarious = `${CONFIG.namespace}${arrayType}<${typeArgs}>`;
        return plainVarious;
    }

    /**
     * Get the storable array export
     * @param field 
     * @returns 
     */
    static getStorableExport(field: FieldDef): string {
        let typeArgs = field.type.typeArguments.map(item => item.codecType).join(",");
        let plainVarious = `${field.type.getNameSpace()}${field.type.plainType}<${typeArgs}>`;
        return plainVarious;
    }
}
