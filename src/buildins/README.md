# Basic Types Wrapped

## 1. message
`message` is method which can be invoked by instrinsic.  
In `Ask!`, `message` is labled with annotation `@message`.

with annotation **@message([payable], [mutates], [selector=0x12345678])**  

* `payable`  : means this message can accept msg.value.
* `mutates`  : means if this message can modify states of this contract.
* `selector` : normally, selector will be genereated by compiler, but sometimes you should keep it same if you want to change message's name. so you should specific `selector` to keep your DApps from modifying.

## 2. block