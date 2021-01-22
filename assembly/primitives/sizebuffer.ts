/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

/**
  * @class SizeBuffer used to receive out buffer size while retrieve data from host.
  */
export class SizeBuffer {
  private buf: Uint8Array;
  constructor(size: u32) {
    this.buf = new Uint8Array(4);
    for (let i = 0; i < 4; i++) {
      // tslint:disable-next-line: no-bitwise
      this.buf[i] = ((size >> (i * 8)) & 0xff) as u8;
    }
  }

  get buffer(): ArrayBuffer { return this.buf.buffer; }

  get value(): u32 {
    let v: u32 = 0;
    for (let i = 3; i >= 0; i--) {
      v = (this.buf[i] as u32) << (i * 8) | v;
    }
    return v;
  }
}
