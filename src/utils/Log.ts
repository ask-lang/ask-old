/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { seal_println } from "../seal/seal0";
import { WriteBuffer } from "../primitives/writebuffer";

class Logger {
  println(message: string): void {
    const outbuf = new WriteBuffer(String.UTF8.encode(message));

    seal_println(
      outbuf.buffer,
      outbuf.size
    );
  }
}

export const Log = new Logger();