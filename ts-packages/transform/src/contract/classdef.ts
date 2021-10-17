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
import { NamedTypeNodeDef } from "./typedef";
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
    varPrefix = "_";
    export = "";
    lastRange: Range;
    constructorFunc: FunctionDef | null = null;

    constructor(public element: ClassPrototype) {
        super(element);
        this.declaration = <ClassDeclaration>this.element.declaration;
        if (this.declaration.isAny(CommonFlags.EXPORT)) {
            this.export = "export ";
        }
        this.instanceName = this.varPrefix + this.name.toLowerCase();
        if (this.element.constructorPrototype != null) {
            this.constructorFunc = new FunctionDef(this.element.constructorPrototype);
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
                        this.constructorFunc = func;
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
    /**
     * the parent interprecter
     */
    parentContracts: ContractInterpreter[] = [];

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
                
            });
        this.resolveBaseClass(this.element);
        // ignore the field that not marked with state
        this.fields.forEach(item => {
            if (!item.decorators.ignore) {
                this.storeFields.push(item);
            }
        });

    }

    private resolveBaseClass(classPrototype: ClassPrototype): void {
        if (classPrototype.basePrototype) {
            let basePrototype = classPrototype.basePrototype;
            let parentContract = new ContractInterpreter(basePrototype);
            this.parentContracts.push(parentContract);
            basePrototype.instanceMembers &&
                basePrototype.instanceMembers.forEach((instance, _) => {
                    if (ElementUtil.isMessageFuncPrototype(instance)) {
                        let msgFunc = new MessageFunctionDef(<FunctionPrototype>instance);
                        this.msgFuncDefs.push(msgFunc);
                    }
                });
            this.resolveBaseClass(basePrototype);

            
            parentContract.fields.forEach(item => {
                if (!item.decorators.ignore) {
                    this.storeFields.push(item);
                }
            });
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
export class DynamicIntercepter extends ClassInterpreter {
    constructor(clzPrototype: ClassPrototype) {
        super(clzPrototype);
        this.resolveFieldMembers();
        this.resolveFunctionMembers();
    }
}