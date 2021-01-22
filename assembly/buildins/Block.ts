/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { UInt64 } from "as-scale-codec";
import { ReadBuffer } from "../primitives/readbuffer";
import { seal_block_number, seal_now } from "../seal/seal0";

export class Block {
  private _timestamp: UInt64 | null = null;
  private _number   : UInt64 | null = null;

  get timestamp(): u64 {
    if (this._timestamp === null) {
      this._timestamp = ReadBuffer.readInstance<UInt64>(seal_now);
    }

    return this._timestamp!.unwrap();
  }

  get number(): u64 {
    if (this._number === null) {
      this._number = ReadBuffer.readInstance<UInt64>(seal_block_number);
    }

    return this._number!.unwrap();
  }
}