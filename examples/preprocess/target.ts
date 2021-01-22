/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { Bool } from "as-scale-codec";
import { Storage } from "../../assembly/storage";
import { Log } from "../../assembly/utils/Log";
import { ReturnData } from "../../assembly/primitives/returndata";
import { Msg } from "../../assembly/buildins/Msg";
import { FnParameters } from "../../assembly/buildins/FnParameters";

// storage class should be implemented by preprocessor automatilly like auto load and save.
// Besides these primitives types, any composite type like classes embeded,
// should be instances which implements interface 'Codec'.

// FIXME(liaignqin.fan): inject variable `msg` to global, so can be retrieved anywhere.
var msg: Msg = new Msg();

class Stored {
  private _flag: Bool | null;

  constructor() {
    this._flag = null;
  }

  get flag(): bool {
    if (this._flag === null) {
      const stora = new Storage<Bool>("flipper.flag");
      this._flag = stora.load();
    }
    return this._flag!.unwrap();
  }

  set flag(v: bool) {
    this._flag = new Bool(v);
    const stora = new Storage<Bool>("flipper.flag");
    stora.store(this._flag!);
  }
}

class Flipper {
  private stored: Stored;

  constructor() { this.stored = new Stored(); }

  onDeploy(initFlag: bool): void {
    this.stored.flag = initFlag;
  }

  flip(): void {
    assert(msg.notPayable(), "Can not accept value");
    const v = this.stored.flag;
    this.stored.flag = !v;
  }

  get(): bool {
    assert(msg.notPayable(), "Can not accept value");
    return this.stored.flag;
  }

  pay(): void {
  }

  specific(): void {
    assert(msg.notPayable(), "Can not accept value");
  }
}


export function deploy(): i32 {
  // const selector = arryToHexString(fnSelector);
  // Log.println("deploy.fnSelctor: " + selector);

  const ctorWithParams: u8[] = [0xd1, 0x83, 0x51, 0x2b]; // 0xd183512b
  const ctorWithoutParams: u8[] = [0x6a, 0x37, 0x12, 0xe2]; // 0x6a3712e2

  let flipper = new Flipper();

  if (msg.isSelector(ctorWithParams)) {
    const fnParameters = new FnParameters(msg.data);
    let v = fnParameters.get<Bool>();

    // more parameters
    // const s: UInt32 = fnParameters.get<UInt32>();

    flipper.onDeploy(v.unwrap());
  } else if (msg.isSelector(ctorWithoutParams)) {
    flipper.onDeploy(false);
  } else {
    // nop
  }

  // Log.println("flipper.deploy executed");
  return 0;
}

export function call(): i32 {
  // const selector = arryToHexString(fnSelector);
  // Log.println("call.fnSelctor: " + selector);

  const flp = new Flipper();
  const flipselector:     u8[] = [0xc0, 0x96, 0xa5, 0xf8]; // "c096a5f3";
  const getselector:      u8[] = [0x1e, 0x5c, 0xa4, 0x56]; // "1e5ca456";
  const specificSelector: u8[] = [0xfe, 0xdc, 0x03, 0xf6];
  const paysselector:     u8[] = [0xfc, 0x3c, 0x4d, 0xf7];

  // Step2: exec command
  if (msg.isSelector(flipselector)) { // flip operation
    flp.flip();
  } else if (msg.isSelector(getselector)) { // get operation
    const flag = flp.get();
    ReturnData.set<Bool>(new Bool(flag));
  } else if (msg.isSelector(paysselector)) {
    flp.pay();
  } else if (msg.isSelector(specificSelector)) {
    flp.specific();
  } else {
    if (msg.notPayable()) {
      // call fallback() {}
    } else {
      // call receive() {}
    }
  }
  return 0;
}