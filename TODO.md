# The Todo List for ask!

To List working agend.

## DOING
* to define how to call external contract 
* to define how to resolve @event
* to generete basic struct of `metadata.json` by annotations.

## TODO
* [Mandatory] support compile source code with different version of compiler such as `pragma ask ^0.6.0;`
* [Mandatory] generate structed `metadata.json` with @message and @storage.
* [Mandatory] a contract can **extends** from another Pre defined contract, can resolve `override` methods and inherited methods correctly.
* [Mandatory]to define sub-annotations such as `@topic` , `@ignore` etc.
* [Optional] injected some variables while calling a message to `global` environment. Or some other way.
* [TBD] Can generate a callable contract by just define its `interface`.

## DONE
* Expand the @storage to desired layout.  
* Defined the generated style of @message.  
* Basic classes of `Msg` and `AccountId`
* Seal read and write logic.

## Inject to global variables
* buildins/Msg.ts  
* buildins/UIn128.ts  
* u128 from module `as-bignum`  

