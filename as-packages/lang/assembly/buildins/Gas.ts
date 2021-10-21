/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { UInt64 } from "pl-as-scale-codec";
import { ReadBuffer } from "../primitives/readbuffer";
import { seal_gas_left } from "pl-as-contract-runtime";
/**
 * To get gas info during an message call.
 *
 * @export
 * @class Gas
 */
export class Gas {
    /**
     * read the left gas while runing there.
     *
     * @readonly
     * @static
     * @type {u64}
     * @memberof Gas
     */
    static get gasleft(): u64 {
        return ReadBuffer.readInstance<UInt64>(seal_gas_left).unwrap();
    }
}
