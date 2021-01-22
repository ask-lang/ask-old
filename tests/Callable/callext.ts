/* eslint-disable @typescript-eslint/no-empty-function */
/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { Bool, UInt8 } from "as-scale-codec";
import { Storage } from "../../assembly/storage";
import { Log } from "../../assembly/utils/Log";
import { ReturnData } from "../../assembly/primitives/returndata";
import { Msg } from "../../assembly/buildins/Msg";
import { FnParameters } from "../../assembly/buildins/FnParameters";
import { Abi } from "../../assembly/env/Abi";
import { Callable } from "../../assembly/buildins/Callable";
import { ReturnCode } from "../../assembly/primitives/alias";

// storage class should be implemented by preprocessor automatilly like auto load and save.
// Besides these primitives types, any composite type like classes embeded,
// should be instances which implements interface 'Codec'.

var msg: Msg = new Msg();

class CallExt {

  onDeploy(): void {

  }

  callOutside(): void {
    let outcontract: u8[] = [];
    // call a function:  msg(bool, u8);
    let data = new Abi().encode("msg", [new Bool(true), new UInt8(12)]);
    let callable = new Callable(outcontract);
    let ret = callable.gas(88888).value(0).data(data).call();
    if (ret == ReturnCode.Success) {
      let r = callable.callResult();
      // do something with result of calling method
    }
  }
}


export function deploy(): i32 {
  // const selector = arryToHexString(fnSelector);
  // Log.println("deploy.fnSelctor: " + selector);

  const ctorWithParams: u8[] = [0xd1, 0x83, 0x51, 0x2b]; // 0xd183512b
  const ctorWithoutParams: u8[] = [0x6a, 0x37, 0x12, 0xe2]; // 0x6a3712e2

  let callext = new CallExt();

  if (msg.isSelector(ctorWithParams)) {
    callext.onDeploy();
  } else if (msg.isSelector(ctorWithoutParams)) {
    callext.onDeploy();
  } else {
    // nop
  }

  // Log.println("flipper.deploy executed");
  return 0;
}

export function call(): i32 {
  // const selector = arryToHexString(fnSelector);
  // Log.println("call.fnSelctor: " + selector);

  const flp = new CallExt();
  const flipselector: u8[] = [0xc0, 0x96, 0xa5, 0xf8]; // "c096a5f3";


  // Step2: exec command
  if (msg.isSelector(flipselector)) { // flip operation
    flp.callOutside();
  } else {
    if (msg.notPayable()) {
      // call fallback() {}
    } else {
      // call receive() {}
    }
  }
  return 0;
}