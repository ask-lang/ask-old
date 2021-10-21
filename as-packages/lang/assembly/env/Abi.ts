/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { Codec } from "pl-as-scale-codec";
import { Crypto } from "../primitives/crypto";

/**
 * This class is used to wrap message information when calling an external message.
 *
 * refer to `QuickStart.md` for more details about cross call.
 *
 * @export
 * @class Abi
 */
export class Abi {
    /**
     * To encode parameters for crosse calling.
     *
     * @static
     * @param {string} sig message signature.
     * @param {Codec[]} args parameters of message
     * @returns {u8[]}
     * @memberof Abi
     */
    static encode(sig: string, args: Codec[]): u8[] {
        let data = Abi.fnSelctor(sig);
        for (let i = 0; i < args.length; i++) {
            data = data.concat(args[i].toU8a());
        }
        return data;
    }

    /**
     * To encode the message signature.
     *
     * @static
     * @param {string} sig message signature
     * @returns {u8[]}
     * @memberof Abi
     */
    static fnSelctor(sig: string): u8[] {
        return Crypto.blake256s(sig).toU8a().slice(0, 4);
    }
}
