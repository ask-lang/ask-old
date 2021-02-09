/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { Msg, Bool, UInt8, Event } from "../../assembly/";

// storage class should be implemented by preprocessor automatilly like auto load and save.
// Besides these primitives types, any composite type like classes embeded,
// should be instances which implements interface 'Codec'.

var msg: Msg = new Msg();

// event Approved generated code
class Approved extends Event {
  from: UInt8;
  to: UInt8;
  success: Bool;

  // as-preprocessor should generate this method for @Event
  prepare(): void {
    Event.appendTopic(this.from);
    Event.appendTopic(this.to);

    Event.appendData(this.from);
    Event.appendData(this.to);
    Event.appendData(this.success);
  }
}

class EventEmitter {

  constructor() { }

  onDeploy(): void {
  }

  fire(): void {
    let e: Approved = {from: new UInt8(9), to: new UInt8(10), success: new Bool(false)};
    Event.emit(e);
  }

}


export function deploy(): i32 {
  // const selector = arryToHexString(fnSelector);
  // Log.println("deploy.fnSelctor: " + selector);

  const ctorWithParams: u8[] = [0xd1, 0x83, 0x51, 0x2b]; // 0xd183512b
  const ctorWithoutParams: u8[] = [0x6a, 0x37, 0x12, 0xe2]; // 0x6a3712e2

  let flipper = new EventEmitter();

  if (msg.isSelector(ctorWithParams)) {
    flipper.onDeploy();
  } else if (msg.isSelector(ctorWithoutParams)) {
    flipper.onDeploy();
  } else {
    // nop
  }
  return 0;
}

export function call(): i32 {
  const flp = new EventEmitter();
  const flipselector: u8[] = [0xc0, 0x96, 0xa5, 0xf8]; // "c096a5f3";

  // Step2: exec command
  if (msg.isSelector(flipselector)) { // flip operation
    flp.fire();
  } else {
    if (msg.notPayable()) {
      // call fallback() {}
    } else {
      // call receive() {}
    }
  }
  return 0;
}