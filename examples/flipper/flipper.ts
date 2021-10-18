/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { Account } from "ask-lang";

@contract
class Flipper {
    @state flag: bool;
    @state account: Account;

    constructor() {
    }

    @constructor
    default(initFlag: bool): void {
        this.flag = initFlag;
    }

    @message
    flip(): void {
        const v = this.flag;
        this.flag = !v;
    }

    @message({"mutates": false})
    get(): bool {
        return this.flag;
    }
}
