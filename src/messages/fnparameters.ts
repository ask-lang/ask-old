/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { typedToArray } from "../utils/ArrayUtils";


export class FnParameters {
  private pos: i32;
  private datas: Uint8Array;

  constructor(u: u8[]) {
    this.datas = Uint8Array.wrap(u.buffer);
    this.pos = 0;
  }

  slice(len: i32): u8[] {
    let arr = this.datas.subarray(this.pos, this.pos + len);
    this.pos += len;
    assert(this.pos < this.datas.length);
    return typedToArray(arr);
  }
}