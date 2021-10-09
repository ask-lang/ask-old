/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { seal_println } from "as-contract-runtime";
import { WriteBuffer } from "../primitives/writebuffer";
import { toU8Array } from "./ArrayUtils";
const HexChar = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
];

/**
 * This class wrappers function `seal_println` on chain,
 * which helps to debug.
 *
 * @class Logger
 */
class Logger {
    /**
     * To print a message
     *
     * @param {string} message message to print
     * @returns {Logger}
     * @memberof Logger
     */
    println(message: string): Logger {
        const outbuf = new WriteBuffer(toU8Array(String.UTF8.encode(message)));

        seal_println(
            outbuf.buffer,
            outbuf.size
        );

        return this;
    }
    /**
     * To print an u32
     *
     * @param {u32} v
     * @returns {Logger}
     * @memberof Logger
     */
    printu32(v: u32): Logger {
        let num = "";
        let y = v % 10;
        let d = v / 10;

        while (d != 0) {
            num = HexChar[y] + num;
            y = d % 10;
            d = d / 10;
        }

        num = HexChar[y] + num;

        this.println(num);
        return this;
    }
    /**
     * To print an array with decimal styled string.
     *
     * @param ds array to print
     * @returns
     */
    printdec(ds: u8[]): Logger {
        let s: string = '[ ';
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
            s += num;

            if (i != ds.length - 1) s += ", ";
        }
        s += " ]";

        this.println(s);

        return this;
    }

    private encodehex(ds: u8[], sep: string = ","): string {
        let s: string = '[';
        for (let i = 0; i < ds.length; i++) {
            let hsb = ((ds[i] & 0xf0) >> 4);
            let lsb = (ds[i] & 0x0f);
            s += HexChar[hsb];
            s += HexChar[lsb];

            if (i != ds.length - 1)
                s += sep;
        }
        s += "]";
        return s;
    }
    /**
     * To print an array with hex styled string.
     *
     * @param {u8[]} ds
     * @returns {Logger}
     * @memberof Logger
     */
    printhex(ds: u8[]): Logger {
        this.println(this.encodehex(ds));
        return this;
    }
}

export const Log = new Logger();
