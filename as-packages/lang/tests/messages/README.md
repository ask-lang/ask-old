# About Notation @message

This sample shows how to define a `message` in your contract.

`@message` means this function should be exported, and you can call it by a extinsic. 
It has some choices: 
* `payable`: means this message can accept value by `msg.value`. As default, messages can not accept value.
* `mutates=[true|false]`: if you set `mutates=false`, means this message can not modify `@storage` variable, if you do so, the message aborted during runtime.
As default, `mutates=true` and you can left it alone.
* `selector="0x12345678"`: if you want to define the selector of this message, you can use `selector` to specific it. and then you can change name of this function, and the selector generated in metadata.json keeps the same.
