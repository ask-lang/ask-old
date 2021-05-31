import * as _lang from "ask-lang";
 /**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */
import { Storage, StoreMode, Int8, Codec, ScaleString, u128, UInt128, PackedStorableArray, PackedStorableMap } from "ask-lang";

class Car implements Codec {

    name: string;
    age: i8;

    constructor(name : string= "", age: i8 = 0) {
        this.name = name;
        this.age = age;
    }

    toU8a(): u8[] {
        let bytes = new Array<u8>();
        let name = new ScaleString(this.name);
        let age = new Int8(this.age);
        bytes = bytes.concat(name.toU8a()).concat(age.toU8a());
        return bytes;
    }

    encodedLength(): i32 {
   
        let bWrap = new ScaleString(this.name);
        let cWrap = new Int8(this.age);

        return bWrap.encodedLength() + cWrap.encodedLength();
    }

    populateFromBytes(bytes: u8[], index: i32 = 0): void {

        let name = new ScaleString();
        name.populateFromBytes(bytes, index);
        this.name = name.toString();
        index += name.encodedLength();

        

        let age = new Int8();
        age.populateFromBytes(bytes, index);

        this.age = age.unwrap();
    }

    eq(other: Car): bool {
        return this.age == other.age && this.name == other.name;
    }
    
    notEq(other: Car): bool {
        return !this.eq(other);
    }

}


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
  private _emObj: EmbedObj | null = null;
  private _emObjArr: PackedStorableArray<EmbedObj> | null = null;
  private _emObjMap: PackedStorableMap<ScaleString, EmbedObj> | null = null;

  get emObj(): EmbedObj {
    if (this._emObj === null) {
         const st = new _lang.Storage(new _lang.Hash([0xd8,0x97,0xfc,0x54,0xa3,0xc5,0x0f,0x6c,0x34,0xd5,0x38,0xb0,0x9b,0xca,0x50,0x2c,0xa9,0x37,0x71,0xac,0x3f,0x68,0xa6,0xe9,0x09,0x8f,0x32,0xf9]));
         let val = st.load<EmbedObj>();
         if (!val) this._emObj = new EmbedObj(); 
         else this._emObj = val;
     }
     return this._emObj!;
  }
  set emObj(v: EmbedObj) {
     this._emObj = new EmbedObj(v);
     const st = new _lang.Storage(new _lang.Hash([0x42,0x03,0xcf,0x55]));
     st.store<EmbedObj>(this._emObj!);
 }
  get emObjArr(): PackedStorableArray<EmbedObj> {
     if (this._emObjArr === null) {
       this._emObjArr = new _lang.PackedStorableArray<EmbedObj>("examples/composite/embedobj/CollectionTypes#emObjArremObjArr", 0);
     }
     return this._emObjArr!;
  }
  
  get emObjMap(): PackedStorableMap<ScaleString, EmbedObj> {
     if (this._emObjMap === null) {
       this._emObjMap = new _lang.PackedStorableMap<ScaleString, EmbedObj>("examples/composite/embedobj/CollectionTypes#emObjMapemObjMap");
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
    @message(mutates = false)
    get(index: i32): i8 {
  _lang.Storage.mode = _lang.StoreMode.R;
        Storage.mode = StoreMode.R;
        return this.types.emObj.a;
    }
}

 
export function deploy(): i32 {
  let _arrayusages = new ArrayUsages();

  const defaultSelector: u8[] = [0xed,0x4b,0x9d,0x1b];
  if (_lang.msg.isSelector(defaultSelector)) {
    const fnParameters = new _lang.FnParameters(_lang.msg.data);
    let p0 = fnParameters.get<_lang.Int32>();
    _arrayusages.default(p0.unwrap());
  }
  return 0;
}

export function call(): i32 {
  const _arrayusages = new ArrayUsages();
  const getSelector: u8[] = [0x2f,0x86,0x5b,0xd9];
  if (_lang.msg.isSelector(getSelector)) {
    const fnParameters = new _lang.FnParameters(_lang.msg.data);
    let p0 = fnParameters.get<_lang.Int32>();
    let rs = _arrayusages.get(p0.unwrap());

    _lang.ReturnData.set<_lang.Int8>(new _lang.Int8(rs));
  }
  return 0;
}