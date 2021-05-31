import { FnParameters, msg, Storage, ReturnData, StoreMode, Bool, UInt128, u128, ScaleString, PackedStorableMap} from "ask-lang";
/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

class MapTypes {
  _i8i8Map   : PackedStorableMap<ScaleString, UInt128> | null = null;

  get i8i8Map(): PackedStorableMap<ScaleString, UInt128> {
    if (this._i8i8Map === null) {
      this._i8i8Map = new PackedStorableMap<ScaleString, UInt128>("StorableMap.I8I8.0");
    }
    return this._i8i8Map!;
  }
}

@contract
class MapUsages {
  protected map: MapTypes;

  constructor() {
      this.map = new MapTypes();
  }

  @constructor
  default(k: string, v: u128): void {
    let key = new ScaleString(k);
    this.map.i8i8Map.set(key, new UInt128(v));
  }

  @message
  set(key: string, value: u128): void {
    this.map.i8i8Map.set(new ScaleString(key), new UInt128(value));
  }

  @message
  remove(key: string): bool {
    return this.map.i8i8Map.delete(new ScaleString(key));
  }

  @message(mutates = false)
  get(key: string): u128 {
    Storage.mode = StoreMode.R;
    return this.map.i8i8Map.get(new ScaleString(key)).unwrap();
  }
}

export function deploy(): i32 {
  let mspUsages = new MapUsages();

  const defaultSelector: u8[] = [0xed,0x4b,0x9d,0x1b];
  if (msg.isSelector(defaultSelector)) {
    const fnParameters = new FnParameters(msg.data);
    let p0 = fnParameters.get<ScaleString>();
    let p1 = fnParameters.get<UInt128>();
    mspUsages.default(p0.toString(), p1.unwrap());
  }
  return 0;
}

export function call(): i32 {
  const mapUsages = new MapUsages();
  const setSelector: u8[] = [0xe8,0xc4,0x5e,0xb6];
  if (msg.isSelector(setSelector)) {
    const fnParameters = new FnParameters(msg.data);
    let p0 = fnParameters.get<ScaleString>();
    let p1 = fnParameters.get<UInt128>();
    mapUsages.set(p0.toString(), p1.unwrap());
  }
  const getType128Selector: u8[] = [0x6a,0x01,0xaf,0x21];
  if (msg.isSelector(getType128Selector)) {
    const fnParameters = new FnParameters(msg.data);
    let p0 = fnParameters.get<ScaleString>();
    let rs = mapUsages.get(p0.toString());
    ReturnData.set<UInt128>(new UInt128(rs));
  }

  const removeSelector: u8[] = [0x7a,0x01,0xaf,0x21];
  if (msg.isSelector(removeSelector)) {
    const fnParameters = new FnParameters(msg.data);
    let p0 = fnParameters.get<ScaleString>();
    let rs = mapUsages.remove(p0.toString());
    ReturnData.set<Bool>(new Bool(rs));
  }

  return 0;
}