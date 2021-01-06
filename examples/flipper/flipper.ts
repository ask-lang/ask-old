/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { Bool } from "as-scale-codec";
import { Storage } from "../../src/storage";
import { Log } from "../../src/utils/Log";
import { ReturnData } from "../../src/primitives/returndata";
import { Msg } from "../../src/messages/Msg";
import { FnParameters } from "../../src/messages/FnParameters";

// storage class should be implemented by preprocessor automatilly like auto load and save.
// Besides these primitives types, any composite type like classes embeded,
// should be instances which implements interface 'Codec'.

// ********************* Auto Implemented start ******************
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


export function deploy(): i32 {
  // const selector = arryToHexString(fnSelector);
  // Log.println("deploy.fnSelctor: " + selector);

  const ctorWithParams: u8[] = [0xd1, 0x83, 0x51, 0x2b]; // 0xd183512b
  const ctorWithoutParams: u8[] = [0x6a, 0x37, 0x12, 0xe2]; // 0x6a3712e2

  let flipper = new Flipper();
  const msg = new Msg();

  if (isSelectorEqual(msg.sig, ctorWithParams)) {
    const fnParameters = new FnParameters(msg.data);
    let v = fnParameters.get<Bool>();
    // const v = Bool.fromU8a(p.slice(1)).unwrap();
    flipper.onDeploy(v.unwrap());
  } else if (isSelectorEqual(msg.sig, ctorWithoutParams)) {
    flipper.onDeploy(false);
  } else {
    // nop
  }

  // Log.println("flipper.deploy executed");
  return 0;
}

function isSelectorEqual(l: u8[], r: u8[]): boolean {
  if (l.length != r.length) return false;
  return memory.compare(changetype<usize>(l.buffer), changetype<usize>(r.buffer), 4) == 0;
}

export function call(): i32 {
  // Step1: read input calling params;
  const msg = new Msg();
  // const selector = arryToHexString(fnSelector);
  // Log.println("call.fnSelctor: " + selector);

  const flp = new Flipper();
  const flipselector: u8[] = [0xc0, 0x96, 0xa5, 0xf8]; // "c096a5f3";
  const getselector: u8[] = [0x1e, 0x5c, 0xa4, 0x56]; // "1e5ca456";

  // Step2: exec command
  if (isSelectorEqual(msg.sig, flipselector)) { // flip operation
    flp.flip();
  } else if (isSelectorEqual(msg.sig, getselector)) { // get operation
    const flag = flp.get();
    ReturnData.set<Bool>(new Bool(flag));
  } else {
    // nop
    // Log.println("do nothing");
  }
  // Step3: store modified storage
  return 0;
}
// ********************* Auto Implemented end ******************

// code written by developer
/*
@storage
class Stored {
  private flag: boolean;
}
*/
// @contract
class Flipper {
  // @storage
  private stored: Stored;

  constructor() { this.stored = new Stored(); }

  // @deployer
  onDeploy(initFlag: bool): void {
    this.stored.flag = initFlag;
  }
  // @message
  flip(): void {
    const v = this.stored.flag;
    this.stored.flag = !v;
  }
  // @message
  get(): bool {
    return this.stored.flag;
  }
}
