/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { Codec } from "as-scale-codec";

export class FnParameters {
  private pos: i32;
  private datas: Array<u8>;

  constructor(u: u8[]) {
    this.datas = u;
    this.pos = 0;
  }

  get<T extends Codec>(): T {
    let ins = instantiate<T>();
    ins.populateFromBytes(this.datas, this.pos);
    this.pos += ins.encodedLength();
    return ins;

  }
}