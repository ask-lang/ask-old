/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { Codec, UInt16 } from "../deps/as-scale-codec";
import { seal_return } from "../seal/seal0";

export class ReturnData {
  static set<T extends Codec>(v: T): void {
    let bytes = v.toU8a();
    seal_return(0, bytes.buffer, bytes.length);
  }
}