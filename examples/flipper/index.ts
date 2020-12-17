/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { Bool } from "as-scale-codec";
import { MessageInputReader } from "../../src/messages/inputdata";
import { arryToHexString } from "../../src/utils/ArrayUtils";
import { Storage } from "../../src/storage";
import { Log } from "../../src/utils/Log";
import { ReturnData } from "../../src/messages/returndata";


class Flipper {
  // @storage
  flag: boolean;

  constructor() { this.flag = false; }

  // @deploy
  onDeploy(initFlag: boolean): void {
    const stora = new Storage<Bool>("flipper.flag");
    stora.store(new Bool(initFlag));
  }
  // @message
  flip(): void {
    const stora = new Storage<Bool>("flipper.flag");
    const v = stora.load().unwrap();
    stora.store(new Bool(!v));
  }
  // @message
  get(): boolean {
    let stora = new Storage<Bool>("flipper.flag");
    let v = stora.load();
    return v.unwrap();
  }
}

export function deploy(): i32 {
  const reader = MessageInputReader.readInput();
  const fnSelector = reader.fnSelector;
  // const selector = arryToHexString(fnSelector);
  // Log.println("deploy.fnSelctor: " + selector);

  const ctorWithParams: u8[] = [0xd1, 0x83, 0x51, 0x2b]; // 0xd183512b
  const ctorWithoutParams: u8[] = [0x6a, 0x37, 0x12, 0xe2]; // 0x6a3712e2

  let flipper = new Flipper();
  if (isSelectorEqual(fnSelector, ctorWithParams)) {
    const p = reader.fnParameters;
    const v = Bool.fromU8a(p).unwrap();
    flipper.onDeploy(v);
  } else if (isSelectorEqual(fnSelector, ctorWithoutParams)) {
    flipper.onDeploy(false);
  } else {
    // nop
  }

  // Log.println("flipper.deploy executed");
  return 0;
}

function isSelectorEqual(l: u8[], r: u8[]): boolean {
  if (l.length != r.length) return false;
  for (let i = 0; i < l.length; i++) {
    if (l[i] != r[i]) return false;
  }
  return true;
}

export function call(): i32 {
  // Step1: read input calling params;
  const reader = MessageInputReader.readInput();
  const fnSelector = reader.fnSelector;
  // const selector = arryToHexString(fnSelector);
  // Log.println("call.fnSelctor: " + selector);

  const flp = new Flipper();
  const flipselector: u8[] = [0xc0, 0x96, 0xa5, 0xf3]; // "c096a5f3";
  const getselector: u8[] = [0x1e, 0x5c, 0xa4, 0x56]; // "1e5ca456";

  // Step2: exec command
  if (isSelectorEqual(fnSelector, flipselector)) { // flip operation
    flp.flip();
  } else if (isSelectorEqual(fnSelector, getselector)) { // get operation
    const flag = flp.get();
    ReturnData.set<Bool>(new Bool(flag));
  } else {
    // nop
    // Log.println("do nothing");
  }
  // Step3: store modified storage
  return 0;
}