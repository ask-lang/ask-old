/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */
 import { FnParameters, Msg, Storage, ReturnData, StoreMode, Int8, StorableArray, Int32, SpreadStorableArray, Bool, Codec, StorableMap, ScaleString, Crypto, SpreadStorableMap} from "ask-lang";

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

class CollectionTypes {
  _emObj: EmbedObj | null;
  _emObjArr: StorableArray<EmbedObj> | null;
  _emObjMap: StorableMap<ScaleString, EmbedObj> | null;

  get emObj(): EmbedObj {
    if (this._emObj == null) {
      let strg = new Storage(Crypto.blake256s("embedObj.0"));
      this._emObj = strg.load<EmbedObj>();
    }
    return this._emObj!;
  }

  set emObj(obj: EmbedObj) {
    this._emObj = obj;
    let strg = new Storage(Crypto.blake256s("embedObj.0"));
    strg.store(this._emObj!);
  }

  get emObjArr(): StorableArray<EmbedObj> {
    if (this._emObjArr == null) {
      this._emObjArr = new SpreadStorableArray<EmbedObj>("StorableArray.EmbedObj.0");
    }

    return this._emObjArr!;
  }


  get emObjMap(): StorableMap<ScaleString, EmbedObj> {
    if (this._emObjMap == null) {
      this._emObjMap = new SpreadStorableMap<ScaleString, EmbedObj>("StorableMap.EmbedObj.0");
    }

    return this._emObjMap!;
  }
}


 @contract
 class ArrayUsages {
   protected types: CollectionTypes;

   constructor() {
       this.types = new CollectionTypes();
   }

   @constructor
   default(capacity: i32): void {

   }

   @message
   push(value: i8): void {
   }

   @message
   remove(index: i32): bool {
   }

   @message(mutates = false)
   get(index: i32): i8 {
     Storage.mode = StoreMode.R;
   }
 }

 var msg: Msg = new Msg();

 export function deploy(): i32 {
   let mspUsages = new ArrayUsages();

   const defaultSelector: u8[] = [0xed,0x4b,0x9d,0x1b];
   if (msg.isSelector(defaultSelector)) {
     const fnParameters = new FnParameters(msg.data);
     let p0 = fnParameters.get<Int32>();
     mspUsages.default(p0.unwrap());
   }
   return 0;
 }

 export function call(): i32 {
   const arrUsages = new ArrayUsages();

   // push
   const setSelector: u8[] = [0xe8,0xc4,0x5e,0xb6];
   if (msg.isSelector(setSelector)) {
     const fnParameters = new FnParameters(msg.data);
     let p0 = fnParameters.get<Int8>();
     arrUsages.push(p0.unwrap());
   }

   // get
   const getType128Selector: u8[] = [0x6a,0x01,0xaf,0x21];
   if (msg.isSelector(getType128Selector)) {
     const fnParameters = new FnParameters(msg.data);
     let p0 = fnParameters.get<Int32>();
     let rs = arrUsages.get(p0.unwrap());
     ReturnData.set<Int8>(new Int8(rs));
   }
   // remove
   const removeSelector: u8[] = [0x7a,0x01,0xaf,0x21];
   if (msg.isSelector(removeSelector)) {
     const fnParameters = new FnParameters(msg.data);
     let p0 = fnParameters.get<Int32>();
     let rs = arrUsages.remove(p0.unwrap());
     ReturnData.set<Bool>(new Bool(rs));
   }

   return 0;
 }