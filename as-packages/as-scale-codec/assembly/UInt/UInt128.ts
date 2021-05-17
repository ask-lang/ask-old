/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { u128 } from "as-bignum";
import { UnwrappableCodec, Bytes, BIT_LENGTH } from "..";

/** Representation for a UInt128 value in the system. */
// Most of the implementation copied from as-scale-codec,
// we need a fixed length of u128 while enocding and decoding
// so we can get/set to native

export class UInt128 implements UnwrappableCodec<u128> {
  private _value: u128;
  protected bitLength: i32;

  constructor(value: u128 = u128.Zero) {
    this._value = value;
    this.bitLength = 0;
  }

  /**
   * @description Return inner value
   */
  unwrap(): u128 {
    return this._value;
  }

  /** Encodes the value as u8[] as per the SCALE codec specification */
  toU8a(): u8[] {
    return this._value.toBytes();
  }

  toString(): string {
    return this._value.toString();
  }
  /**
   * @description Non-static constructor method used to populate defined properties of the model
   * @param bytes SCALE encoded bytes
   * @param index index to start decoding the bytes from
   */
  populateFromBytes(bytes: u8[], index: i32 = 0): void {
    assert(bytes.length - index >= BIT_LENGTH.INT_128, 'Invalid input: Byte array should be more than 16 bytes');
    if (bytes.length == BIT_LENGTH.INT_128) {
      this._value = u128.from(bytes);
    } else {
      let bytesSeg = bytes.slice(index, index + BIT_LENGTH.INT_128);
      this._value = u128.from(bytesSeg);
    }
    this.bitLength = BIT_LENGTH.INT_128;
  }

  /**
   * @description The length of Int when the value is encoded
   */
  public encodedLength(): i32 {
    if (this.bitLength != 0) return this.bitLength;
    return BIT_LENGTH.INT_128;
  }

  /**
   * Internal static private function to compute value of the UInt128
   * @param bytes
   * @param index
   */
  static _computeValue(bytes: u8[], index: i32 = 0): u128 {
    const mode = bytes[index] & 0x03;
    if (i32(mode) <= 2) {
      return new u128(changetype<u64>(Bytes.decodeSmallInt(bytes, mode, index).value), 0);
    }
    const topSixBits = bytes[index] >> 2;
    const byteLength = topSixBits + 4;

    const value = bytes.slice(index + 1, byteLength + index + 1);
    Bytes.appendZeroBytes(value, BIT_LENGTH.INT_128);
    return u128.fromBytesLE(value)
  }

  /**
   * Internal private function to compute bit length of the value
   * @param value
   */
  static _computeBitLength(value: u128): i32 {
    if (value < u128.fromU32(1 << 6)) return BIT_LENGTH.INT_8;
    else if (value < u128.fromU32(1 << 14)) return BIT_LENGTH.INT_16;
    else if (value < u128.fromU32(1 << 30)) return BIT_LENGTH.INT_32;
    else {
      const valueInBytes = value.toBytes();
      Bytes.trimEmptyBytes(valueInBytes);
      return 1 + valueInBytes.length;
    }
  }

  static fromU8a(input: u8[]): UInt128 {
    assert(input.length == 16, 'Invalid input: Byte array should be length of 16');
    let v = new UInt128();
    v.populateFromBytes(input, 0);
    return v;
  }

  eq(other: UInt128): bool {
    return this._value == other.unwrap();
  }

  notEq(other: UInt128): bool {
    return this._value != other.unwrap();
  }

  // Commonly used values of UInt128
  @inline static get Zero(): UInt128 {
    return new UInt128(u128.Zero);
  }

  @inline static get One(): UInt128 {
    return new UInt128(u128.One);
  }

  @inline static get Min(): UInt128 {
    return new UInt128(new u128());
  }

  @inline static get Max(): UInt128 {
    return new UInt128(new u128(-1, -1));
  }

  static eq(a: UInt128, b: UInt128): bool {
    return a.eq(b);
  }

  static notEq(a: UInt128, b: UInt128): bool {
    return a.notEq(b);
  }


  toU8aPacked(): u8[] {
    const bytes = new Array<u8>();
    if (this._value < u128.fromU32(1 << 6)) { // if value < 1 << 6
      Bytes.appendUint<u8>(bytes, u8(this._value.as<u8>()) << 2, BIT_LENGTH.INT_8); // 1 byte
    } else if (this._value < u128.fromU32(1 << 14)) { // if value < 1 << 14
      Bytes.appendUint<u16>(bytes, u16(this._value.as<u16>() << 2) + 1, BIT_LENGTH.INT_16); // 2 bytes
    } else if (this._value < u128.fromU64(1 << 30)) { // if value < 1 << 30
      Bytes.appendUint<u32>(bytes, u32(this._value.as<u32>() << 2) + 2, BIT_LENGTH.INT_32); // 4 bytes
    } else {
      const valueInBytes = this._value.toBytes();
      Bytes.trimEmptyBytes(valueInBytes);

      const topSixBits: u8 = u8(valueInBytes.length - 4);
      const lengthByte: u8 = (topSixBits << 2) + 3;

      // Encode Mode and Bytes length
      bytes.push(lengthByte);
      // copy the u128 bytes
      Bytes.copy(valueInBytes, bytes, 1);
    }
    return bytes;
  }

  encodedLengthPacked(): i32 {
    return UInt128._computeBitLength(this._value);
  }

  populateFromPackedBytes(bytes: u8[], index: i32 = 0): void {
    assert(bytes.length - index > 0, 'Invalid input: Byte array should not be empty');
    const value = UInt128._computeValue(bytes, index);
    this._value = value;
    this.bitLength = UInt128._computeBitLength(this._value);
  }
}
