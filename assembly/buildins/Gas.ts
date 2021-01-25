/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { UInt64 } from "../deps/as-scale-codec";
import { ReadBuffer } from "../primitives/readbuffer";
import { seal_gas_left } from "../seal/seal0";

export class Gas {
  private static _gasleft  : UInt64 | null = null;

  static get gasleft(): u32 {
    // FIXME(liangiqn.fan): should always read from native? or how to track the newest left value?
    if (Gas._gasleft === null) {
      Gas._gasleft = ReadBuffer.readInstance<UInt64>(seal_gas_left);
    }

    return Gas._gasleft!.unwrap();
  }
}