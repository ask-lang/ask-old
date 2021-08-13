/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */
import { Account, Bool, Int8, PackedStorableArray, ScaleString, SpreadStorableMap, StorableArray, StorableMap, UInt128 } from "ask-lang";

 @storage
class ArrayTypes {
     @packed(capacity=100)
     i8Arr   : PackedStorableArray<Int8>;
     //  @packed
     //  strArr: PackedStorableArray<ScaleString>;
     //  @packed
     //  u128Arr: PackedStorableArray<UInt128>;
     //  _operatorApprovals: StorableMap<Account, StorableMap<Account, Bool>>;

 }

 @contract
export class MapUsages {
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

     @message
     pushAccountId(account: Account): void {
         let map = new SpreadStorableMap<Account, Bool>();
         //  this.arr._operatorApprovals.set(account, map);
     }
}
