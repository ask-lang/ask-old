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
  callext(): void {
    let data = Abi.encode("addFunc", [new UInt32(12345), new UInt32(54321)]);
    let val = this.stored.extLib.call(2000000, u128.Zero, data);
    let result = UInt32.fromU8a(val);
    assert(result.unwrap() === 66666, "calculate result error")
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
  const flipselector: u8[] = [0xc0, 0x96, 0xa5, 0xf3]; // "c096a5f3";

  // Step2: exec command
  if (msg.isSelector(flipselector)) { // flip operation
    flp.callext();
  }
  return 0;
}
