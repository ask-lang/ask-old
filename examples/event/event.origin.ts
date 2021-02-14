/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { Bool, UInt8 } from "as-scale-codec";
import { Event } from "../../assembly/buildins/Event";

@event
class Approved {
  @topic
  from: UInt8;
  @topic
  to: UInt8;

  success: Bool;
}

@contract
class EventEmitter {

  constructor() { }

  @constructor
  onDeploy(): void {
  }

  @message
  fire(): void {
    let e: Approved = {from: new UInt8(9), to: new UInt8(10), success: new Bool(false)};
    Event.emit(e);
  }
}
