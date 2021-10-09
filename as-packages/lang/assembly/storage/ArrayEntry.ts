/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { Codec, Int32, UInt32 } from "..";

/**
 * @class ArrayEntry
 * Class `ArrayEntry` is usded for storing entry info of a storable array, it implements the interface `Codec`.
 * It has two properties, `arrayLength` and `rawBytesCount`.
 * `arrayLength` means how many elements are stored, and `rawBytesCount` means the length of raw bytes of searized elements.
 *
 * @property arrayLength size of elements
 * @property rawBytesCount length of raw bytes of searized elements.
 */
export class ArrayEntry implements Codec {
   arrayLength: i32;
   rawBytesCount: u32;

   constructor(length: i32 = 0, encodedLength: u32 = 0) {
       this.arrayLength = length;
       this.rawBytesCount = encodedLength;
   }

   encodedLength(): i32 {
       let k1 = new Int32(0);
       let k2 = new UInt32(0);
       return k1.encodedLength() + k2.encodedLength();

       // FIXME(liangqin.fan): if write code like belowing, compile failed. It is a pitfall of AssemblyScript.
       // return (new Int32(0)).encodedLength() +
       //        (new UInt32(0)).encodedLength();
   }

   toU8a(): u8[] {
       let k1 = new Int32(this.arrayLength);
       let k2 = new UInt32(this.rawBytesCount);
       let arr = new Array<u8>();
       arr = arr.concat(k1.toU8a());
       arr = arr.concat(k2.toU8a());
       return arr;
   }

   populateFromBytes(bytes: u8[], index: i32 = 0): void {
       let a = new Int32();
       a.populateFromBytes(bytes, index);

       let b = new UInt32();
       b.populateFromBytes(bytes, index + a.encodedLength());

       this.arrayLength = a.unwrap();
       this.rawBytesCount = b.unwrap();
   }

   eq(other: ArrayEntry): bool {
       return this.arrayLength == other.arrayLength && this.rawBytesCount == other.rawBytesCount;
   }

   notEq(other: ArrayEntry): bool {
       return !this.eq(other);
   }
}
