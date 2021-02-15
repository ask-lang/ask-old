/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

/*
 * This is the contract template,
 * which will be processed by Preprocessor,
 * to generate metadata.json file and
 * the compilable target contract file.
 */

@storage
class Stored {
  flag: boolean;
}

@contract
class Flipper {
  // @storage
  private stored: Stored;

  constructor() { this.stored = new Stored(); }

  @constructor
  onDeploy(initFlag: bool): void {
    this.stored.flag = initFlag;
  }

  @message
  flip(): void {
    // a normal none payable message
    const v = this.stored.flag;
    this.stored.flag = !v;
  }

  @message(mutates=false)
  get(): bool {
    // a message can not modify state variables.
    return this.stored.flag;
  }

  @message(payable)
  pay(): void {
    // a method can receive value
  }

  @message(selector="0xfedc03f6")
  specific(): void {
    // method with unchanged selector in metadata.json
  }
}
