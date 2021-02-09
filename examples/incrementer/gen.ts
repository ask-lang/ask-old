/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

/*
 * This is the contract template,
 * which will be processed by Preprocessor,
 * to generate metadata.json file and
 * the compilable target contract file.
 */

@storage
class Stored {
  value: u32;
}

@contract
class Incrementer {
  private stored: Stored;

  constructor() { this.stored = new Stored(); }

  @deployer
  onDeploy(initFlag: u32): void {
    this.stored.value = initFlag;
  }

  @message
  inc(): void {
    let v = this.stored.value;
    this.stored.value = ++v;
  }

  @message
  get(): u32 {
    return this.stored.value;
  }
}
class Stored {
  private _value: u32 = null;

  get value(): u32 {
    if (this._value === null) {
      const st = new Storage<UInt32>("Storedvalue");
      this._value = st.load();
    }
    return this._value!.unwrap();
  }
  set value(v: u32) {
    this._value = new UInt32(v);
    const st = new Storage<UInt32>("Storedvalue");
    st.store(this._value);
  }
}
var msg: Msg = new Msg();

export function deploy(): i32 {
  let _incrementer = new Incrementer();

  const onDeploySelector: u8[] = [0xbb,0x75,0xad,0xfd];
  if (msg.isSelector(onDeploySelector)) {
    const fnParameters = new FnParameters(msg.data);
    let p0 = fnParameters.get<UInt32>();
    _incrementer.onDeploy(p0);
  }
  const onDeploySelector: u8[] = [0xbb,0x75,0xad,0xfd];
  if (msg.isSelector(onDeploySelector)) {
    const fnParameters = new FnParameters(msg.data);
    _incrementer.onDeploy(0);
  }
}

export function call(): i32 {
  const _incrementer = new Incrementer();
  const incSelector: u8[] = [0x24,0xc3,0xb7,0x58];
  if (msg.isSelector(incSelector)) {
    const fnParameters = new FnParameters(msg.data);
    _incrementer.inc();
  }
  const getSelector: u8[] = [0x86,0xa2,0x63,0x09];
  if (msg.isSelector(getSelector)) {
    const fnParameters = new FnParameters(msg.data);
    let rs = _incrementer.get();
    ReturnData.set<UInt32>(new UInt32(rs));
  }

}