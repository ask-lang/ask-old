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

@storage
class CollectionTypes {
    emObj: EmbedObj;
    emObjArr: PackedStorableArray<EmbedObj>;
    emObjMap: PackedStorableMap<ScaleString, EmbedObj>;
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
        Storage.mode = StoreMode.R;
        return this.types.emObj.a;
    }
}

