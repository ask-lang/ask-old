# 预编译器处理模板

## 文件说明
* `origin.ts`: 模拟由合约开发人员编写的合约
* `target.ts`: 预计由预处理器处理之后应该生成的合约样式.

## 编译说明
* 命令  
`./src/codegen/bin/asc ./examples/preprocess/origin.ts -p ./examples/preprocess/entry.ts`