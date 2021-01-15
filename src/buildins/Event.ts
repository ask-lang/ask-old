/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { Codec } from "as-scale-codec";
import { Crypto } from "../primitives/crypto";
import { WriteBuffer } from "../primitives/writebuffer";
import { seal_deposit_event } from "../seal/seal0";

const MAX_EVENT_TOPICS = 4; // Refer to `frame/contracts/src/schedule.rs` L464

export abstract class Event {
  private static _topics: Codec[] = new Array<Codec>();
  private static _data: Codec[] = new Array<Codec>();

  private static reset(): void {
    Event._topics.length = 0;
    Event._data.length = 0;
  }



  static appendTopic<T extends Codec>(t: T): void {
    Event._topics.push(t);
  }

  static appendData<T extends Codec>(d: T): void {
    Event._data.push(d);
  }

  static emit<T extends Event>(e: T): void {
    e.prepare();

    assert(Event._topics.length <= MAX_EVENT_TOPICS, "too many topics defined.");

    let topicsData = new Array<u8>();
    for (let i = 0; i < Event._topics.length; i++) {
      let hash = Crypto.blake256(Event._topics[i]);
      topicsData.concat(hash.toU8a());
    }

    let datas = new Array<u8>();
    for (let i = 0; i < Event._data.length; i++) {
      datas.concat(Event._data[i].toU8a());
    }

    assert(Event._data.length !== 0, "invalid event defined.");

    const topicBuf = new WriteBuffer(topicsData.buffer);
    const dataBuf = new WriteBuffer(datas.buffer);

    seal_deposit_event(topicBuf.buffer, topicBuf.size, dataBuf.buffer, dataBuf.size);
    // to release allocated memory
    Event.reset();
  }

  abstract prepare(): void;
}
