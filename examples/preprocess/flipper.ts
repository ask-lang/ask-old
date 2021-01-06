/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { Bool, UInt8, Int8 } from "as-scale-codec";
import { MessageInputReader } from "../../src/messages/inputdata";
import { arryToHexString } from "../../src/utils/ArrayUtils";
import { Storage } from "../../src/storage";
import { Log } from "../../src/utils/Log";
import { ReturnData } from "../../src/messages/returndata";

@storage
class Stored {
  private flag: boolean;
  private flag2: boolean;
  private num_u8: u8;
  private num_i8: i8;
}

@contract
class Flipper {
  // @storage
  private stored: Stored;

  constructor() { this.stored = new Stored(); }

  @deployer
  onDeploy(initFlag: boolean): void {
    this.stored.flag = initFlag;
  }
  @action
  flip(): void {
    const v = this.stored.flag;
    this.stored.flag = !v;
  }
  @action
  get(): boolean {
    return this.stored.flag;
  }
}
