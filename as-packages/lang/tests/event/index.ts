
/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */
import { Event } from "ask-lang";

 @event
class EventA extends Event {

  @topic topicA: u8;
  name: string;

  constructor(t: u8, n: string) {
      super();
      this.topicA = t;
      this.name = n;
  }
 }

@event
class EventB extends EventA {
  @topic topicB: u8;
  gender: string;
  constructor(t: u8, g: string) {
      super(t, g);
      this.topicB = t;
      this.gender = g;
  }
}
 @contract
export class EventEmitter {

    @state
    count: i8;

    constructor() { }

     @message
    triggeEventA(): void {
        let eventA = new EventA(100, "Elon");
        eventA.emit();
    }

     @message
     triggeEventB(): void {
         let eventB = new EventB(<u8>300, "M");
         eventB.emit();
     }
}
