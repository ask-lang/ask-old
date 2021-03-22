/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { seal_address } from "as-contract-runtime";
import { ReadBuffer } from "../primitives/readbuffer";
import { AccountId } from "./AccountId";
import { Msg } from "./Msg";

export class BaseContract {
    protected _msg: Msg | null = null;
    protected _address: AccountId | null = null;

    /**
     * get informations of this message invoked by external users.
     *
     * @readonly
     * @type {Msg}
     * @memberof BaseContract
     */
    get msg(): Msg {
        if (this._msg === null) {
            this._msg = new Msg();
        }

        return this._msg;
    }

    /**
     * get the address of this contract.
     *
     * @readonly
     * @type {AccountId}
     * @memberof BaseContract
     */
    get address(): AccountId {
        if (this._address === null) {
            let readbuf = new ReadBuffer(32);
            seal_address(readbuf.valueBuffer, readbuf.sizeBuffer);
            this._address = AccountId.from(readbuf.valueBytes);
        }

        return this._address;
    }
}
