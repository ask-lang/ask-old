import {
    ElementKind,
    ClassPrototype,
    FunctionPrototype,
    FieldPrototype,
    Range,
    CommonFlags,
    ClassDeclaration
} from "assemblyscript";

import {
    EventParamSpec,
    EventSpec,
    TypeSpec,
    ToMetadata
} from "contract-metadata/src/index";

import { ElementUtil, DecoratorUtil } from "../utils/utils";

import { Strings } from "../utils/primitiveutil";
import { ConstructorDef, FieldDef, FunctionDef, MessageFunctionDef} from "./elementdef";
import { ArrayLayout, CellLayout, FieldLayout, StructLayout } from "contract-metadata/src/layouts";
import { NamedTypeNodeDef } from "./typedef";
import { TypeHelper } from "../utils/typeutil";
import { TypeKindEnum } from "../enums/customtype";
import { KeySelector } from "../preprocess/selector";

export interface Matadata {
    /**
     * Create metadata
     */
    createMetadata(): ToMetadata;
}

export class ClassInterpreter {
    classPrototype: ClassPrototype;
    declaration: ClassDeclaration;
    camelName: string;
    className: string;
    instanceName: string;
    range: Range;
    doc: string[];
    fields: FieldDef[] = [];
    functions: FunctionDef[] = [];
    variousPrefix = "_";
    export = "";
    constructorFun: FunctionDef | null = null;

    constructor(clzPrototype: ClassPrototype) {
        this.classPrototype = clzPrototype;
        this.declaration = <ClassDeclaration>this.classPrototype.declaration;
        this.range = this.declaration.range;
        if (this.declaration.isAny(CommonFlags.EXPORT)) {
            this.export = "export ";
        }
        this.doc = DecoratorUtil.getDoc(this.declaration);
        this.className = clzPrototype.name;
        this.camelName = Strings.lowerFirstCase(this.className);
        this.instanceName = this.variousPrefix + this.className.toLowerCase();
        if (this.classPrototype.constructorPrototype != null) {
            this.constructorFun = new FunctionDef(this.classPrototype.constructorPrototype);
        }
    }

    resolveFieldMembers(): void {
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
                    let func = new FunctionDef(<FunctionPrototype>element);
                    if (!func.isConstructor) {
                        this.functions.push(func);
                    } else {
                        this.constructorFun = func;
                    }
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
        this.resolveFieldMembers();
        this.resolveContractClass();
    }

    private resolveContractClass(): void {
        this.classPrototype.instanceMembers &&
            this.classPrototype.instanceMembers.forEach((instance, _) => {
                if (ElementUtil.isCntrFuncPrototype(instance)) {
                    this.cntrFuncDefs.push(new ConstructorDef(<FunctionPrototype>instance));
                }
                if (ElementUtil.isMessageFuncPrototype(instance)) {
                    let msgFunc = new MessageFunctionDef(<FunctionPrototype>instance);
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
                        let msgFunc = new MessageFunctionDef(<FunctionPrototype>instance);
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
export class EventInterpreter extends ClassInterpreter implements Matadata {
    index = 0;
    constructor(clzPrototype: ClassPrototype) {
        super(clzPrototype);
        this.resolveFieldMembers();
        this.resolveFunctionMembers();
    }

    createMetadata(): EventSpec {
        let eventParams: EventParamSpec[] = [];
        this.fields.forEach(item => {
            let type = new TypeSpec(item.type.index, item.type.plainType);
            let param = new EventParamSpec(item.decorators.isTopic, type.toMetadata(), item.doc, item.name);
            eventParams.push(param);
        });
        return new EventSpec(this.className, eventParams, []);
    }
}

export class StorageInterpreter extends ClassInterpreter  {
    constructor(clzPrototype: ClassPrototype) {
        super(clzPrototype);
        this.resolveFieldMembers();
    }

    createMetadata(): FieldLayout[] {
        return this.fields.filter(item => item.decorators.isIgnore == false).map(field => {
            if (TypeHelper.isPrimitiveType(field.type.typeKind)) {
                let layout = new CellLayout(field.selector.hex, field.type.index);
                return new FieldLayout(field.name, layout);
            } else if (field.type.typeKind == TypeKindEnum.ARRAY) {
                let argu = field.type.typeArguments[0];
                let lenCellLayout = new CellLayout(field.selector.hex, field.type.index);
                let lenFieldLayout = new FieldLayout("len", lenCellLayout);

                let arrLayout = new ArrayLayout(field.selector.key, field.type.capacity, 1, lenCellLayout);
                let arrFiledLayout = new FieldLayout("elems", arrLayout);

                let arrStruct = new StructLayout([lenFieldLayout, arrFiledLayout]);
                return new FieldLayout(field.name, arrStruct);
            } 
            let layout = new CellLayout(field.selector.hex, field.type.index);
            return new FieldLayout(field.name, layout);
        });
    }
}

export class DynamicIntercepter extends ClassInterpreter {
    constructor(clzPrototype: ClassPrototype) {
        super(clzPrototype);
        this.resolveFieldMembers();
        this.resolveFunctionMembers();
    }
}