/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */


import {
  AccountId,
  Abi,
  u128,
  Msg,
  FnParameters,
  Storage,
  UInt32,
  ReturnData,
  Log,
  Gas
} from "../../../assembly/";
/*
* This is the contract template,
* which will be processed by Preprocessor,
* to generate metadata.json file and
* the compilable target contract file.
*/
var msg = new Msg();

// @storage
class Stored {
  _extLib: AccountId | null;

  constructor() {
    this._extLib = null;
  }

  get extLib(): AccountId {
    if (this._extLib === null) {
      const stora = new Storage<AccountId>("flipper.flag");
      this._extLib = stora.load();
    }
    return this._extLib!;
  }

  set extLib(v: AccountId) {
    this._extLib = v;
    const stora = new Storage<AccountId>("flipper.flag");
    stora.store(this._extLib!);
  }
}

// @contract
class CrossCall {
  private stored: Stored;

  constructor() { this.stored = new Stored(); }

  // @constructor
  onDeploy(exblib: AccountId): void {
    this.stored.extLib = exblib;
  }

  // @message
  callext(): u32 {
    let data = Abi.encode("addFunc", [new UInt32(1), new UInt32(2)]);
    let val = this.stored.extLib.call(data);
    let result = UInt32.fromU8a(val);
    return result.unwrap();
  }
}


export function deploy(): i32 {

  const ctorWithParams: u8[] = [0xd1, 0x83, 0x51, 0x2b]; // 0xd183512b
  const ctorWithoutParams: u8[] = [0x6a, 0x37, 0x12, 0xe2]; // 0x6a3712e2

  let callext = new CrossCall();

  if (msg.isSelector(ctorWithParams)) {
    let fnP = new FnParameters(msg.data);
    let acct = fnP.get<AccountId>();
    callext.onDeploy(acct);
  } else if (msg.isSelector(ctorWithoutParams)) {
    callext.onDeploy(new AccountId());
  } else {
    // nop
  }
  return 0;
}

export function call(): i32 {
  const flp = new CrossCall();
  const flipselector: u8[] = [0xc0, 0x96, 0xa5, 0xf8]; // "c096a5f8";

  // Step2: exec command
  if (msg.isSelector(flipselector)) { // flip operation
    let v = flp.callext();
    ReturnData.set<UInt32>(new UInt32(v));
  } else {
    Log.println("no function called.")
  }

  return 0;
}
