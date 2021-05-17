export interface PackableCodec {
  /**
   * @description Encoded to packed mode
   */
  toU8aPacked(): u8[];

  encodedLengthPacked(): i32;

  populateFromPackedBytes(bytes: u8[], index: i32): void;
}