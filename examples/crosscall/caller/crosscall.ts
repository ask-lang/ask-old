/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { UInt32 } from "as-scale-codec";
import { Account } from "../../../assembly/buildins/Account";
import { Abi } from "../../../assembly/env/Abi";
import { u128 } from "as-bignum";
/*
 * This is the contract template,
 * which will be processed by Preprocessor,
 * to generate metadata.json file and
 * the compilable target contract file.
 */

@storage
class Stored {
  extLib: Account;
}

@contract
class CrossCall {
  private stored: Stored;

  constructor() { this.stored = new Stored(); }

  @deployer
  onDeploy(exblib: Account): void {
    this.stored.extLib = exblib;
  }

  @message
  callext(): void {
    let data = Abi.encode("addFunc", [new UInt32(12345), new UInt32(54321)]);
    let val = this.stored.extLib.call(2000000, u128.Zero, data);
    let result = UInt32.fromU8a(val);
    assert(result.unwrap() === 66666, "calculate result error")
  }
}
