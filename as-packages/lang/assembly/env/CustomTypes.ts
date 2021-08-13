/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */
import { Codec, UInt128, UInt32 } from "as-scale-codec";

export type Balance = UInt128;
export type BlockNumber = UInt32;


const BytesCount = 32;
export class AccountId implements Codec {
  private _id: Array<u8>;

  constructor(bytes: u8[] = []) {
      this._id = new Array<u8>(BytesCount);
      memory.copy(
          this._id.dataStart,
          bytes.dataStart,
          BytesCount
      );
  }

  static from(uarr: u8[]): AccountId {
      return new AccountId(uarr);
  }

  toU8a(): u8[] {
      return this._id;
  }

  encodedLength(): i32 {
      return BytesCount;
  }

  populateFromBytes(bytes: u8[], index: i32 = 0): void {
      assert(
          bytes.length >= BytesCount,
          "Can not populate AccountType from bytes."
      );
      this._id = bytes.slice(index, index + BytesCount);
  }

  eq(other: AccountId): bool {
      return (
          memory.compare(
              this._id.dataStart,
              other.toU8a().dataStart,
              BytesCount
          ) == 0
      );
  }

  notEq(other: AccountId): bool {
      return (
          memory.compare(
              this._id.dataStart,
              other.toU8a().dataStart,
              BytesCount
          ) != 0
      );
  }

  toString(): string {
      return this._id.join("");
  }
}
