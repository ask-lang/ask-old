/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */
 import { Int8, ScaleString, StorableArray, UInt128 } from "ask-lang";

 @storage
 class ArrayTypes {
     @packed(size = 100)
     i8Arr   : StorableArray<Int8>;
     @packed
     strArr   : StorableArray<ScaleString>;
     @packed
     u128Arr   : StorableArray<UInt128>;
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
