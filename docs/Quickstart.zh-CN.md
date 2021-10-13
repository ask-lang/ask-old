# Ask! 编写合约快速入门

Ask!是基于[AssemblyScript](https://www.assemblyscript.org/)开发的, AssemblyScript是以TypeScript作为编程语言, 如果你还不是很了解的话, 那你需要先学习[TypeScript](https://www.typescriptlang.org/)相关知识, 然后再学习[AssemblyScript编程](https://www.assemblyscript.org/quick-start.html)相关的内容. 

## 运行环境要求
Ask!运行依赖于Node.js和npm, 请先安装Node.js及配套的npm:
* node.js >= v14.17.0
* npm >=6.14.13

## 安装依赖

`patractlabs-ask-cli`是Ask!的命令行管理工具, 用来管理合约编译的生命周期.  
以下我们使用`ask-cli`来指代`patractlabs-ask-cli`.  

## ask-cli的基本用法
在本节中, 我们将描述如何使用`ask-cli`工具, 使用Ask!编写合约.  
我们将ask-cli安装在项目里面.

### 建立工程
要建立并初始化一个Ask!工程, 需要新建一个目录, 并在这个目录中调用`init`命令. `init`命令将会检查Ask!和各依赖项的最新版本, 并通过npm将它们下载到本地:

```bash
$ mkdir flipper
$ cd flipper
$ npm init -y
$ npm install patractlabs-ask-cli
$ npx ask-cli init
```

项目初始化成功之后, 将会在flipper/目录下生成如下的目录结构:
```text
.
├── contracts
├── node_modules
└── package.json
```

### 编写flipper合约
接下来我们新建一个文件`contracts/flipper.ts`, 并编辑它的内容如下:  
```typescript
@contract
class Flipper {
    @state flag: bool;

    constructor() {
    }

    @constructor
    default(initFlag: bool): void {
        this.flag = initFlag;
    }

    @message
    flip(): void {
        const v = this.flag;
        this.flag = !v;
    }

    @message({"mutates": false})
    get(): bool {
        return this.flag;
    }
}

```
我们将在后续的章节中, 详细介绍代码中各部分的意义.  

### 编译合约 
合约编写完成之后, 可以使用`ask-cli`来编译指定的合约文件:  
`npx ask-cli compile contracts/flipper.ts`  

编译成功之后, 会在项目的根目录下, 生成一个新的文件夹`build`, 并且生成最终部署时需要用到的文件: `flipper.wasm`, `metadata.json`.  

默认情况下, `compile`命令使用`--release`模式进行编译. 如果需要生成`.wast`文件, 那么可以使用`npx ask-cli compile --debug contracts/flipper.ts`命令进行编译. 在`debug`模式下, 将会在`wasm`文件中插入调试需要的头文件信息. 关于`--debug`模式的详细信息, 可以参考AssemblyScript的[debug编译选项](https://www.assemblyscript.org/compiler.html#command-line-options).  

### 部署和调用合约方法
我们使用[Europa](https://github.com/patractlabs/europa)沙盒环境中部署和测试合约功能, 前端使用[polkadot-js](https://github.com/polkadot-js/apps)作为交互界面.  
测试步骤如下:  
1. 首先我们按照`Europa`和`plokadot-js`的说明, 启动节点和服务.  

2. 在`polkadot-js`的合约界面中, 上传`build/`下的`metadata.json`和`flipper.wasm`文件.  

3. 部署已经上传的合约, 调用`default`方法设置flag的初始值.  

4. 调用`flip`, `get`方法, 查看合约执行效果.  


## Ask!合约的组成结构
Ask!合约使用注解的方式, 封装合约中各组件的功能和使用方式.  

### Ask!中的注解和注解的选项
Ask!合约中, 最常用到的几个注解有以下几个:  
1. @contract  
这个注解作用于`class`级别的对象上, 表示这个合约是一个contract. 只有文件中包含了`@contract`标注的class, 才能被`ask-cli compile`命令编译.  

2. @state  
这个注解作用于`@contract`标注的class的成员变量, 表示这个成员变量是一个状态变量(state variable), 它有一个`lazy`选项.  
`@state`的完整定义方式为`@state({"lazy": true})`或者`@state({"lazy": false})`. `{"lazy": true}`是默认值, 可以省略.  
lazy的意义是, 在一次message的调用过程中, 每一次对状态变量的修改, 是否会立即同步到链上.  
如果`{"lazy": true}`, 表示将采用延迟模式保存数据, 只有在message执行完成之后, 才会将最终状态变量的值写入到链上;  
而`{"lazy": false}`表示每次修改状态变量的值, 都会立即写入到链上.

3. @message  
这个注解作用于`@contract`标注的class的成员函数, 表示这个方法可以被外部调用(external message).  
`@message`有几个参数可以设定, 用来控制外部调用时的行为.它的完整定义是这样的:  `@message({"payable": false, "mutates": true, "selector": "0xabcdef12"})`  
下面我们分别描述这些选项的意义:
    * `payable`选项表示调用这个方法时, 是否可以接受value, 它的值可以是`true`或`false`, 默认为false.  
    * `mutates`选项表示方法是否能够改变状态变量的值. 它的值可以是`true`或`false`, 默认值为true, 并且可以省略. 如果需要控制这个方法是一个view方法的话, 可以将mutates的值设置为false.  
    * `selector`选项用于表明这个方法使用固定的值作为selector, 不用根据真实的方法名计算生成. 这样如果需要修改合约中方法的名字时, 外部调用的逻辑不用随着一起改变. 它的值可以指定为形如`0x02a6e0d5`的字符串.  

4. @constructor  
这个注解作用于`@contract`标注的class的成员函数, 表示这是一个构造方法. 它将生成`metadata.json`中`spec.constructors`字段的内容.

5. @event  
这个注解作用于一个派生自`Event`的class, 表示这个类是一个事件. 
    * @topic  
这个注解作用于`@event`标的class的成员变量. 所有被标注的@topic的成员变量的数量, 不能超过4个. 它的作用与solidity中`indexed`的作用类似.  

6. @dynamic  
这个注解作用于class上, 被标记为dynamic的类, ask-cli会为它的每一个方法生成远程调用的逻辑, 开发者无须为dynamic类的方法编写实现逻辑.  
关于@dynamic的使用, 参考源码中`examples/crosscall/ask-contract/dynamic.ts`.

7. @doc  
这是一个辅助注解符, 为@message, @state等注解提供注释. `@doc`提供的注释, 会为metadata.json中对应的`doc`字段生成内容. 如果无需提供注释, 则这个注解可以省略.  

### 基本组成

在Ask!的环境下, 依托于上述注解, 一个合约的完整结构大概是这样的:
```typescript
@contract
class HelloAsk {
    @state greeting: string;

    @constructor
    @doc({"desc": "this is a constructor method"}) 
    default(msg: string = "hello ask") {
        this.greeting = msg;
    }

    @message({mutates: false})
    @doc({"desc": "to get greeting message"})
    getGreeting(): string {
        return this.greeting;
    }

    @message
    setGreeting(msg: string): void {
        this.greeting = msg;
    }
}
```

### 事件注解符@event

事件是Ask!中通过`@event`注解的类.  

#### 定义一个事件类
```typescript
@event
class Approved extends Event {
    @topic who: Account;
    amount: u128;

    constructor(w: Account, a: u128) {
        super();
        this.who = w;
        this.amount = a;
    }
}
```
上面的示例代码, 定义了一个事件`Approved`, 它定义了两个成员`who`和`amount`. 其中`who`是一个`@topic`, 它与solidity事件中的`indexed`关键字作用一样. 到目前为止, 在一个事件class中, `@topic`的数量不超过4个.  

#### 发送事件
当事件类定义好之后, 你可以在需要的地方实例化它, 然后调用`emit`方法, 将事件发送出去.  
```typescript
@contract
class ERC20 {
    @message
    approve(spender: Account, amount: u128): bool {
        // .....
        (new Approved(spender, amount)).emit();
    return true;
  }
}
```

#### 事件类继承
事件类和其它普通的类, 也支持继承, 只是继承链上的类, 都必须是`@event`. 特别要注意的是, 无论继承链有多长, 它的最终级父类必须是`Event`, 同时, 所有继承链上的事件类的`@topic`的数量的和, 不能超过4个.  
```typescript
@event
class AnotherApproved extends Approved {
    @topic owner: Account;

    constructor(owner: Account, spender: Account, amount: u128) {
        super(spender, amount);
        this.owner = owner;
    }
}

@contract
class ERC20 {
    @message
    approve(spender: Account, amount: u128): bool {
        // .....
        (new AnotherApproved(msg.sender, spender, amount)).emit();
    return true;
  }
}
```

### 合约继承
Ask!支持合约之间继承, 即: 具有@contract注解的合约类, 可以像普通类一样产生继承关系.  

相比较于普通类的继承, 合约类的继承主要是为继承链上的每一个合约的`@message`方法, 在metadata.json中生成入口. 在为具有继承关系的合约生成metadata.json的过程中, 将遵循以下原则:  
* 如果子类和父类中声明了名字相同的@message方法, 将只导出子类的@message方法.  
* 只导出子类的@constructor方法, 如果子类中未声明@constructor方法, 那么metadata.json中不会导出@constractor方法, 即使父类中声明了@constructor方法.  

请参考`examples/erc20`了解合约继承的使用方法.  

### 使用@dynamic声明外部合约接口进行跨合约调用
`@dynamic`注解用来描述一个合约可供外部调用的message信息. 其它合约可以通过@dynamic声明, 与满足该声明的合约进行跨合约交互. 在语义上, `@dynamic`与solidity语言中`interface`声明的接口功能类似.  
需要注意的是, `@dynamic`注解作用于class上面, 受限于`patractlabs-ask-transform`的功能, 对于@dynamic中声明的方法, 需要有完整的函数体. 如:  
```typescript
@dynamic
export class Libadd {

    add(a: i32, b: i32): i32 { return 0; }
}
```
其中`add`方法的函数体和`return 0;`部分不可以省略. 函数体中也无须其它逻辑, 只要通满足编译器的语法检查即可.

关于使用@dynamic进行跨合约调用的示例, 请参考`examples/crosscall`示例.

## Ask!常用组件说明
### Account
`Account`类是`AccountId`的封装类. 它可以表示一个EOA地址, 也可以表示一个合约地址.  
它包括以下几个重要的属性和方法:  
* `Account.Null` : 这是一个值为`0`的地址, 它的值类似于solidity中的`address(0)`.  
* `Account.Self` : 代表当前合约的地址, 类似于solidity中的`address(this)`.  
* `transfer(value: Balance): void` : 这个方法用于本币转账操作, 即从`Account.Self`账号的余额, 向这个账号的地址转账.  
* `call(data: u8[], gas: u64 = 0, value: u128 = u128.Zero): u8[]` : 用于调用外部合约的方法. 参考上一节中关于**跨合约调用**的部分.  

### Msg
`Msg`类封装了一次调用过程中附带的数据和信息. Ask!内部具有一个全局变量`msg`, 用于获取相关信息:  
* `msg.value`  : 一次调用中附带的value, `Balance`类型的数据.
* `msg.sender` : 一次调用的发起人账号, `Account`类型的数据.
* `msg.sig`    : 一次调用的方法的签名, `u8[]`类型的数据.
* `msg.data`   : 一次调用的方法的参数, 已经被序列化为`u8[]`类型.

### Block
`Block`类封装了两个常用的系统参数. Ask!内部导出了一个全局变量`block`, 用于获取相关信息:  
* `block.number` : 当前的块高.
* `block.timestamp` : 当前的时间截.

### SpreadStorableArray/PackedStorableArray和SpreadStorableMap/PackedStorableMap
`SpreadStorableArray`, `PackedStorableArray`, `SpreadStorableMap`, `PackedStorableMap` 这四个类是用来存储集合类型的数据Array和Map. 但是在实现的细节上, 它们有一些区别.  
名字中含有`Spread`的, 表示每一个存储的元素, 都会有一个独立的存储位置, 每次存取操作, 只操作这个元素本身; 而`Packed`则表示这个集合中所有的数据会被打包存储到同一个位置, 每次需要修改其中一个元素的时候, 都需要存取所有的元素, 所以它们适用于数据比较少的场景.

## 自定义Ask!环境变量类型
基于Substrate开发的链, 它的FRAME中定义的环境变量类型, 主要是`Hash` `AccountId` `BlockNumber` `Balance`, 它们在Ask!中的定义如下:
```typescript
type Balance = UInt128;
type BlockNumber = UInt32;
type AccountId = Array<u8>(32);
type Hash = Array<u8>(32);
```

这些环境变量, 均实现了接口`Codec`, 用来序列化和反序列化数据.  

如果需要重新定义它们的数据类型, 只需要在`lang/assembly/env/CustomTypes.ts`中重新按照您的要求实现它们即可. 需要注意的是, **无论你将它们定义为何种具体数据类型, 它们都需要实现Codec接口**, 否则将无法工作.
