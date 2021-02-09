/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { Codec } from "../deps/as-scale-codec";
import { Crypto } from "../primitives/crypto";

export class Abi {
  static encode(sig: string, args: Codec[]): u8[] {
    let data = Abi.fnSelctor(sig);
    for (let i = 0; i < args.length; i++) {
      data = data.concat(args[i].toU8a());
    }
    return data;
  }

  static fnSelctor(sig: string): u8[] {
    // FIXME(liangqin) the generate value is not consisted with native version.....
    return Crypto.blake256s(sig).toU8a().slice(0, 4);
  }
}

