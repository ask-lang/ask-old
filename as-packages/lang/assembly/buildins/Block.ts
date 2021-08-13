/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { UInt32, UInt64 } from "as-scale-codec";
import { BlockNumber } from "../env";
import { ReadBuffer } from "../primitives/readbuffer";
import { seal_block_number, seal_now } from "as-contract-runtime";

class Block {
    private _timestamp: UInt64 | null = null;
    private _number: BlockNumber | null = null;

    get timestamp(): u64 {
        if (this._timestamp === null) {
            this._timestamp = ReadBuffer.readInstance<UInt64>(seal_now);
        }

        return this._timestamp!.unwrap();
    }

    get number(): BlockNumber {
        if (this._number === null) {
            this._number = ReadBuffer.readInstance<UInt32>(seal_block_number);
        }

        return this._number;
    }
}

export const block = new Block();