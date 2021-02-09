/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { AccountType, BalanceType, TransferBalance } from "../env";
import { ReturnCode } from "../primitives/alias";
import { Callable } from "./Callable";
import { u128 } from "as-bignum";
import { Codec } from "../deps/as-scale-codec";
/**
 * @class AccountId
 * Class AccountId stands for an address, which should be a storagable type.
 */

const BytesCount = 32;
export class AccountId implements Codec {

  private _id: AccountType;

  constructor(bytes: u8[] = []) {
    this._id = new Array<u8>(BytesCount);
    memory.copy(changetype<usize>(this._id.buffer), changetype<usize>(bytes.buffer), BytesCount);
  }

  static from(uarr: u8[]): AccountId {
    return new AccountId(uarr);
  }

  // transfer from `contract.address` to this.account
  transfer(value: BalanceType): void {
    TransferBalance(this._id, value);
  }

  call(data: u8[], gas: u64 = 0, value: u128 = u128.Zero): u8[] {
    let callable = new Callable(this._id);
    let ret = callable.gas(gas).value(value).data(data).call();
    assert(ret == ReturnCode.Success, "call external message failed.");
    return callable.callResult();
  }

  toU8a(): u8[] {
    return this._id;
  }

  encodedLength(): i32 {
    return BytesCount;
  }

  populateFromBytes(bytes: u8[], index: i32 = 0): void {
    assert(bytes.length >= BytesCount, "Can not populate AccountType from bytes.");
    this._id = bytes.slice(index, index + BytesCount);
  }

  eq(other: AccountId): bool {
    return memory.compare(
      changetype<usize>(this._id.buffer),
      changetype<usize>(other.buffer),
      BytesCount) === 0;
  }

  notEq(other: AccountId): bool {
    return memory.compare(
      changetype<usize>(this._id.buffer),
      changetype<usize>(other.buffer),
      BytesCount) !== 0;
  }
}
