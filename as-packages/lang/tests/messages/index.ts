/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */
import {msg, u128} from "../..";

@storage
class Notations {
    value: u128;

    @ignore
    additional: u32;
}

@contract
class MessageNotations {
    notations: Notations;

    constructor() {
        this.notations = new Notations();
    }

    @constructor
    default(init_value: u128): void {
        this.notations.value = init_value;
        this.notations.additional = 180;
    }

    @message(payable)
    payableMessage(): void {
        this.notations.value += msg.value;
    }

    @message(mutates = false)
    mutatesMessage(): u128 {
        return this.notations.value + u128.from(this.notations.additional);
    }

    @message(payable, mutates = true, selector = "0x87654321")
    comositeMessage(): void {
        this.notations.value += msg.value;
    }
}
