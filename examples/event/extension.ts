import { FnParameters, Msg, Storage} from "../../as-packages/lang";
/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { Bool, UInt8, Event, Log } from "../../as-packages/lang";

// event Approved generated code
// @event
class Approved extends Event {
  from: u8;
  to: u8;
  success: bool;

  constructor(_from: u8, _to: u8, _success: bool) {
    super()
    this.from = _from;
    this.to = _to;
    this.success = _success;

    // this.prepare();
    this.emit();
  }

  // as-preprocessor should generate this method for @Event
  prepare(): void {
    this.index = 0;
    this.appendTopic(new UInt8(this.from));
    this.appendTopic(new UInt8(this.to));

    this.appendData(new UInt8(this.from));
    this.appendData(new UInt8(this.to));
    this.appendData(new Bool(this.success));
  }
}

@contract
class EventEmitter {

  constructor() { }

  @message
  fireEvent(): void {
    new Approved(9, 10, false);
  }

}
var msg: Msg = new Msg();

export function deploy(): i32 {
  let eventEmitter = new EventEmitter();

  return 0;
}

export function call(): i32 {
  const eventEmitter = new EventEmitter();
  const fireEventSelector: u8[] = [0x29,0xac,0x97,0xfd];
  if (msg.isSelector(fireEventSelector)) {
    eventEmitter.fireEvent();
  }
  return 0;
}