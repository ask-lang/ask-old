/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */
import { Account, Bool, Int8, PackedStorableArray, SpreadStorableMap } from "ask-lang";

class ArrayTypes {

    //  @packed
    //  strArr: PackedStorableArray<ScaleString>;
    //  @packed
    //  u128Arr: PackedStorableArray<UInt128>;
    //  _operatorApprovals: StorableMap<Account, StorableMap<Account, Bool>>;

}

 @contract
export class MapUsages {
     @packed({"capacity":100})
     @state
     i8Arr: PackedStorableArray<Int8>;

     constructor() {
     }

     @message
     set(index: i32, value: i8): void {
         this.i8Arr[index] = new Int8(value);
     }

     @message({"mutates":false})
     get(index: i32): i8 {
         return this.i8Arr[index].unwrap();
     }

     @message
     remove(index: i32): bool {
         return this.i8Arr.delete(index);
     }

     @message
     push(value: i8): i32 {
         return this.i8Arr.push(new Int8(value));
     }

     @message
     pushAccountId(account: Account): void {
         let map = new SpreadStorableMap<Account, Bool>();
         //  this.arr._operatorApprovals.set(account, map);
     }
}
