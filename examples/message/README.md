# 关于@message注解

`@message`注解用来描述一个message方法的属性.

## 说明
* `作用范围`:   
只使用于`public`的方法前.  
* `可选参数`:
    * `payable`: 表示调用时是否可以接收`value`, 默认情况下, 一个message是`none payable`  
    * `mutates`: 表示方法是否可以改变state variable的状态. 默认为`mutates="true"`, 表示可以改变存储状态.本期, 这个标志仅用来生成metadata.json.  
    * `selector`: 指定message生成metadata.json时使用的`selector`. 如果指定了selector, 那么无论message的名字是什么, metadata.json中都使用指定的值. 否则, 使用默认计算方法生成.

## 预处理器任务
* 依据`@message`注解使用的参数(或默认),生成metadata.json中对应设置
* 对于`payable`参数, 需要在生成的入口`call`方法中, 在对应的方法分支下, 生成调用`assert(msg.notPayable(), "Can not accept value");`的逻辑, 参考`example/flipper/flipper.ts`中的实现.
* 对于`mutates`参数, 本期只要生成正确的metadata.json, 不检查方法调用栈的关系.
* 对于`selector`参数, 只需要能正确生成metadata.json.

## 其它
参考`example/message`中的写法说明
