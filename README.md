![avatar](https://patract.network/images/patract-ask.png)
---
# Ask!

Ask! is a smart contract language designed based on AssemblyScript and running on [Substrate FRAME Contracts](https://substrate.dev/docs/en/knowledgebase/smart-contracts/overview#contracts-module). Ask! uses the similar way to [ink!](https://github.com/paritytech/ink) of designing the procedural macro in the form of eDSL, to write contracts by providing annotation type in [AssemblyScript](https://github.com/AssemblyScript/assemblyscript) (aka AS). This way can hide the implementation details of the contract, and reduces the difficulty of writing contract. Ask! will be similar to ink!’s existing implementation, and the final product will maintain maximum compatibility with ink!’s existing standards. The WASM and metadata files compiled by Ask! can be deployed on the Substrate chain and run normally.

> For example: ink! describe the contract's external call interface through `#[ink(constructor)]`, `#[ink(message)]`.
> 
> In Ask!, it will describe the interface through `@constructor`, `@action` or other similar annotation.

Riot Group for disscusion: [https://app.element.io/#/room/#PatractLabsDev:matrix.org](https://app.element.io/#/room/#PatractLabsDev:matrix.org)


## Overview
AS uses the asc compiler to compile TypeScript (TS) files into WebAssembly bytecode. However, asc is a general-purpose compilation tool, which cannot directly compile TS files into WASM bytecode and metadata information with smart contract structure. Although AS is only a subset of TS, there are a wide range of developers who use TS as a development language, so the cost of learning AS for these developers is very low. Therefore, we think the Ask! project has a very good application development prospect. Compared with Rust-based ink!, we believe that AS-based Ask! can effectively lower the threshold for contract developers and enrich the contract development ecosystem.

[Patract](https://patract.io/) develops local open source toolkits and one-stop cloud smart IDE, committed to provide free development toolkits and infrastructure services for the entire WASM smart contract ecosystem. We have launched 7 projects in Polkadot/Kusama Treasury, and Ask! will be our 8th project. Current proposal for this repo is [Patract's proposal for Ask! v0.1 (ink! in AssemblyScript)](https://kusama.polkassembly.io/post/398)

## Design
> TODO

## Example
> TODO

## Simple Run
Currently, Ask! has not released, thus early developers should try Ask! by following steps:

1. Clone project.

    ```bash
        $ git clone https://github.com/patractlabs/ask
    ```

2. Example contracts:

    We prepare two contracts project: `flipper`, `incrementer` in `/examples` directory. And now, we use a example to show how to use Ask!. You can create a typescript file (`*.ts`) to do following steps. The full code is in `/examples/solar` directory.

    1. Define contract storage:

        Ask! uses `@storage` to define contract storage. This part is same as `#[ink(storage)]` in ink!. In this example, we define a class `Planets` which contains 3 variables:

        ```ts
        @storage
        class Planets {
            name: string;
            radius: u32;
            isdwarf: boolean;
        }
        ```

    2. Define contract scope and callable contract function:

        Ask! use `@contract` to assign a class as a contract, then this class is a contract class. This is same as `#[ink::contract]` in ink!.

        ```ts
        @contract
        class SolarSystem {
            // ...
        }
        ```

        And same to ink!, Ask! provides `@constructor` and `@message` to annotate function in contract class, which is equivalent to `#[ink(constructor)]` and `#[ink(message)]`

        ```ts
        @contract
        class SolarSystem {
            @constructor
            default(name: string) void { /*...*/ }

            @message(mutates = false, selector = "0x0a0b0c0d")
            getRadius(): u32 { /*...*/ }
        }
        ```

    3. Compile this Ask! contract:

        1. Install compile environment

        You need to enter the **root directory** of Ask! project, then execute following command:

        ```bash
        npm install
        ```

        2. Compile

        In the root directory of Ask!, compile the contract. The file `examples/solar/solar.ts` could be replaced by your file path.

        ```bash
        ./assembly/codegen/bin/ask examples/solar/solar.ts
        ```

        After this command, you could find the expanded file `extension.ts` in `examples/solar` and the compilation targets in the directory `examples/solar/target`.

        3. Test

        You could use [Europa](https://github.com/patractlabs/europa) as a node to test the contract. More details please refers to Europa Readme.

        After running Europa, you could use [https://polkadot.js.org/apps](https://polkadot.js.org/apps) to upload contract and call contract. This process is same as ink!.