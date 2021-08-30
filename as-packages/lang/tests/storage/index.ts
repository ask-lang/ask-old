import {Codec, SpreadStorableArray, UInt8} from "../..";
import { ScaleString, SpreadStorableMap } from "../../assembly";

@contract
class StorageTest {
  @state
  vi8: i8;

  @state({lazy: false})
  vbool: bool;

  @state({lazy: false})
  varr: SpreadStorableArray<UInt8>

  @state({lazy: true})
  vmap: SpreadStorableMap<ScaleString, UInt8>;

  constructor() {}
}