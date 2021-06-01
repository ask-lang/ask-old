import { i128, u128 } from "../..";


@storage
class Primitives {
  vi8: i8;
  vu8: u8;
  vi16: i16;
  vu16: u16;
  vi32: i32;
  vu32: u32;
  vi64: i64;
  vu64: u64;
  // vi128: i128;
  vu128: u128;
  vbool: bool;
  vstr:  string;
}

// FIXME (liangqin.fan)
// the i128 can not be compiled because of some little pitfalls,
// there is the detail: https://github.com/MaxGraey/as-bignum/issues/67

@contract
class PrimitivesTest {
  primitives: Primitives;

  constructor() {
    this.primitives = new Primitives();
  }

  @constructor
  default(): void {
    // nop
  }

  @message
  setI8(vi8: i8): void {
    this.primitives.vi8 = vi8;
  }

  @message(mutates=false)
  getI8(): i8 {
    return this.primitives.vi8;
  }

  @message
  setU8(vu8: u8): void {
    this.primitives.vu8 = vu8;
  }

  @message(mutates=false)
  getU8(): u8 {
    return this.primitives.vu8;
  }

  @message
  setI16(vi16: i16): void {
    this.primitives.vi16 = vi16;
  }

  @message(mutates=false)
  getI16(): i16 {
    return this.primitives.vi16;
  }

  @message
  setU16(vu16: u16): void {
    this.primitives.vu16 = vu16;
  }

  @message(mutates=false)
  getU16(): u16 {
    return this.primitives.vu16;
  }

  @message
  setI32(vi32: i32): void {
    this.primitives.vi32 = vi32;
  }

  @message(mutates=false)
  getI32(): i32 {
    return this.primitives.vi32;
  }

  @message
  setU32(vu32: u32): void {
    this.primitives.vu32 = vu32;
  }

  @message(mutates=false)
  getU32(): u32 {
    return this.primitives.vu32;
  }

  @message
  setI64(vi64: i64): void {
    this.primitives.vi64 = vi64;
  }

  @message(mutates=false)
  getI64(): i64 {
    return this.primitives.vi64;
  }

  @message
  setU64(vu64: u64): void {
    this.primitives.vu64 = vu64;
  }

  @message(mutates=false)
  getU64(): u64 {
    return this.primitives.vu64;
  }

  // @message
  // setI128(vi128: i128): void {
  //   this.primitives.vi128 = vi128;
  // }

  // @message(mutates=false)
  // getI128(): i128 {
  //   return this.primitives.vi128;
  // }

  @message
  setU128(vu128: u128): void {
    this.primitives.vu128 = vu128;
  }

  @message(mutates=false)
  getU128(): u128 {
    return this.primitives.vu128;
  }

  @message
  setBool(vbool: bool): void {
    this.primitives.vbool = vbool;
  }

  @message(mutates=false)
  getBool(): bool {
    return this.primitives.vbool;
  }

  @message
  setStr(vstr: string): void {
    this.primitives.vstr = vstr;
  }

  @message(mutates=false)
  getStr(): string {
    return this.primitives.vstr;
  }
}