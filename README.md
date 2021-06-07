# Ask!

<span style="display:block;text-align:center">![Ask!](./assets/Ask.svg)</span>

Ask! is a smart contract language designed based on AssemblyScript and running on [Substrate FRAME Contracts](https://substrate.dev/docs/en/knowledgebase/smart-contracts/overview#contracts-module). Ask! uses the similar way to [ink!](https://github.com/paritytech/ink) of designing the procedural macro in the form of eDSL, to write contracts by providing annotation type in [AssemblyScript](https://github.com/AssemblyScript/assemblyscript) (aka AS). This way can hide the implementation details of the contract, and reduces the difficulty of writing contract. Ask! will be similar to ink!’s existing implementation, and the final product will maintain maximum compatibility with ink!’s existing standards. The WASM and metadata files compiled by Ask! can be deployed on the Substrate chain and run normally.

> For example: ink! describe the contract's external call interface through `#[ink(constructor)]`, `#[ink(message)]`.
>
> In Ask!, it will describe the interface through `@constructor`, `@message` or other similar annotation.

Riot Group for disscusion: [https://app.element.io/#/room/#PatractLabsDev:matrix.org](https://app.element.io/#/room/#PatractLabsDev:matrix.org)

## Overview

Although AS is a new language that uses TS syntax, there are a wide range of developers who use TS as a development language, so the cost of learning AS for these developers is very low. Therefore, we think the Ask! project has a very good application development prospect. Compared with Rust-based ink!, we believe that AS-based Ask! can effectively lower the threshold for contract developers and enrich the contract development ecosystem.

Current proposal for this repo is [Patract's proposal for Ask! v0.2](https://kusama.polkassembly.io/treasury/81), and the report is [Post #639](https://kusama.polkassembly.io/post/639)

## Example

We have some examples under the examples directory. See [examples/readme](./examples/README.md).

## Usage

See our [document](https://substrate-contracts-book-patract.vercel.app/ask/introduction.html)
