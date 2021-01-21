# 关于@Event注解

`@event`注解用来表示一个可以deposit的事件.

## 说明
* `作用范围`: 只使用于`class`前.  
* `子注解@topic`: 在注解为`@event`的class, 可以对public变量使用`@topic`注解.  
* `@topic限制`: 必须为实现了`Codec`接口的对象, 如果是基本数据类型, 由预编译器生成基本类型的Wrapper类型, 如`u8`类型会生成`UInt8`替换类型.  

## 预处理器任务
* 将`@event`的class, 增加`extends Event`的继承关系. `@event`的class, **没有其它父类**.  
* 自动生成`prepare()`方法, 该方法将topic和data注入到对应的数据列表. 参考`examples/event/event.ts`中的实现.  
* 自动生成基本数据类型的`Codec`对应类型, 如u8 -> UInt8.  
* 将`src/buildins/Event.ts`中的`Event`对象, 注入到`global`中.  
