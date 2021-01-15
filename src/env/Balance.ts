/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { UInt128 } from "as-scale-codec";

// export class Balance implements Codec {}

// now T::Balance is just a UInt128,
// so we just re-export it.

export type Balance = UInt128;
