/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { u128 } from "as-bignum";
import { UnwrappableCodec } from "..";


/** Representation for a UInt128 value in the system. */
// Most of the implementation copied from as-scale-codec,
// we need a fixed length of u128 while enocding and decoding
// so we can get/set to native

export class UInt128 implements UnwrappableCodec<u128> {

    private _value: u128;
    protected bitLength: i32;

    constructor (value: u128 = u128.Zero) {
      this._value = value;
      this.bitLength = 16;
    }

    /**
     * @description Return inner value
     */
    unwrap(): u128{
      return this._value;
    }

    /** Encodes the value as u8[] as per the SCALE codec specification */
    toU8a (): u8[] {
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
    populateFromBytes(bytes: u8[]): void{
      assert(bytes.length == 16, 'Invalid input: Byte array should be 16');
      this._value = u128.from(bytes);
    }
    /**
     * @description The length of Int when the value is encoded
     */
    public encodedLength (): i32 {
      return this.bitLength;
    }

    static fromU8a(input: u8[]): UInt128 {
      assert(input.length == 16, 'Invalid input: Byte array should be length of 16');
      let v = new UInt128();
      v.populateFromBytes(input);
      return v;
    }

    eq(other: UInt128): bool {
      return this._value == other.unwrap();
    }

    notEq(other: UInt128): bool {
      return this._value != other.unwrap();
    }

    // Commonly used values of UInt128
    @inline static get Zero(): UInt128 { return new UInt128(u128.Zero); }
    @inline static get One(): UInt128 { return new UInt128(u128.One); }
    @inline static get Min(): UInt128 { return new UInt128(new u128()); }
    @inline static get Max(): UInt128 { return new UInt128(new u128(-1, -1)); }

    static eq(a: UInt128, b: UInt128): bool {
      return a.eq(b);
    }

    static notEq(a: UInt128, b: UInt128): bool {
      return a.notEq(b);
    }
}
