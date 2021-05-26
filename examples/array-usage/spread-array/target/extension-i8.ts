/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */
import { FnParameters, msg, Storage, ReturnData, StoreMode, Int8, StorableArray, Int32, SpreadStorableArray, Bool} from "ask-lang";

class ArrayTypes {
  _i8Arr   : SpreadStorableArray<Int8> | null = null;

  get i8Arr(): SpreadStorableArray<Int8> {
    if (this._i8Arr == null) {
      this._i8Arr = new SpreadStorableArray<Int8>("StorableArray.I8.0", 0);
    }
    return this._i8Arr!;
  }
}

@contract
class ArrayUsages {
  protected arr: ArrayTypes;

  constructor() {
      this.arr = new ArrayTypes();
  }

  @constructor
  default(capacity: i32): void {

  }

  @message
  push(value: i8): void {
    this.arr.i8Arr.push(new Int8(value));
  }

  @message
  remove(index: i32): bool {
    return this.arr.i8Arr.delete(index);
  }

  @message(mutates = false)
  get(index: i32): i8 {
    Storage.mode = StoreMode.R;
    return this.arr.i8Arr[index].unwrap();
  }
}

export function deploy(): i32 {
  let mspUsages = new ArrayUsages();

  const defaultSelector: u8[] = [0xed,0x4b,0x9d,0x1b];
  if (msg.isSelector(defaultSelector)) {
    const fnParameters = new FnParameters(msg.data);
    let p0 = fnParameters.get<Int32>();
    mspUsages.default(p0.unwrap());
  }
  return 0;
}

export function call(): i32 {
  const arrUsages = new ArrayUsages();

  // push
  const setSelector: u8[] = [0xe8,0xc4,0x5e,0xb6];
  if (msg.isSelector(setSelector)) {
    const fnParameters = new FnParameters(msg.data);
    let p0 = fnParameters.get<Int8>();
    arrUsages.push(p0.unwrap());
  }

  // get
  const getType128Selector: u8[] = [0x6a,0x01,0xaf,0x21];
  if (msg.isSelector(getType128Selector)) {
    const fnParameters = new FnParameters(msg.data);
    let p0 = fnParameters.get<Int32>();
    let rs = arrUsages.get(p0.unwrap());
    ReturnData.set<Int8>(new Int8(rs));
  }
  // remove
  const removeSelector: u8[] = [0x7a,0x01,0xaf,0x21];
  if (msg.isSelector(removeSelector)) {
    const fnParameters = new FnParameters(msg.data);
    let p0 = fnParameters.get<Int32>();
    let rs = arrUsages.remove(p0.unwrap());
    ReturnData.set<Bool>(new Bool(rs));
  }

  return 0;
}