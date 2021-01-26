/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { UInt64 } from "../deps/as-scale-codec";
import { ReadBuffer } from "../primitives/readbuffer";
import { seal_gas_left } from "../seal/seal0";

export class Gas {
  static get gasleft(): u64 {
      return ReadBuffer.readInstance<UInt64>(seal_gas_left).unwrap();
  }
}