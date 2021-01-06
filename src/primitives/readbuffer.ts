import { Codec } from "as-scale-codec";
import { typedToArray } from "../utils/ArrayUtils";
import { SizeBuffer } from "./sizebuffer";

/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

export class ReadBuffer {
  private valueBuf: Uint8Array;
  private sizeBuf: SizeBuffer;

  static readInstance<T extends Codec>(fn: (valueBuf: ArrayBuffer, sizeBuf: ArrayBuffer) => void ): T {
    let v = instantiate<T>();
    let readbuf = new ReadBuffer(v.encodedLength());
    fn(readbuf.valueBuf, readbuf.sizeBuffer);
    v.populateFromBytes(readbuf.valueBytes, 0);

    return v;
  }

  constructor(bufSize: u32) {
    this.valueBuf = new Uint8Array(bufSize);
    this.sizeBuf = new SizeBuffer(bufSize);
  }

  get valueBytes(): u8[] {
    return this.toU8a(this.valueBuf);
  }

  get readSize(): i32 {
    return this.sizeBuf.value as i32;
  }

  get valueBuffer(): ArrayBuffer { return this.valueBuf.buffer; }

  get sizeBuffer(): ArrayBuffer { return this.sizeBuf.buffer; }

  private toU8a(typedArr: Uint8Array): u8[] {
    return typedToArray(typedArr, this.readSize);
  }
}