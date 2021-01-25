/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */


import { Account } from "../../../assembly/buildins/Account";
import { Abi } from "../../../assembly/env/Abi";
import { u128 } from "as-bignum";
import { Msg } from "../../../assembly/buildins/Msg";
import { FnParameters } from "../../../assembly/buildins/FnParameters";
import { Storage } from "../../../assembly";
import { UInt32 } from "../../../assembly/deps/as-scale-codec";
import { ReturnData } from "../../../assembly/primitives/returndata";
import { Log } from "../../../assembly/utils/Log";
/*
 * This is the contract template,
 * which will be processed by Preprocessor,
 * to generate metadata.json file and
 * the compilable target contract file.
 */

// @storage
class Stored {
  _extLib: Account | null;

  constructor() {
    this._extLib = null;
  }

  get extLib(): Account {
    if (this._extLib === null) {
      const stora = new Storage<Account>("flipper.flag");
      this._extLib = stora.load();
    }
    return this._extLib!;
  }

  set extLib(v: Account) {
    this._extLib = v;
    const stora = new Storage<Account>("flipper.flag");
    stora.store(this._extLib!);
  }
}

// @contract
class CrossCall {
  private stored: Stored;

  constructor() { this.stored = new Stored(); }

  // @deployer
  onDeploy(exblib: Account): void {
    this.stored.extLib = exblib;
  }

  // @message
  callext(): u32 {
    let data = Abi.encode("addFunc", [new UInt32(1), new UInt32(2)]);
    Log.println("data: ");
    Log.printhex(data);

    Log.println("account: ");
    Log.printhex(this.stored.extLib.toU8a());

    let val = this.stored.extLib.call(200000, u128.Zero, data);
    Log.println("step2");
    let result = UInt32.fromU8a(val);
    Log.println("step3");
    // assert(result.unwrap() === 3, "calculate result error")
    if (result.unwrap() === 3) {
      Log.println("result is 3.");
    } else {
      Log.println("result is " + String.fromCharCode(result.unwrap() + 0x30));
    }
    return result.unwrap();
  }
}

var msg = new Msg();

export function deploy(): i32 {

  const ctorWithParams: u8[] = [0xd1, 0x83, 0x51, 0x2b]; // 0xd183512b
  const ctorWithoutParams: u8[] = [0x6a, 0x37, 0x12, 0xe2]; // 0x6a3712e2

  let callext = new CrossCall();

  if (msg.isSelector(ctorWithParams)) {
    let fnP = new FnParameters(msg.data);
    let acct = fnP.get<Account>();
    callext.onDeploy(acct);
  } else if (msg.isSelector(ctorWithoutParams)) {
    callext.onDeploy(new Account());
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
