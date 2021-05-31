/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */
 import { Int8, PackedStorableMap, ScaleString,  UInt128 } from "ask-lang";

 @storage
 class MapTypes {
     @packed
     i8i8Map   : PackedStorableMap<Int8, Int8>;
     @packed
     strstrMap : PackedStorableMap<ScaleString, ScaleString>;
     @packed
     stru128Map: PackedStorableMap<ScaleString, UInt128>;
     @packed
     u128strMap: PackedStorableMap<UInt128, ScaleString>;
 }

 @contract
 class MapUsages {
     protected map: MapTypes;

     constructor() {
         this.map = new MapTypes();
     }

     @message
     set(key: i8, value: i8): void {
       this.map.i8i8Map.set(new Int8(key), new Int8(value));
     }

     @message(mutates = false)
     get(key: i8): i8 { return this.map.i8i8Map.get(new Int8(key)).unwrap(); }

     @message
     remove(key: i8): bool {
       return this.map.i8i8Map.delete(new Int8(key));
     }
 }
