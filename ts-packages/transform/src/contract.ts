import {
    ElementKind,
    ClassPrototype,
    FunctionPrototype,
    Program,
    FieldPrototype,
    Range
} from "assemblyscript";

import { ElementUtil } from "./utils";

import { Strings } from "./primitiveutil";
// import { ProgramAnalyzar } from "./analyzer";
import { DecoratorUtil, FieldDef, FunctionDef, ImportSourceDef, MessageFuctionDef, NamedTypeNodeDef } from "./contract/base";
export class ClassInterpreter {
    protected classPrototype: ClassPrototype;
    className: string;
    instanceName: string;
    range: Range;
    doc: string;
    fields: FieldDef[] = [];

    constructor(clzPrototype: ClassPrototype) {
        this.doc = DecoratorUtil.getDoc(clzPrototype.declaration);
        this.classPrototype = clzPrototype;
        this.className = clzPrototype.name;
        this.instanceName = "_" + this.className.toLowerCase();
        this.range = this.classPrototype.declaration.range;
    }

    isExtends(): boolean {
        return this.classPrototype.basePrototype != null;
    }

    resolveInstanceMembers(): void {
        this.classPrototype.instanceMembers &&
            this.classPrototype.instanceMembers.forEach((element, _) => {
                if (element.kind == ElementKind.FIELD_PROTOTYPE) {
                    this.fields.push(new FieldDef(<FieldPrototype>element));
                }
            });
    }

    setTypeIndex(typeNodeMap: Map<string, NamedTypeNodeDef>): void {
        this.fields.forEach(item => {
            if (item.type) {
                item.type.setTypeIndex(typeNodeMap);
            }
        });
    }
}

export class ContractInterpreter extends ClassInterpreter {
    name: string;
    version: string;
    cntrFuncDefs: FunctionDef[] = [];
    msgFuncDefs: FunctionDef[] = [];
    isReturnable = false;

    constructor(clzPrototype: ClassPrototype) {
        super(clzPrototype);
        this.name = Strings.lowerFirstCase(this.className);
        this.version = "1.0";
        this.instanceName = Strings.lowerFirstCase(this.className);
        this.resolveContractClass();
    }

    private resolveContractClass(): void {
        this.classPrototype.instanceMembers &&
            this.classPrototype.instanceMembers.forEach((instance, _) => {
                if (ElementUtil.isCntrFuncPrototype(instance)) {
                    this.cntrFuncDefs.push(new FunctionDef(<FunctionPrototype>instance));
                }
                if (ElementUtil.isMessageFuncPrototype(instance)) {
                    let msgFunc = new MessageFuctionDef(<FunctionPrototype>instance);
                    this.isReturnable = this.isReturnable || msgFunc.isReturnable;
                    this.msgFuncDefs.push(msgFunc);
                }
            });
        this.resolveBaseClass(this.classPrototype);
    }

    private resolveBaseClass(sonClassPrototype: ClassPrototype): void {
        if (sonClassPrototype.basePrototype) {
            let basePrototype = sonClassPrototype.basePrototype;
            basePrototype.instanceMembers &&
                basePrototype.instanceMembers.forEach((instance, _) => {
                    if (ElementUtil.isMessageFuncPrototype(instance)) {
                        let msgFunc = new MessageFuctionDef(<FunctionPrototype>instance);
                        this.isReturnable = this.isReturnable || msgFunc.isReturnable;
                        this.msgFuncDefs.push(msgFunc);
                    }
                });
            this.resolveBaseClass(basePrototype);
        }
    }

    public setTypeIndex(typeNodeMap: Map<string, NamedTypeNodeDef>): void {
        this.cntrFuncDefs.forEach(funcDef => {
            funcDef.setTypeIndex(typeNodeMap);
        });
        this.msgFuncDefs.forEach(funcDef => {
            funcDef.setTypeIndex(typeNodeMap);
        });
    }
}

export class EventInterpreter extends ClassInterpreter {

    constructor(clzPrototype: ClassPrototype) {
        super(clzPrototype);
        this.resolveInstanceMembers();
    }
}

export class StorageInterpreter extends ClassInterpreter {

    constructor(clzPrototype: ClassPrototype) {
        super(clzPrototype);
        this.resolveInstanceMembers();
    }
}

export class ContractProgram {
    program: Program;
    contract: ContractInterpreter | null = null;
    events: EventInterpreter[] = [];
    storages: StorageInterpreter[] = [];
    types: NamedTypeNodeDef[] = [];
    fields: FieldDef[] = [];
    import: ImportSourceDef;

    private typeNodeMap: Map<string, NamedTypeNodeDef> = new Map<string, NamedTypeNodeDef>();

    constructor(program: Program) {
        this.program = program;
        this.import = new ImportSourceDef(program.sources);
        this.resolve();
        this.sortStorages();
        this.getFields();
    }

    private sortStorages(): void {
        this.storages.sort((a: ClassInterpreter, b: ClassInterpreter): number => b.range.start - a.range.start);
    }

    private getFields(): void {
        this.storages.forEach(item => {
            item.fields.forEach(field => {
                this.fields.push(field);
            });
        });
    }

    private addDefaultImports(): void {
        this.import.toImportElement("FnParameters");
        this.import.toImportElement("Msg");
        this.import.toImportElement("Storage");
        this.import.toImportElement("StoreMode");
        if (this.contract && this.contract.isReturnable) {
            this.import.toImportElement("ReturnData");
        }
    }

    private resolve(): void {
        this.program.elementsByName.forEach((element, _) => {
            if (ElementUtil.isTopContractClass(element)) {
                this.contract = new ContractInterpreter(<ClassPrototype>element);
            }
            if (ElementUtil.isStoreClassPrototype(element)) {
                this.storages.push(new StorageInterpreter(<ClassPrototype>element));
            }
            if (ElementUtil.isEventClassPrototype(element)) {
                this.events.push(new EventInterpreter(<ClassPrototype>element));
            }
        });
        this.setTypeIndex();
        this.addDefaultImports();

        this.typeNodeMap.forEach((value, _) => {
            this.types.push(value);
            this.import.toImportElement(value.codecType);
        });
    }

    private setTypeIndex(): void {
        if (this.contract) {
            this.contract.setTypeIndex(this.typeNodeMap);
        }
        this.storages.forEach(storage => {
            storage.setTypeIndex(this.typeNodeMap);
        });

        this.events.forEach(event => {
            event.setTypeIndex(this.typeNodeMap);
        });
    }
}

export function getContractInfo(program: Program): ContractProgram {
    // new ProgramAnalyzar(program);
    // program.getSource
    return new ContractProgram(program);
}
