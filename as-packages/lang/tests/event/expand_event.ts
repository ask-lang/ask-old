
/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */
import { Event, ScaleString, UInt8 } from "../../assembly";

 @event
class EventA extends Event {

  @topic 
  topicA: u8;
  name: string;

  constructor(t: u8, n: string) {
      super();
      this.topicA = t;
      this.name = n;
  }

  protected __prepare__(): void {
      super.__prepare__();

      this.index = 0;

      this.appendTopic(new UInt8(this.topicA));

      this.appendData(new UInt8(this.topicA));
      this.appendData(new ScaleString(this.name));
  }

  emit(): void {
      this.__prepare__();
      this.__emit__();
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

  protected __prepare__(): void {
      super.__prepare__();

      this.index = 1;

      this.appendTopic(new UInt8(this.topicB));

      this.appendData(new UInt8(this.topicB));
      this.appendData(new ScaleString(this.gender));
  }

  emit(): void {
      this.__prepare__();
      this.__emit__();
  }
}

// .... more codes here