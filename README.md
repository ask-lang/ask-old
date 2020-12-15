![avatar](https://patract.network/images/patract-ask.png)
---
# Ask!

Ask! is a smart contract language designed based on AssemblyScript and running on [Substrate FRAME Contracts](https://substrate.dev/docs/en/knowledgebase/smart-contracts/overview#contracts-module). Ask! uses the similar way to [ink!](https://github.com/paritytech/ink) of designing the procedural macro in the form of eDSL, to write contracts by providing annotation type in [AssemblyScript](https://github.com/AssemblyScript/assemblyscript) (aka AS). This way can hide the implementation details of the contract, and reduces the difficulty of writing contract. Ask! will be similar to ink!’s existing implementation, and the final product will maintain maximum compatibility with ink!’s existing standards. The WASM and metadata files compiled by Ask! can be deployed on the Substrate chain and run normally.

> For example: ink! describe the contract's external call interface through #[ink(constructor)], #[ink(message)].
> 
> In Ask!, it will describe the interface through @constructor, @action or other similar annotation.

Riot Group for disscusion: [https://app.element.io/#/room/#PatractLabsDev:matrix.org](https://app.element.io/#/room/#PatractLabsDev:matrix.org)


## Overview
AS uses the asc compiler to compile TypeScript (TS) files into WebAssembly bytecode. However, asc is a general-purpose compilation tool, which cannot directly compile TS files into WASM bytecode and metadata information with smart contract structure. Although AS is only a subset of TS, there are a wide range of developers who use TS as a development language, so the cost of learning AS for these developers is very low. Therefore, we think the Ask! project has a very good application development prospect. Compared with Rust-based ink!, we believe that AS-based Ask! can effectively lower the threshold for contract developers and enrich the contract development ecosystem.

[Patract Hub](https://patract.io/) develops local open source toolkits and one-stop cloud smart IDE, committed to provide free development toolkits and infrastructure services for the entire WASM smart contract ecosystem. We have launched 7 projects in Polkadot/Kusama Treasury, and Ask! will be our 8th project. Current proposal for this repo is [Patract Hub's proposal for Ask! v0.1 (ink! in AssemblyScript)](https://kusama.polkassembly.io/post/398)

## Design
> TODO

## Example
> TODO
