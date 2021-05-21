/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */
import { Codec, Hash } from "as-scale-codec";

export class DoubleLinkKVStore<K extends Codec, V extends Codec> implements Codec {
   key: K;
   value: V;
   nextkey: Hash;
   prevkey: Hash;

   constructor(nkey: K = instantiate<K>(), value: V = instantiate<V>(), nextKey: Hash = new Hash(), prevkey: Hash = new Hash()) {
       this.key = nkey;
       this.value = value;
       this.nextkey = nextKey;
       this.prevkey = prevkey;
   }

   toU8a(): u8[] {
       let arr = new Array<u8>();
       arr = arr.concat(this.key.toU8a());
       arr = arr.concat(this.value.toU8a());
       arr = arr.concat(this.nextkey.toU8a());
       arr = arr.concat(this.prevkey.toU8a());
       return arr;
   }

   encodedLength(): i32 {
       if (this.key.encodedLength() == 0 || this.value.encodedLength() == 0)
           return 0;

       return this.key.encodedLength() +
            this.value.encodedLength() +
            this.nextkey.encodedLength() +
            this.prevkey.encodedLength();
   }

   populateFromBytes(bytes: u8[], index: i32 = 0): void {
       this.key.populateFromBytes(bytes, index);

       let startIndex = index + this.key.encodedLength();
       this.value.populateFromBytes(bytes, startIndex);

       startIndex += this.value.encodedLength();
       this.nextkey.populateFromBytes(bytes, startIndex);

       startIndex += this.nextkey.encodedLength();
       this.prevkey.populateFromBytes(bytes, startIndex);
   }

   eq(other: DoubleLinkKVStore<K, V>): bool {
       return this.key == other.key && this.value == other.value;
   }

   notEq(other: DoubleLinkKVStore<K, V>): bool {
       return !this.eq(other);
   }
}
