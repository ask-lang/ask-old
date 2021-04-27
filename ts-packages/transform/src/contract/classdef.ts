import {
    ElementKind,
    ClassPrototype,
    FunctionPrototype,
    FieldPrototype,
    Range
} from "assemblyscript";

import {
    EventParamSpec,
    EventSpec,
    TypeSpec
} from "../../../contract-metadata/src/index";

import { ElementUtil } from "../utils/utils";

import { Strings } from "../utils/primitiveutil";
import { ConstructorDef, DecoratorUtil, FieldDef, FunctionDef, MessageFuctionDef, NamedTypeNodeDef } from "./elementdef";
import { CellLayout, FieldLayout } from "../../../contract-metadata/src/layouts";

export class ClassInterpreter {
    protected classPrototype: ClassPrototype;
    camelName: string;
    className: string;
    instanceName: string;
    range: Range;
    doc: string;
    fields: FieldDef[] = [];
    functions: FunctionDef[] = [];
    variousPrefix = "_";

    constructor(clzPrototype: ClassPrototype) {
        this.classPrototype = clzPrototype;
        this.range = this.classPrototype.declaration.range;
        this.doc = DecoratorUtil.getDoc(clzPrototype.declaration);
        this.className = clzPrototype.name;
        this.camelName = Strings.lowerFirstCase(this.className);
        this.instanceName = this.variousPrefix + this.className.toLowerCase();
    }

    resolveFieldsMembers(): void {
        this.classPrototype.instanceMembers &&
            this.classPrototype.instanceMembers.forEach((element, _) => {
                if (element.kind == ElementKind.FIELD_PROTOTYPE) {
                    this.fields.push(new FieldDef(<FieldPrototype>element));
                }
            });
    }

    resolveFunctionMembers(): void {
        this.classPrototype.instanceMembers &&
            this.classPrototype.instanceMembers.forEach((element, _) => {
                if (element.kind == ElementKind.FUNCTION_PROTOTYPE) {
                    this.functions.push(new FunctionDef(<FunctionPrototype>element));
                }
            });
    }

    genTypeSequence(typeNodeMap: Map<string, NamedTypeNodeDef>): void {
        this.fields.forEach(item => {
            if (item.type) {
                item.type.genTypeSequence(typeNodeMap);
            }
        });
    }
}

export class ContractInterpreter extends ClassInterpreter {
    // The first case is lower.
    version: string;
    cntrFuncDefs: FunctionDef[] = [];
    msgFuncDefs: FunctionDef[] = [];

    constructor(clzPrototype: ClassPrototype) {
        super(clzPrototype);
        this.version = "1.0";
        this.resolveContractClass();
    }

    private resolveContractClass(): void {
        this.classPrototype.instanceMembers &&
            this.classPrototype.instanceMembers.forEach((instance, _) => {
                if (ElementUtil.isCntrFuncPrototype(instance)) {
                    this.cntrFuncDefs.push(new ConstructorDef(<FunctionPrototype>instance));
                }
                if (ElementUtil.isMessageFuncPrototype(instance)) {
                    let msgFunc = new MessageFuctionDef(<FunctionPrototype>instance);
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
                        this.msgFuncDefs.push(msgFunc);
                    }
                });
            this.resolveBaseClass(basePrototype);
        }
    }

    public genTypeSequence(typeNodeMap: Map<string, NamedTypeNodeDef>): void {
        this.cntrFuncDefs.forEach(funcDef => {
            funcDef.genTypeSequence(typeNodeMap);
        });
        this.msgFuncDefs.forEach(funcDef => {
            funcDef.genTypeSequence(typeNodeMap);
        });
    }
}
export class EventInterpreter extends ClassInterpreter {
    constructor(clzPrototype: ClassPrototype) {
        super(clzPrototype);
        this.resolveFieldsMembers();
    }

    createMetadata(): EventSpec {
        let eventParams: EventParamSpec[] = [];
        this.fields.forEach(item => {
            let type = new TypeSpec(item.type.index, item.type.plainType);
            let param = new EventParamSpec(item.decorators.isTopic, type, [], item.name);
            eventParams.push(param);
        });
        return new EventSpec(this.className, eventParams, []);
    }
}

export class StorageInterpreter extends ClassInterpreter {
    // layouts: FieldLayout[] = [];
    constructor(clzPrototype: ClassPrototype) {
        super(clzPrototype);
        this.resolveFieldsMembers();
    }

    createMetadata(): FieldLayout[] {
        return this.fields.map(item => {
            let layout = new CellLayout(item.storeKey, item.type.index);
            return new FieldLayout(item.name, layout);
        });    
    }
}

export class DynamicIntercepter extends ClassInterpreter {
    constructor(clzPrototype: ClassPrototype) {
        super(clzPrototype);
        this.resolveFieldsMembers();
        this.resolveFunctionMembers();
    }
}