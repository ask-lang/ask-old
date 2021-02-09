/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { UInt128 } from "../deps/as-scale-codec";
import { ReturnCode } from "../primitives/alias";
import { WriteBuffer } from "../primitives/writebuffer";
import { seal_transfer } from "../seal/seal0";
import { AccountType } from "./AccountType";


// export class Balance implements Codec {}

// now T::Balance is just a UInt128,
// so we just re-export it.

export type BalanceType = UInt128;

export function SendBalance(destination: AccountType, value: BalanceType): bool {
  let destBuffer = new WriteBuffer(destination.buffer);
  let valBuffer = new WriteBuffer(value.toU8a().buffer);

  let ret = seal_transfer(
    destBuffer.buffer,
    destBuffer.size,
    valBuffer.buffer,
    valBuffer.size
  );

  return ret === ReturnCode.Success;
}

export function TransferBalance(destination: AccountType, value: BalanceType): void {
  let status = SendBalance(destination, value);
  assert(status, "Transfer balance reverted.");
}