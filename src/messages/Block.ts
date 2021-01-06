/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { UInt32 } from "as-scale-codec";
import { ReadBuffer } from "../primitives/readbuffer";
import { seal_block_number, seal_gas_left, seal_now } from "../seal/seal0";

export class Block {
  private _timestamp: UInt32 | null = null;
  private _number: UInt32 | null = null;
  private _gasleft: UInt32 | null = null;

  get timestamp(): u32 {
    if (this._timestamp === null) {
      this._timestamp = ReadBuffer.readInstance<UInt32>(seal_now);
    }

    return this._timestamp!.unwrap();
  }

  get number(): u32 {
    if (this._number === null) {
      this._number = ReadBuffer.readInstance<UInt32>(seal_block_number);
    }

    return this._number!.unwrap();
  }

  get gasleft(): u32 {
    if (this._gasleft === null) {
      this._gasleft = ReadBuffer.readInstance<UInt32>(seal_gas_left);
    }

    return this._gasleft!.unwrap();
  }
}