/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { seal_input } from "../seal/seal0";
import { ReadBuffer } from "./readbuffer";

export class MessageInputReader {
  private readbuf: ReadBuffer;

  static readInput(): MessageInputReader {
    // TODO(liangqin.fan): the suitable size of read buffer??
    return new MessageInputReader(1024);
  }

  private constructor(bufSize: u32) {
    this.readbuf = new ReadBuffer(bufSize); // try 1k memory
    seal_input(this.readbuf.valueBuffer, this.readbuf.sizeBuffer);
  }

  get fnSelector(): u8[] {
    return this.readbuf.valueBytes.slice(0, 4);
  }

  get fnParameters(): u8[] {
    if (this.readbuf.valueBytes.length == 4) return [];
    return this.readbuf.valueBytes.slice(4);
  }
}