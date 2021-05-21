/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */
import { Codec, Hash, Int32 } from "as-scale-codec";

export class MapEntry implements Codec {
   entries: Hash;
   size: Int32;

   constructor(entries: Hash = new Hash(), size: i32 = 0) {
       this.entries = entries;
       this.size = new Int32(size);
   }

   toU8a(): u8[] {
       let arr = new Array<u8>();
       arr = arr.concat(this.entries.toU8a());
       arr = arr.concat(this.size.toU8a());
       return arr;
   }

   encodedLength(): i32 {
       return this.entries.encodedLength() + this.size.encodedLength();
   }

   populateFromBytes(bytes: u8[], index: i32 = 0): void {
       this.entries.populateFromBytes(bytes, index);

       let startIndex = index + this.entries.encodedLength();
       this.size.populateFromBytes(bytes, startIndex);
   }

   eq(other: MapEntry): bool {
       return this.entries.eq(other.entries) && this.size.unwrap() == other.size.unwrap();
   }

   notEq(other: MapEntry): bool {
       return !this.eq(other);
   }
}
