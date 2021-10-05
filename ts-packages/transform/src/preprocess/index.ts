import Handlebars from "./handlebarsbiz";
import { Range } from "assemblyscript";
import { ContractProgram} from "../contract/contract";

import { mainTpl, storeTpl, eventTpl, dynamicTpl, codecTpl, storeFieldTpl, storeCommitTpl} from "../tpl/tpl";

export class ModifyPoint {
    range: Range;
    mode: ModifyType;
    code: string;

    constructor(range: Range, mode: ModifyType, code: string) {
        this.range = range;
        this.mode = mode;
        this.code = code;
    }
}

export enum ModifyType {
    INSERT, // INSERT
    REPLACE, // 替换
    DELETE,
    TOP,
    APPEND
}
export class SourceModifier {
    modifyPoints: ModifyPoint[] = [];
    fileExtension: Map<string, string> = new Map();
    fileExtMap: Map<string, ModifyPoint[]> = new Map();
    entryDir = "";

    public addModifyPoint(point: ModifyPoint): void {
        this.modifyPoints.push(point);
    }
 
    public genModifyFileMap(): void {
        this.modifyPoints.forEach(item => {
            let path = item.range.source.normalizedPath;
            if (this.fileExtMap.has(path)) {
                this.fileExtMap.get(path)!.push(item);
            } else {
                this.fileExtMap.set(path, [item]);
            }
        });
    }
}


// Write text (also fallback)
export function getExtCodeInfo(contractInfo: ContractProgram): SourceModifier {
    let sourceModifier = new SourceModifier();
    if (!contractInfo.contract) {
        throw Error("Not found annotation @contract that indicate contract!");
    }
    const render = Handlebars.compile(mainTpl);
    const exportMain = render(contractInfo);

    // contractInfo.contract.msgFuncDefs.forEach(item => {
    //     let msgFun = <MessageFunctionDef>item;
    //     if (msgFun.messageDecorator.mutates == "false") {
    //         let body = msgFun.bodyRange.toString();
    //         body = body.replace(/{/i, `{\n  ${CONFIG.scope}Storage.mode = ${CONFIG.scope}StoreMode.R;`);
    //         sourceModifier.addModifyPoint(new ModifyPoint(msgFun.bodyRange, ModifyType.REPLACE, body));
    //     }
    // });
    sourceModifier.addModifyPoint(new ModifyPoint(contractInfo.contract.range.source.range, ModifyType.DELETE, 'export'));
    // for (let index = 0; index < contractInfo.storages.length; index++) {
    //     let store = Handlebars.compile(storeTpl)(contractInfo.storages[index]);
    //     sourceModifier.addModifyPoint(new ModifyPoint(contractInfo.storages[index].range, ModifyType.REPLACE, store));
    // }

    let store = Handlebars.compile(storeTpl)(contractInfo.contract);
    let storeCommit = Handlebars.compile(storeCommitTpl)(contractInfo.contract);
    console.log(store + storeCommit);
    sourceModifier.addModifyPoint(new ModifyPoint(contractInfo.contract.range, ModifyType.INSERT, store + storeCommit));
    
    contractInfo.contract.fields.forEach(item => {
        let field = Handlebars.compile(storeFieldTpl)(item);
        sourceModifier.addModifyPoint(new ModifyPoint(item.range, ModifyType.REPLACE, field));
    });

    contractInfo.events.forEach(event => {
        let code = Handlebars.compile(eventTpl)(event);
        sourceModifier.addModifyPoint(new ModifyPoint(event.range, ModifyType.INSERT, code));
    });
    
    contractInfo.codecs.forEach(codec => {
        let code = Handlebars.compile(codecTpl)(codec);
        sourceModifier.addModifyPoint(new ModifyPoint(codec.range, ModifyType.REPLACE, code));
    });

    contractInfo.dynamics.forEach(dynamic => {
        let code = Handlebars.compile(dynamicTpl)(dynamic);
        sourceModifier.addModifyPoint(new ModifyPoint(dynamic.range, ModifyType.REPLACE, code));
    });
    sourceModifier.addModifyPoint(new ModifyPoint(contractInfo.contract.range, ModifyType.APPEND, exportMain));
    sourceModifier.genModifyFileMap();
    return sourceModifier;
}

export function getAbiInfo(abiInfo: ContractProgram): string {
    let metadata = JSON.stringify(abiInfo.metatdata.toMetadata(), null, 2);
    return metadata;
}
