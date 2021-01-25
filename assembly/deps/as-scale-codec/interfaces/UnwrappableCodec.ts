import { Codec } from "..";

/**
 * @description Interface for types that could be unwrapped
 */
export interface UnwrappableCodec<T> extends Codec {
    /**
     * Returns the inner native value of the SCALE type
     */
    unwrap(): T;
}