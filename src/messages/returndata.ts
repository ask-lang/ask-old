/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { Codec } from "as-scale-codec";
import { seal_return } from "../seal/seal0";
import { WriteBuffer } from "../primitives/writebuffer";

export class ReturnData {
  static set<T extends Codec>(v: T): void {
    const wbuf = new WriteBuffer(v.toU8a().buffer);

    seal_return(0, wbuf.buffer, wbuf.size);
  }
}