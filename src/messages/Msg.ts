/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { UInt64 } from "as-scale-codec";
import { AccountId } from "../env";
import { ReadBuffer } from "../primitives/readbuffer";
import { seal_caller, seal_value_transferred } from "../seal/seal0";
import { MessageInputReader } from "./inputdata";

export class Msg {
  private _sender: AccountId | null = null;
  private _value: UInt64 | null = null;
  private _sig: u8[] | null = null;
  private _data: u8[] | null = null;

  get value(): u64 {
    if (this._value === null) {
      this._value = new UInt64();
      let readbuf = new ReadBuffer(this._value!.encodedLength());
      seal_value_transferred(readbuf.valueBuffer, readbuf.sizeBuffer);
      this._value!.populateFromBytes(readbuf.valueBytes);
    }
    return this._value!.unwrap();
  }

  get sender(): AccountId {
    if (this._sender === null) {
      let readbuf = new ReadBuffer(32);
      seal_caller(readbuf.valueBuffer, readbuf.sizeBuffer);
      this._sender = AccountId.from(readbuf.valueBytes);
    }

    return this._sender!;
  }

  get sig(): u8[] {
    if (this._sig === null) {
      this.init_sig_and_data();
    }
    return this._sig!;
  }

  get data(): u8[] {
    if (this._data === null) {
      this.init_sig_and_data();
    }
    return this._data!;
  }

  private init_sig_and_data(): void {
    if (this._sig === null || this._data === null) {
      const reader = MessageInputReader.readInput();
      if (this._sig === null) {
        this._sig = new Array<u8>(4);
        memory.copy(changetype<usize>(this._sig!.buffer), changetype<usize>(reader.fnSelector.buffer), 4);
      }

      const datalen = reader.fnParameters.length;
      if (this._data === null) {
        if (datalen > 0) {
          this._data = new Array<u8>(datalen);
          memory.copy(changetype<usize>(this._data!.buffer), changetype<usize>(reader.fnParameters.buffer), datalen);
        } else {
          this._data = [];
        }
      }

    }
  }
}