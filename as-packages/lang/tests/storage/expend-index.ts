import {SpreadStorableArray, UInt8} from "../..";
import { Bool, Hash, Int8, ScaleString, SpreadStorableMap, Storage } from "../../assembly";

@contract
class StorageTest {
  private _vi8: Int8 | null = null;

  private _vbool: Bool | null = null; // not lazy

  private _varr: SpreadStorableArray<UInt8> | null = null; // not lazy

  private _vmap: SpreadStorableMap<ScaleString, UInt8> | null = null;

  get vi8(): i8 {
      if (this._vi8 === null) {
          const st = new Storage(new Hash("0000000000000000000000000000")); // 按规律生成真实的Hash值
          let val = st.load<Int8>();
          if (!val) this._vi8 = new Int8();
          else this._vi8 = val;
      }
      return this._vi8!.unwrap();
  }

  set vi8(newvalue: i8) {
      this._vi8 = new Int8(newvalue);
  }

  get vbool(): bool {
      if (this._vbool === null) {
          const st = new Storage(new Hash("0000000000000000000000000001"));
          let val = st.load<Bool>();
          if (!val) this._vbool = new Bool();
          else this._vbool = val;
      }
      return this._vbool!.unwrap();
  }

  set vbool(newvalue: bool) {
      this._vbool = new Bool(newvalue);
      const st = new Storage(new Hash("0000000000000000000000000001"));
      st.store<Bool>(this._vbool!);
  }

  get varr(): SpreadStorableArray<UInt8> {
      if (this._varr === null) {
          this._varr = new SpreadStorableArray<UInt8>("0000000000000000000000000002", true);
      }
      return this._varr!;
  }

  get vmap(): SpreadStorableMap<ScaleString, UInt8> {
      if (this._vmap === null) {
          this._vmap = new SpreadStorableMap<ScaleString, UInt8>("0000000000000000000000000003", false);
      }
      return this._vmap!;
  }

  // 合约执行完之后, 调用这个方法,
  // 将所有lazy的数据保存到native
  __commit_storage__(): void {
      if (this._vi8 !== null) {
          const st = new Storage(new Hash("0000000000000000000000000000"));
          st.store<UInt8>(this._vi8!);
      }

      if (this._varr !== null) {
          this._varr.__commit_storage__();
      }
  }

  constructor() {}
}