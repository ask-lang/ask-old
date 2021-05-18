import { FnParameters, Msg, Storage, ReturnData, StoreMode, ScaleString, UInt32, Bool, UInt128} from "ask-lang";
/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */
import { u128 } from "ask-lang";

class Planets {
  private _name: ScaleString | null = null;
  private _radius: UInt32 | null = null;
  private _isdwarf: Bool | null = null;
  private _typeU128: UInt128 | null = null;

  get name(): string {
    if (this._name === null) {
      const st = new Storage<ScaleString>("Planetsname");
      this._name = st.load();
    }
    return this._name!.toString();
  }
  set name(v: string) {
    this._name = new ScaleString(v);
    const st = new Storage<ScaleString>("Planetsname");
    st.store(this._name!);
  }

  get radius(): u32 {
    if (this._radius === null) {
      const st = new Storage<UInt32>("Planetsradius");
      this._radius = st.load();
    }
      return this._radius!.unwrap();
  }
  set radius(v: u32) {
    this._radius = new UInt32(v);
    const st = new Storage<UInt32>("Planetsradius");
    st.store(this._radius!);
  }

  get isdwarf(): boolean {
    if (this._isdwarf === null) {
      const st = new Storage<Bool>("Planetsisdwarf");
      this._isdwarf = st.load();
    }
      return this._isdwarf!.unwrap();
  }
  set isdwarf(v: boolean) {
    this._isdwarf = new Bool(v);
    const st = new Storage<Bool>("Planetsisdwarf");
    st.store(this._isdwarf!);
  }

  get typeU128(): u128 {
    if (this._typeU128 === null) {
      const st = new Storage<UInt128>("PlanetstypeU128");
      this._typeU128 = st.load();
    }
      return this._typeU128!.unwrap();
  }
  set typeU128(v: u128) {
    this._typeU128 = new UInt128(v);
    const st = new Storage<UInt128>("PlanetstypeU128");
    st.store(this._typeU128!);
  }
}

@contract
class SolarSystem {
    protected stored: Planets;

    constructor() {
        this.stored = new Planets();
    }

    @constructor
    default(
        name: string = "Earth",
        radius: u32 = 6300,
        isdwarf: boolean = false,
        type128: u128 = u128.fromU64(12)
    ): void {
        this.stored.name = name;
        this.stored.radius = radius;
        this.stored.isdwarf = isdwarf;
        this.stored.typeU128 = type128;
    }

    @message
    set(name: string, radius: u32, isdwarf: boolean, type128: u128): void {
        if (this.stored.name != name) {
            this.stored.name = name;
            this.stored.radius = radius;
            this.stored.isdwarf = isdwarf;
            this.stored.typeU128 = type128;
        }
    }

    @message(mutates = false)
    getType128(): u128 {
    Storage.mode = StoreMode.R;
        return this.stored.typeU128;
    }

    @message
    setType128(type128: u128): void {
        this.stored.typeU128 = type128;
    }

    @message(mutates = false, selector = "0x0a0b0c0d")
    getRadius(): u32 {
    Storage.mode = StoreMode.R;
        return this.stored.radius;
    }

    @message(mutates = false)
    errorGetRadius(): u32 {
    Storage.mode = StoreMode.R;
        this.stored.radius = 100;
        return this.stored.radius;
    }  
}
var msg: Msg = new Msg();

export function deploy(): i32 {
  let solarSystem = new SolarSystem();

  const defaultSelector: u8[] = [0xed,0x4b,0x9d,0x1b];
  if (msg.isSelector(defaultSelector)) {
    const fnParameters = new FnParameters(msg.data);
    let p0 = fnParameters.get<ScaleString>();
    let p1 = fnParameters.get<UInt32>();
    let p2 = fnParameters.get<Bool>();
    let p3 = fnParameters.get<UInt128>();
    solarSystem.default(p0.toString(),p1.unwrap(),p2.unwrap(),p3.unwrap());
  }
  return 0;
}

export function call(): i32 {
  const solarSystem = new SolarSystem();
  const setSelector: u8[] = [0xe8,0xc4,0x5e,0xb6];
  if (msg.isSelector(setSelector)) {
    const fnParameters = new FnParameters(msg.data);
    let p0 = fnParameters.get<ScaleString>();
    let p1 = fnParameters.get<UInt32>();
    let p2 = fnParameters.get<Bool>();
    let p3 = fnParameters.get<UInt128>();
    solarSystem.set(p0.toString(),p1.unwrap(),p2.unwrap(),p3.unwrap());
  }
  const getType128Selector: u8[] = [0x6a,0x01,0xaf,0x21];
  if (msg.isSelector(getType128Selector)) {
    let rs = solarSystem.getType128();
    ReturnData.set<UInt128>(new UInt128(rs));
  }
  const setType128Selector: u8[] = [0xc9,0xc6,0x0b,0xcc];
  if (msg.isSelector(setType128Selector)) {
    const fnParameters = new FnParameters(msg.data);
    let p0 = fnParameters.get<UInt128>();
    solarSystem.setType128(p0.unwrap());
  }
  const getRadiusSelector: u8[] = [0x0a,0x0b,0x0c,0x0d];
  if (msg.isSelector(getRadiusSelector)) {
    let rs = solarSystem.getRadius();
    ReturnData.set<UInt32>(new UInt32(rs));
  }
  const errorGetRadiusSelector: u8[] = [0x1e,0x56,0x1f,0xec];
  if (msg.isSelector(errorGetRadiusSelector)) {
    let rs = solarSystem.errorGetRadius();
    ReturnData.set<UInt32>(new UInt32(rs));
  }
  return 0;
}