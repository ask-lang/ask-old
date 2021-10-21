/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { Codec } from "pl-as-scale-codec";
import { seal_return } from "pl-as-contract-runtime";

export class ReturnData {
    static set<T extends Codec>(v: T): void {
        const wbuf = v.toU8a();
        seal_return(0, wbuf.dataStart, wbuf.length);
    }
}
