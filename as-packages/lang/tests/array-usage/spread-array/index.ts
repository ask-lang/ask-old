/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */
import { Codec, Int8, ScaleString, SpreadStorableArray, u128, UInt128 } from "ask-lang";

class EmbedObj implements Codec {

  a: i8;
  b: string;
  c: u128;

  constructor(a: i8 = 0, b: string = "", c: u128 = u128.Zero) {
    this.a = a;
    this.b = b;
    this.c = c;
  }

  toU8a(): u8[] {
    let bytes = new Array<u8>();
    let aWrap = new Int8(this.a);
    let bWrap = new ScaleString(this.b);
    let cWrap = new UInt128(this.c);

    bytes = bytes.concat(aWrap.toU8a())
                .concat(bWrap.toU8a())
                .concat(cWrap.toU8a());
    return bytes;
  }

  encodedLength(): i32 {
    let aWrap = new Int8(this.a);
    let bWrap = new ScaleString(this.b);
    let cWrap = new UInt128(this.c);

    return aWrap.encodedLength() + bWrap.encodedLength() + cWrap.encodedLength();
  }

  populateFromBytes(bytes: u8[], index: i32 = 0): void {
    let aWrap = new Int8();
    aWrap.populateFromBytes(bytes, index);
    index += aWrap.encodedLength();

    let bWrap = new ScaleString();
    bWrap.populateFromBytes(bytes, index);
    index += bWrap.encodedLength();

    let cWrap = new UInt128();
    cWrap.populateFromBytes(bytes, index);

    this.a = aWrap.unwrap();
    this.b = bWrap.toString();
    this.c = cWrap.unwrap();
  }

  eq(other: EmbedObj): bool {
    return this.a == other.a && this.b == other.b && this.c == other.c;
  }

  notEq(other: EmbedObj): bool {
    return !this.eq(other);
  }
}

@storage
class ArrayTypes {
  @spread(capacity = 100)
  i8Arr: SpreadStorableArray<Int8>;
  strArr: SpreadStorableArray<ScaleString>;
  u128Arr: SpreadStorableArray<UInt128>;

  objArr: SpreadStorableArray<EmbedObj>;
}

@contract
class MapUsages {
  protected arr: ArrayTypes;

  constructor() {
    this.arr = new ArrayTypes();
  }

  @message
  set(index: i32, value: i8): void {
    this.arr.i8Arr[index] = new Int8(value);
  }

  @message(mutates = false)
  get(index: i32): i8 {
    return this.arr.i8Arr[index].unwrap();
  }

  @message
  remove(index: i32): bool {
    return this.arr.i8Arr.delete(index);
  }

  @message
  push(value: i8): i32 {
    return this.arr.i8Arr.push(new Int8(value));
  }
}
