/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { ReturnCode, seal_call } from "as-contract-runtime";
import { ReadBuffer } from "../primitives/readbuffer";
import { WriteBuffer } from "../primitives/writebuffer";
import { UInt128, UInt64 } from "as-scale-codec";
import { u128 } from "as-bignum";
/**
 * This class is used for calling an external message.
 *
 * refer to `QuickStart.md` for more details about cross call.
 *
 * @export
 * @class Callable
 */
export class Callable {
    private _callee: u8[] | null = null;
    private _gas: UInt64 | null = null;
    private _value: UInt128 | null = null;
    private _data: u8[] | null = null;
    private _outBuffer: ReadBuffer | null = null;

    constructor(callee: u8[]) {
        this._callee = callee;
    }
    /**
     * To set the amount of gas for calling
     * @param g gas used for calling
     * @returns this
     */
    gas(g: u64): Callable {
        this._gas = new UInt64(g);
        return this;
    }
    /**
     * To set the amount of value for calling
     * @param v value used for calling
     * @returns this
     */
    value(v: u128): Callable {
        this._value = new UInt128(v);
        return this;
    }
    /**
     * To set the bytes of parameters of calling
     *
     * @param {u8[]} d bytes of parameters for calling
     * @returns {Callable}
     * @memberof Callable
     */
    data(d: u8[]): Callable {
        this._data = d;
        return this;
    }

    /**
     * result of this calling, it is bytes returned by external message.
     *
     * @returns {u8[]}
     * @memberof Callable
     */
    callResult(): u8[] {
        if (this._outBuffer === null) return [];
        return this._outBuffer!.valueBytes;
    }
    /**
     * fire this call request.
     *
     * @returns {ReturnCode}
     * @memberof Callable
     */
    call(): ReturnCode {
        assert(this._callee !== null, "callee not set");
        assert(this._gas !== null, "gas not set");

        const callee = new WriteBuffer(this._callee!);
        let value: WriteBuffer | null = null;
        if (this._value === null) {
            value = new WriteBuffer([0]);
        } else {
            value = new WriteBuffer(this._value!.toU8a());
        }

        const data = new WriteBuffer(this._data!);
        this._outBuffer = new ReadBuffer();
        const ret = seal_call(
            callee.buffer,
            callee.size,
            this._gas!.unwrap(),
            value.buffer,
            value.size,
            data.buffer,
            data.size,
            this._outBuffer!.valueBuffer,
            this._outBuffer!.sizeBuffer
        );

        return ret;
    }
}
