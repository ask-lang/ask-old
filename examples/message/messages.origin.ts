/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

@contract
class MessageContract {
  @constructor
  onDeploy() {

  }

  @message
  defaultMessage() {

  }

  @message(payable)
  payableMessage() {

  }

  @message(mutates="false")
  mutatesMessage() {

  }

  @message(selector="0x12345678")
  slectorMessage() {

  }

  @message(payable, mutates, selector="0x87654321")
  comositeMessage() {

  }

}