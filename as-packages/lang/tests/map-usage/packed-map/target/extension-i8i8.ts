import { FnParameters, msg, Storage, ReturnData, StoreMode, Int8, Bool, PackedStorableMap} from "ask-lang";
/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */
class MapTypes {
  _i8i8Map   : PackedStorableMap<Int8, Int8> | null = null;

  get i8i8Map(): PackedStorableMap<Int8, Int8> {
    if (this._i8i8Map === null) {
      this._i8i8Map = new PackedStorableMap<Int8, Int8>("StorableMap.I8I8.0");
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
  default(k: i8, v: i8): void {
    let key = new Int8(k);
    this.map.i8i8Map.set(key, new Int8(v));
  }

  @message
  set(key: i8, value: i8): void {
    this.map.i8i8Map.set(new Int8(key), new Int8(value));
  }

  @message
  remove(key: i8): bool {
    return this.map.i8i8Map.delete(new Int8(key));
  }

  @message(mutates = false)
  get(key: i8): i8 {
    Storage.mode = StoreMode.R;
    return this.map.i8i8Map.get(new Int8(key)).unwrap();
  }
}

export function deploy(): i32 {
  let mspUsages = new MapUsages();

  const defaultSelector: u8[] = [0xed,0x4b,0x9d,0x1b];
  if (msg.isSelector(defaultSelector)) {
    const fnParameters = new FnParameters(msg.data);
    let p0 = fnParameters.get<Int8>();
    let p1 = fnParameters.get<Int8>();
    mspUsages.default(p0.unwrap(), p1.unwrap());
  }
  return 0;
}

export function call(): i32 {
  const mapUsages = new MapUsages();
  const setSelector: u8[] = [0xe8,0xc4,0x5e,0xb6];
  if (msg.isSelector(setSelector)) {
    const fnParameters = new FnParameters(msg.data);
    let p0 = fnParameters.get<Int8>();
    let p1 = fnParameters.get<Int8>();
    mapUsages.set(p0.unwrap(), p1.unwrap());
  }
  const getType128Selector: u8[] = [0x6a,0x01,0xaf,0x21];
  if (msg.isSelector(getType128Selector)) {
    const fnParameters = new FnParameters(msg.data);
    let p0 = fnParameters.get<Int8>();
    let rs = mapUsages.get(p0.unwrap());
    ReturnData.set<Int8>(new Int8(rs));
  }

  const removeSelector: u8[] = [0x7a,0x01,0xaf,0x21];
  if (msg.isSelector(removeSelector)) {
    const fnParameters = new FnParameters(msg.data);
    let p0 = fnParameters.get<Int8>();
    let rs = mapUsages.remove(p0.unwrap());
    ReturnData.set<Bool>(new Bool(rs));
  }

  return 0;
}