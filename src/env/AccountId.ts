/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { Codec } from "as-scale-codec";

/**
 * @class AccountId
 * Class AccountId stands for an address, which should be a storagable type.
 */
export class AccountId implements Codec {
  toU8a(): any[] {
    throw new Error("Method not implemented.");
  }
  encodedLength() {
    throw new Error("Method not implemented.");
  }
  populateFromBytes(bytes: any[], index: any): void {
    throw new Error("Method not implemented.");
  }
  eq(other: Codec) {
    throw new Error("Method not implemented.");
  }
  notEq(other: Codec) {
    throw new Error("Method not implemented.");
  }

}