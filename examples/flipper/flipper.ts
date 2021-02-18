/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

@storage
class Stored {
  flag: boolean;
}

@contract
class Flipper {
  private stored: Stored;

  constructor() { this.stored = new Stored(); }

  @constructor
  default(initFlag: bool): void {
    this.stored.flag = initFlag;
  }

  @message
  flip(): void {
    const v = this.stored.flag;
    this.stored.flag = !v;
  }

  @message(mutates=false)
  get(): bool {
    return this.stored.flag;
  }
}
