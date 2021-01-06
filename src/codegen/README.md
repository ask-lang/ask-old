# codegen 

目标: 将annotation展开, 生成目标可编译文件.

使用方式:
1. 在项目根目录下, 安装依赖: `npm install`
2. 编译示例项目: `./src/codegen/bin/asc ./examples/preprocess/flipper.ts -p ./examples/preprocess/pre.ts`

状态:
1. 支持@contract和@storage
