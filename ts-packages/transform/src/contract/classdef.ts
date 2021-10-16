import {
    ElementKind,
    ClassPrototype,
    FunctionPrototype,
    FieldPrototype,
    CommonFlags,
    ClassDeclaration,
    Range,
} from "assemblyscript";

import {
    EventParamSpec,
    EventSpec,
    TypeSpec,
    ToMetadata
} from "contract-metadata/src/index";

import { ElementUtil } from "../utils/utils";

import { ConstructorDef, FieldDef, FunctionDef , MessageFunctionDef} from "./elementdef";
import { ArrayLayout, CellLayout, CryptoHasher, FieldLayout, HashingStrategy, HashLayout, StructLayout } from "contract-metadata/src/layouts";
import { NamedTypeNodeDef } from "./typedef";
import { TypeHelper } from "../utils/typeutil";
import { TypeKindEnum } from "../enums/customtype";
import { KeySelector } from "../preprocess/selector";
import { Interpreter } from "./interpreter";

export interface Matadata {
    /**
     * Create metadata
     */
    createMetadata(): ToMetadata;
}

export class ClassInterpreter extends Interpreter {
    declaration: ClassDeclaration;
    instanceName: string;
    fields: FieldDef[] = [];
    functions: FunctionDef[] = [];
    variousPrefix = "_";
    export = "";
    lastRange: Range;
    constructorFun: FunctionDef | null = null;

    constructor(public element: ClassPrototype) {
        super(element);
        this.declaration = <ClassDeclaration>this.element.declaration;
        if (this.declaration.isAny(CommonFlags.EXPORT)) {
            this.export = "export ";
        }
        this.instanceName = this.variousPrefix + this.name.toLowerCase();
        if (this.element.constructorPrototype != null) {
            this.constructorFun = new FunctionDef(this.element.constructorPrototype);
        }
        let len = this.declaration.members.length;
        this.lastRange = this.declaration.members[len -1].range;
    }

    resolveFieldMembers(): void {
        this.element.instanceMembers &&
            this.element.instanceMembers.forEach((element, _) => {
                if (ElementUtil.isField(element)) {
                    this.fields.push(new FieldDef(<FieldPrototype>element));
                }
            });
    }

    resolveFunctionMembers(): void {
        this.element.instanceMembers &&
            this.element.instanceMembers.forEach((element, _) => {
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

/**
 * It indicate the contract interpreter
 */
export class ContractInterpreter extends ClassInterpreter {
    /**
     * The function that exported construction.
     */
    cntrFuncDefs: FunctionDef[] = [];
    /**
     * The message that exported.
     */
    msgFuncDefs: FunctionDef[] = [];
    /**
     * The store field
     */
    storeFields: FieldDef[] = [];

    constructor(clzPrototype: ClassPrototype) {
        super(clzPrototype);
        this.resolveFieldMembers();
        this.resolveContractElement();
    }

    private resolveContractElement(): void {
        this.element.instanceMembers &&
            this.element.instanceMembers.forEach((instance, _) => {
                if (ElementUtil.isCntrFuncPrototype(instance)) {
                    this.cntrFuncDefs.push(new ConstructorDef(<FunctionPrototype>instance));
                }
                if (ElementUtil.isMessageFuncPrototype(instance)) {
                    let msgFunc = new MessageFunctionDef(<FunctionPrototype>instance);
                    this.msgFuncDefs.push(msgFunc);
                }
                // ignore the field that not marked with state
                if (ElementUtil.isField(instance)) {
                    let fieldDef = new FieldDef(<FieldPrototype> instance);
                    if (!fieldDef.decorators.ignore) {
                        this.storeFields.push(fieldDef);
                    }
                }
            });
        this.resolveBaseClass(this.element);
    }

    private resolveBaseClass(classPrototype: ClassPrototype): void {
        if (classPrototype.basePrototype) {
            let basePrototype = classPrototype.basePrototype;
            basePrototype.instanceMembers &&
                basePrototype.instanceMembers.forEach((instance, _) => {
                    if (ElementUtil.isMessageFuncPrototype(instance)) {
                        let msgFunc = new MessageFunctionDef(<FunctionPrototype>instance);
                        this.msgFuncDefs.push(msgFunc);
                    }
                    if (ElementUtil.isField(instance)) {
                        let fieldDef = new FieldDef(<FieldPrototype>instance);
                        if (!fieldDef.decorators.ignore) {
                            this.storeFields.push(fieldDef);
                        }
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
        this.storeFields.forEach(item => {
            if (item.type) {
                item.type.genTypeSequence(typeNodeMap);
            }
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
        return new EventSpec(this.name, eventParams, []);
    }
}

export class StorageInterpreter extends ClassInterpreter  {
    constructor(clzPrototype: ClassPrototype) {
        super(clzPrototype);
        this.resolveFieldMembers();
    }

    createMetadata(): FieldLayout[] {
        return this.fields.filter(item => item.decorators.ignore == false)
            .map(field => this.getFiledLayout(field));
    }

    private getFiledLayout(field: FieldDef): FieldLayout {
        if (TypeHelper.isPrimitiveType(field.type.typeKind)) {
            let layout = new CellLayout(field.selector.hex, field.type.index);
            return new FieldLayout(field.name, layout);
        } else if (field.type.typeKind == TypeKindEnum.ARRAY) {
            let lenCellLayout = new CellLayout(field.selector.hex, field.type.index);
            let lenFieldLayout = new FieldLayout("len", lenCellLayout);

            let arrLayout = new ArrayLayout(field.selector.key, field.type.capacity, 1, lenCellLayout);
            let arrFiledLayout = new FieldLayout("elems", arrLayout);

            let arrStruct = new StructLayout([lenFieldLayout, arrFiledLayout]);
            return new FieldLayout(field.name, arrStruct);
        } else if (field.type.typeKind == TypeKindEnum.USER_CLASS) {
            if (field.type.plainType == "Account") {
                let lenCellLayout = new CellLayout(new KeySelector(field.selector.key + field.type.capacity).hex, field.type.index);
                let lenFieldLayout = new FieldLayout("len", lenCellLayout);
                let arrLayout = new ArrayLayout(new KeySelector(field.selector.key + ".length").hex, field.type.capacity, 1, lenCellLayout);
                let arrFiledLayout = new FieldLayout("elems", arrLayout);
                let arrStruct = new StructLayout([lenFieldLayout, arrFiledLayout]);
                return new FieldLayout(field.name, arrStruct);
            }
        } else if (field.type.typeKind == TypeKindEnum.MAP) {
            let strategy = new HashingStrategy(CryptoHasher.Blake2x256,
                field.selector.hex, "");
            let valType = field.type.typeArguments[1];
            let valLayout = new CellLayout(new KeySelector(field.selector.key + ".value").hex, valType.index);
            let valHash = new HashLayout(field.selector.hex, strategy, valLayout);
            let valFieldLayout = new FieldLayout("values", valHash);

            let keyType = field.type.typeArguments[0];
            let keyLayout = new CellLayout(new KeySelector(field.selector.key + ".key").hex, keyType.index);
            let keyHash = new HashLayout(field.selector.hex, strategy, keyLayout);
            let keyFieldLayout = new FieldLayout("values", keyHash);

            let mapLayout = new StructLayout([keyFieldLayout, valFieldLayout]);
            return new FieldLayout(field.name, mapLayout);
        }
        let layout = new CellLayout(field.selector.hex, field.type.index);
        return new FieldLayout(field.name, layout);
    }

}

export class DynamicIntercepter extends ClassInterpreter {
    constructor(clzPrototype: ClassPrototype) {
        super(clzPrototype);
        this.resolveFieldMembers();
        this.resolveFunctionMembers();
    }
}