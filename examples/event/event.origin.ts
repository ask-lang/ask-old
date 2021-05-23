/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { Bool, Event, u128, UInt8 } from "ask-lang";


@event
class Approved {
    @topic
    from: u128;
    @topic
    to: UInt8;

    success: bool;

    constructor(from: u128, to: UInt8, success: bool) {
        this.from = from;
        this.to = to;
        this.success = success;
    }
}

@event
class Approved2 {
    @topic
    from: UInt8;
    @topic
    to: UInt8;

    success: bool;

    constructor(from: UInt8, to: UInt8, success: bool) {
        this.from = from;
        this.to = to;
        this.success = success;
    }
}

@contract
class EventEmitter {
    constructor() {}

    @constructor
    onDeploy(): void {}

    @message
    fire(): void {
        let e: Approved = new Approved(u128.from(9), new UInt8(10), false);
    }
}
