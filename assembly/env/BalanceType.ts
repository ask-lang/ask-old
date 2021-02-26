/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { UInt128 } from "../deps/as-scale-codec";
import { ReturnCode } from "../primitives/alias";
import { seal_transfer } from "../seal/seal0";
import { AccountType } from "./AccountType";


// export class Balance implements Codec {}

// now T::Balance is just a UInt128,
// so we just re-export it.

export type BalanceType = UInt128;

export function SendBalance(destination: AccountType, value: BalanceType): bool {
  let valBuffer = value.toU8a();
  let ret = seal_transfer(
    destination.buffer,
    destination.length,
    valBuffer.buffer,
    valBuffer.length,
  );

  return ret === ReturnCode.Success;
}

export function TransferBalance(destination: AccountType, value: BalanceType): void {
  let status = SendBalance(destination, value);
  assert(status, "Transfer balance reverted.");
}