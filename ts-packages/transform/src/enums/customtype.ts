/**
 * Each type has codec type.
 */
export enum TypeKindEnum {
    VOID, // no types, void
    NUMBER, // basic num, i8, Codec_num
    BIG_NUM, // big num, u128
    STRING, // string, String
    ARRAY, // Array, Class
    MAP, // Map, Class
    USER_CLASS // class
}

export enum TypeSourceEnum {
    USER, 
    LIBRARY
}