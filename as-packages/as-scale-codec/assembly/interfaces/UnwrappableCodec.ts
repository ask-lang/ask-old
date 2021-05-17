import { Codec } from "./Codec";

/**
 * @description Interface for types that could be unwrapped
 */
export interface UnwrappableCodec<T> extends Codec {
    /**
     * Returns the inner native value of the SCALE type
     */
    unwrap(): T;

    /**
   * @description Encoded to packed mode
   * These methods are defined in interface PackableCodec,
   * but we can not use symentic like `extends PackableCodec, Codec` in assemblyscript,
   * so just add them here temp.
   */
    toU8aPacked(): u8[];

    encodedLengthPacked(): i32;

    populateFromPackedBytes(bytes: u8[], index: i32): void;
}
