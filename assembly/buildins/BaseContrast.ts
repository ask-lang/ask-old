/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { ReadBuffer } from "../primitives/readbuffer";
import { seal_address } from "../seal/seal0";
import { Account } from "./Account";
import { Msg } from "./Msg";

export class BaseContract {
  protected _msg: Msg | null = null;
  protected _address: Account | null = null;
  
  /**
   * get informations of this message invoked by external users.
   *
   * @readonly
   * @type {Msg}
   * @memberof BaseContract
   */
  get msg(): Msg {
    if (this._msg === null) {
      this._msg = new Msg();
    }

    return this._msg;
  }

  /**
   * get the address of this contract.
   *
   * @readonly
   * @type {AccountId}
   * @memberof BaseContract
   */
  get address(): Account {
    if (this._address === null) {
      let readbuf = new ReadBuffer(32);
      seal_address(readbuf.valueBuffer, readbuf.sizeBuffer);
      this._address = Account.from(readbuf.valueBytes);
    }

    return this._address;
  }
}