/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { Codec, UInt128, UInt8 } from "as-scale-codec";
import { AccountId, Balance } from "../env";
import { ReadBuffer } from "../primitives/readbuffer";
import { seal_balance } from "../seal/seal0";

/**
 * @class Account
 * Class Account stands for an address, which should be a storagable type.
 */

 const BytesCount = 32;
export class Account implements Codec {

  private _id: AccountId;

  constructor(bytes: u8[]) {
    this._id = new Array<u8>(BytesCount);
    memory.copy(changetype<usize>(this._id.buffer), changetype<usize>(bytes.buffer), BytesCount);
  }

  static from(uarr: u8[]): Account {
    return new Account(uarr);
  }

  static fromHexString(hexStr: string): Account {
    // TODO(liangqin.fan): convert a SS58 formated string to an account
    return new Account([]);
  }

  transfer(amount: Balance): void {}

  call(): void {}

  toU8a(): u8[] {
    return [];
  }

  encodedLength(): i32 {
    return 0;
  }

  populateFromBytes(bytes: any[], index: any): void {
    throw new Error("Method not implemented.");
  }

  eq(other: Codec): bool {
    return false;
  }
  notEq(other: Codec): bool {
    return false;
  }
}
