/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */
@contract
class Incrementer {
    @state
    value: u32;

    constructor() {
    }

    @constructor
    default(initValue: u32): void {
        this.value = initValue;
    }

    @message
    inc(): void {
        let v = this.value;
        this.value = ++v;
    }

    @message(mutates = false)
    get(): u32 {
        return this.value;
    }
}
