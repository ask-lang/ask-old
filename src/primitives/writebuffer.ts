import { Bytes } from "as-scale-codec";

/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */
export class WriteBuffer {
  private valueBuf: Uint8Array;

  constructor(u8a: ArrayBuffer) {
    this.valueBuf = Uint8Array.wrap(u8a);
  }

  get size(): u32 {
    return this.valueBuf.length;
  }

  get buffer(): ArrayBuffer { return this.valueBuf.buffer; }
}