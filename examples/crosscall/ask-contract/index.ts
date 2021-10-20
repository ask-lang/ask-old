import { AccountId } from "ask-lang";
import { Libadd } from "./dynamic";


@contract
class LibaddCaller {

  constructor() {}

  @constructor
  default(): void {}

  @message({"mutatus": false})
  callAddFromExternal(outAddress: AccountId, a: i32, b: i32): i32 {
    let outContract = new Libadd(outAddress);
    let val = outContract.add(a, b);
    return val;
  }
}
