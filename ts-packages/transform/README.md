# Transform

Compiling the `ask`-lang smart contract code to generate as normal `as` code that can be directly compiled into wasm.

## Build

```sh
yarn build
```

<!-- TODO: we need to use pure ts code and remove the dist dir -->

## Example

```sh
npx asc path/to/examples/solar/solar.ts --transform ./index.ts  --noEmit
```

Note: You need to use the `asc` under transform module for `transform`, that is `./transform/node_modules/assemblyscript/bin/asc`

It generated a normal `as` file. And then you could compile it by `asc`.

You need set `--runtime stub` for compiling `as` code to smart contract environment.

Recommanded args are:

```sh
--importMemory --initialMemory 2 --maximumMemory 16 --noExportMemory --runtime stub --use abort= -O2
```
