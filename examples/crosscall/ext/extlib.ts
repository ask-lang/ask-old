/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { FnParameters, Msg, UInt32, ReturnData, Log } from "../../../assembly/";

 var msg = new Msg();
// @contract
class ExtLib {
  constructor() { }

  // @constructor
  onDeploy(): void {
  }

  // @message
  addFunc(factor1: u32, factor2: u32): u32 {
    return factor1 + factor2;
  }
}


export function deploy(): i32 {

  const ctorWithParams: u8[] = [0xd1, 0x83, 0x51, 0x2b]; // 0xd183512b
  const ctorWithoutParams: u8[] = [0x6a, 0x37, 0x12, 0xe2]; // 0x6a3712e2

  let callext = new ExtLib();

  if (msg.isSelector(ctorWithParams)) {
    callext.onDeploy();
  } else if (msg.isSelector(ctorWithoutParams)) {
    callext.onDeploy();
  } else {
    // nop
  }
  return 0;
}

export function call(): i32 {
  Log.println("extlib called.");
  const flp = new ExtLib();
  // const flipselector: u8[] = [0x38, 0xdf, 0x64, 0xef]; // "c096a5f3";
  const flipselector: u8[] = [0x1f, 0xf7, 0xcb, 0xb8]; // "1f, f7, cb, b8";
  // Step2: exec command
  if (msg.isSelector(flipselector)) { // flip operation
    let fnParameters = new FnParameters(msg.data);
    let f1 = fnParameters.get<UInt32>().unwrap();
    let f2 = fnParameters.get<UInt32>().unwrap();
    let r = flp.addFunc(f1, f2);

    ReturnData.set<UInt32>(new UInt32(r));
  }
  return 0;
}
