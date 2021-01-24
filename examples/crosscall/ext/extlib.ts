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

@contract
class ExtLib {
  constructor() { }

  @deployer
  onDeploy(): void {
  }

  @message
  addFunc(factor1: u32, factor2: u32): u32 {
    return factor1 + factor2;
  }
}
