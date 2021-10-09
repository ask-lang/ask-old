/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { UInt32, UInt64 } from "as-scale-codec";
import { BlockNumber } from "../env";
import { ReadBuffer } from "../primitives/readbuffer";
import { seal_block_number, seal_now } from "as-contract-runtime";
/**
 * This class is used to retrieve some message on chain.
 *
 * @class Block
 */
class Block {
    private _timestamp: UInt64 | null = null;
    private _number: BlockNumber | null = null;
    /**
     * To get the timestamp on chain.
     *
     * @readonly
     * @type {u64}
     * @memberof Block
     */
    get timestamp(): u64 {
        if (this._timestamp === null) {
            this._timestamp = ReadBuffer.readInstance<UInt64>(seal_now);
        }

        return this._timestamp!.unwrap();
    }
    /**
     * To get the block number on chain.
     *
     * @readonly
     * @type {BlockNumber}
     * @memberof Block
     */
    get number(): BlockNumber {
        if (this._number === null) {
            this._number = ReadBuffer.readInstance<UInt32>(seal_block_number);
        }

        return this._number;
    }
}
/**
 * A global variable of `Block`
 */
export const block = new Block();