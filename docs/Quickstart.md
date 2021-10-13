# Ask! Quick Start for Writing Contracts

Ask! is developed based on [AssemblyScript](https://www.assemblyscript.org/), AssemblyScript uses TypeScript as the programming language, if you don’t know it well, then you need to learn [TypeScript](https:/ /www.typescriptlang.org/) related knowledge, and then learn [AssemblyScript programming](https://www.assemblyscript.org/quick-start.html) related content.

## Operating environment requirements
Ask! depends on Node.js and npm to run, please install Node.js and supporting npm first:
* node.js >= v14.17.0
* npm >=6.14.13

## Installation dependencies

`patractlabs-ask-cli` is Ask!'s command line management tool, used to manage the life cycle of contract compilation.
Below we use `ask-cli` to refer to `patractlabs-ask-cli`.

## Basic usage of ask-cli
In this section, we will describe how to use the `ask-cli` tool to write contracts using Ask!.
We install ask-cli in the project.

### Build the project
To create and initialize an Ask! project, you need to create a new directory and call the `init` command in this directory. The `init` command will check the latest version of Ask! and each dependency, and download them to the local through npm :

```bash
$ mkdir flipper
$ cd flipper
$ npm init -y
$ npm install patractlabs-ask-cli
$ npx ask-cli init
```

After the project is successfully initialized, the following directory structure will be generated in the flipper/ directory:
```text
.
├── contracts
├── node_modules
└── package.json
```

### Write flipper contract
Next, we create a new file `contracts/flipper.ts`, and edit its content as follows:
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
We will introduce the meaning of each part of the code in detail in subsequent chapters.

### Compile the contract
After the contract is written, you can use `ask-cli` to compile the specified contract file:
`npx ask-cli compile contracts/flipper.ts`

After the compilation is successful, a new folder `build` will be generated in the root directory of the project, and the files needed for the final deployment are generated: `flipper.wasm`, `metadata.json`.

By default, the `compile` command uses the `--release` mode to compile. If you need to generate a `.wast` file, you can use the `npx ask-cli compile --debug contracts/flipper.ts` command to compile. In the `debug` mode, the header file information needed for debugging will be inserted into the `wasm` file. For more information about the `--debug` mode, please refer to [debug compilation option](https://www.assemblyscript) of AssemblyScript .org/compiler.html#command-line-options).

### Deploy and call contract methods
We use [Europa](https://github.com/patractlabs/europa) to deploy and test contract functions in the sandbox environment, and use [polkadot-js](https://github.com/polkadot-js/apps) on the front end As an interactive interface.
The test steps are as follows:
1. First, we follow the instructions of `Europa` and `plokadot-js` to start nodes and services.

2. In the contract interface of `polkadot-js`, upload the `metadata.json` and `flipper.wasm` files under `build/`.

3. Deploy the uploaded contract and call the `default` method to set the initial value of the flag.

4. Call the `flip`, `get` methods to view the contract execution effect.


## Ask! The structure of the contract
The Ask! contract uses annotations to encapsulate the functions and usage of each component in the contract.

### Comments and comment options in Ask!
In the Ask! contract, the most commonly used annotations are as follows:
1. @contract
This annotation acts on objects at the `class` level, indicating that this contract is a contract. Only the file containing the class marked with `@contract` can it be compiled by the `ask-cli compile` command.

2. @state
This annotation acts on the member variable of the class marked by `@contract`, indicating that this member variable is a state variable, and it has a `lazy` option.
The complete definition of `@state` is `@state({"lazy": true})` or `@state({"lazy": false})`. `{"lazy": true}` is the default value, Can be omitted.
The meaning of lazy is, in the process of a message call, every modification of the state variable will be immediately synchronized to the chain.
If `{"lazy": true}`, it means that the data will be saved in a delayed mode, and the value of the final state variable will be written to the chain only after the execution of the message is completed;
And `{"lazy": false}` means that every time the value of the state variable is modified, it will be written to the chain immediately.

3. @message
This annotation acts on the member functions of the class marked by `@contract`, indicating that this method can be called externally (external message).
`@message` has several parameters that can be set to control the behavior of external calls. Its complete definition is like this: `@message({"payable": false, "mutates": true, "selector": "0xabcdef12"})`
Below we describe the meaning of these options:
    * The `payable` option indicates whether the value can be accepted when calling this method, its value can be `true` or `false`, and the default is false.
    * The `mutates` option indicates whether the method can change the value of the state variable. Its value can be `true` or `false`, the default value is true, and can be omitted. If you need to control this method to be a view method, you can change The value of mutates is set to false.
    * The `selector` option is used to indicate that this method uses a fixed value as the selector, and does not need to be calculated and generated based on the actual method name. In this way, if the name of the method in the contract needs to be modified, the logic of the external call does not need to be changed along with it. Its value It can be specified as a string of the form `0x02a6e0d5`.

4. @constructor
This annotation acts on the member function of the class marked by `@contract`, indicating that this is a construction method. It will generate the content of the `spec.constructors` field in `metadata.json`.

5. @event
This annotation applies to a class derived from `Event`, indicating that this class is an event.
    * @topic
This annotation is applied to the member variables of the class of the target of `@event`. The number of all marked @topic member variables cannot exceed 4. Its function is similar to the function of `indexed` in solidity.

6. @dynamic
This annotation is applied to the class, the class marked as dynamic, ask-cli will generate remote call logic for each of its methods, and the developer does not need to write the implementation logic for the method of the dynamic class.
For the use of @dynamic, refer to `examples/crosscall/ask-contract/dynamic.ts` in the source code.

7. @doc
This is an auxiliary annotation that provides annotations for @message, @state and other annotations. The annotation provided by `@doc` will generate content for the corresponding `doc` field in metadata.json. If no annotation is required, this annotation can be used Omitted.

### basic component

In the environment of Ask!, relying on the above annotations, the complete structure of a contract is roughly like this:
```typescript
@contract
class HelloAsk {
    @state greeting: string;

    @constructor
    @doc({"desc": "this is a constructor method"})
    default(msg: string = "hello ask") {
        this.greeting = msg;
    }

    @message({"mutates": false})
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

### Event annotation @event

Event is the class annotated by `@event` in Ask!.

#### Define an event class
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
The sample code above defines an event `Approved`, which defines two members `who` and `amount`. Among them, `who` is a `@topic`, which functions with the `indexed` keyword in the solidity event Same. So far, in an event class, the number of `@topic` does not exceed 4.

#### Send event
After the event class is defined, you can instantiate it where needed, and then call the `emit` method to send the event.
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

#### Event class inheritance
Event classes and other ordinary classes also support inheritance, but the classes on the inheritance chain must be `@event`. In particular, it should be noted that no matter how long the inheritance chain is, its final parent class must be `Event `At the same time, the sum of the number of `@topic` of all event classes on the inheritance chain cannot exceed 4.
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

### Contract inheritance
Ask! supports inheritance between contracts, that is: contract classes with @contract annotations can have inheritance relationships like ordinary classes.

Compared with the inheritance of ordinary classes, the inheritance of contract classes is mainly to generate the entry in metadata.json for the `@message` method of each contract on the inheritance chain. In the process of generating metadata.json for contracts with inheritance relationships In the process, the following principles will be followed:
* If the @message method with the same name is declared in the subclass and the parent class, only the @message method of the subclass will be exported.
* Only export the @constructor method of the subclass. If the @constructor method is not declared in the subclass, then the @constractor method will not be exported in metadata.json, even if the @constructor method is declared in the parent class.

Please refer to `examples/erc20` to understand how to use contract inheritance.

### Use @dynamic to declare external contract interfaces for cross-contract calls
The `@dynamic` annotation is used to describe the message information of a contract that can be called externally. Other contracts can interact with the contract that meets the statement through the @dynamic statement. Semantically, `@dynamic` and the solidity language` The interface function declared by interface` is similar.
It should be noted that the `@dynamic` annotation acts on the class and is limited by the function of `patractlabs-ask-transform`. For the method declared in @dynamic, a complete function body is required. For example:
```typescript
@dynamic
export class Libadd {

    add(a: i32, b: i32): i32 {return 0;}
}
```
The function body of the `add` method and the `return 0;` part cannot be omitted. There is no other logic in the function body, as long as the syntax check of the compiler is satisfied.

For an example of using @dynamic to make cross-contract calls, please refer to the `examples/crosscall` example.

## Ask! Common component description
### Account
The `Account` class is an encapsulation class of `AccountId`. It can represent an EOA address or a contract address.
It includes the following important properties and methods:
* `Account.Null`: This is an address with a value of `0`, and its value is similar to `address(0)` in solidity.
* `Account.Self`: Represents the address of the current contract, similar to `address(this)` in solidity.
* `transfer(value: Balance): void`: This method is used for local currency transfer operations, that is, transfer from the balance of the account of `Account.Self` to the address of this account.
* `call(data: u8[], gas: u64 = 0, value: u128 = u128.Zero): u8[]`: method used to call external contracts. Refer to the previous section about **Cross-Contract Calls* *part.

### Msg
The `Msg` class encapsulates the data and information attached to a call. Ask! has a global variable `msg` inside, which is used to obtain relevant information:
* `msg.value`: The value attached in one call, the data of type `Balance`.
* `msg.sender`: The initiator account of a call, `Account` type data.
* `msg.sig`: The signature of the method called once, the data of type `u8[]`.
* `msg.data`: The parameters of the method called once, which have been serialized as `u8[]` type.

### Block
The `Block` class encapsulates two commonly used system parameters. Ask! internally exports a global variable `block` to obtain relevant information:
* `block.number`: The current block height.
* `block.timestamp`: The current time cutoff.

### SpreadStorableArray/PackedStorableArray and SpreadStorableMap/PackedStorableMap
`SpreadStorableArray`, `PackedStorableArray`, `SpreadStorableMap`, `PackedStorableMap` These four classes are used to store collection type data Array and Map. But in the implementation details, they have some differences.
The name contains `Spread`, which means that each stored element has an independent storage location, and each access operation only operates on the element itself; while `Packed` means that all the data in this collection will be packed Stored to the same location, every time you need to modify one of the elements, you need to access all the elements, so they are suitable for scenarios with less data.

## Custom Ask! Environment Variable Type
Based on the chain developed by Substrate, the type of environment variables defined in its FRAME are mainly `Hash` `AccountId` `BlockNumber` `Balance`, and they are defined in Ask! as follows:
```typescript
type Balance = UInt128;
type BlockNumber = UInt32;
type AccountId = Array<u8>(32);
type Hash = Array<u8>(32);
```

These environment variables all implement the interface `Codec`, which is used to serialize and deserialize data.

If you need to redefine their data types, you only need to re-implement them according to your requirements in `lang/assembly/env/CustomTypes.ts`. It should be noted that **no matter what specific data you define them Type, they all need to implement the Codec interface**, otherwise they will not work.