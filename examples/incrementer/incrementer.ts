/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

@storage
class Stored {
  value: u32;
}

@contract
class Incrementer {
  private stored: Stored;

  constructor() { this.stored = new Stored(); }

  @constructor
  default(initValue: u32): void {
    this.stored.value = initValue;
  }

  @message
  inc(): void {
    let v = this.stored.value;
    this.stored.value = ++v;
  }

  @message(mutates = false)
  get(): u32 {
    return this.stored.value;
  }
}
