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
  value: u32;
}

@contract
class Incrementer {
  private stored: Stored;

  constructor() { this.stored = new Stored(); }

  @deployer
  onDeploy(initFlag: u32): void {
    this.stored.value = initFlag;
  }

  @message
  inc(): void {
    let v = this.stored.value;
    this.stored.value = ++v;
  }

  @message
  get(): u32 {
    return this.stored.value;
  }
}
