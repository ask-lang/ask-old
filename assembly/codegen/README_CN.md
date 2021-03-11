# codegen

目标: 将 annotation 展开, 生成目标可编译文件.

<!-- TODO: need to fix the usage -->

使用方式:

1. 在项目根目录下, 安装依赖: `npm install`
2. 编译示例项目: `./assembly/codegen/bin/asc  ./examples/preprocess/origin.ts -p ./examples/preprocess/pre.ts -a ./examples/preprocess/abi.json` 

状态:

1. 支持@contract 和@storage
