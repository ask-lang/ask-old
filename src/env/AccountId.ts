/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { Codec, UInt128, UInt8 } from "as-scale-codec";
import { ReadBuffer } from "../primitives/readbuffer";
import { seal_balance } from "../seal/seal0";
import { Balance } from "./Balance";

/**
 * @class AccountId
 * Class AccountId stands for an address, which should be a storagable type.
 */

 const BytesCount = 32;
export class AccountId implements Codec {

  private _rawBytes: Array<u8>;

  constructor(bytes: u8[]) {
    this._rawBytes = new Array<u8>(BytesCount);
    memory.copy(changetype<usize>(this._rawBytes.buffer), changetype<usize>(bytes.buffer), BytesCount);
  }

  static from(uarr: u8[]): AccountId {
    return new AccountId(uarr);
  }

  static fromHexString(hexStr: string): AccountId {
    // TODO(liangqin.fan): convert a SS58 formated string to an account
    return new AccountId([]);
  }

  get balance(): Balance {
    let v = ReadBuffer.readInstance<Balance>(seal_balance);
    return v;
  }

  transfer(amount: u64): void {}

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
