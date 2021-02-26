/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { seal_println } from "../seal/seal0";
const HexChar = ['0', '1', '2', '3', '4', '5', '6', '7', '8',
  '9', 'a', 'b', 'c', 'd', 'e', 'f'];

class Logger {
  println(message: string): void {
    const bytes = String.UTF8.encode(message);

    seal_println(
      bytes.buffer,
      bytes.byteLength,
    );
  }

  printdec(ds: u8[]): void {
    let s: string = '['
    for (let i = 0; i < ds.length; i++) {
      let num = "";
      let y = ds[i] % 10;
      let d = ds[i] / 10;

      while (d != 0) {
        num = HexChar[y] + num;
        y = d % 10;
        d = d / 10;
      }

      num = HexChar[y] + num;
      s += num + ", ";
    }
    s += "]"

    this.println(s);
  }

  encodehex(ds: u8[]): string {
    let s: string = '['
    for (let i = 0; i < ds.length; i++) {
      let hsb = ((ds[i] & 0xf0) >> 4);
      let lsb = (ds[i] & 0x0f);
      s += HexChar[hsb];
      s += HexChar[lsb];
      s += ", ";
    }
    s += "]"
    return s;
  }

  printhex(ds: u8[]): void {
    this.println(this.encodehex(ds));
  }
}

export const Log = new Logger();