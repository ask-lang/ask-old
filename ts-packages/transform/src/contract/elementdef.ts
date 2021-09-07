import {
    FieldDeclaration,
    NamedTypeNode,
    NodeKind,
    ParameterNode,
    TypeNode,
    Element,
    FieldPrototype,
    FunctionPrototype,
    Range,
    DecoratorNode,
    FunctionDeclaration
} from "assemblyscript";

import { AstUtil, DecoratorUtil, ElementUtil, RangeUtil } from "../utils/utils";
import { Strings } from "../utils/primitiveutil";
import { ArgumentSpec, ConstructorSpec, MessageSpec, TypeSpec } from "contract-metadata/src";
import { KeySelector } from "../preprocess/selector";
import { MetadataUtil } from "../utils/metadatautil";
import { ContractDecoratorKind } from "../enums/decorator";
import { FieldDefHelper, TypeHelper } from "../utils/typeutil";
import { TypeKindEnum } from "../enums/customtype";
import { NamedTypeNodeDef } from "./typedef";

export class DecoratorsInfo {
    decorators: DecoratorNode[] | null;
    isIgnore = false;
    isTopic = false;
    isPacked = false;
    capacity = 0;

    constructor(decorators: DecoratorNode[] | null) {
        this.decorators = decorators;

        if (this.decorators) {
            for (let decorator of this.decorators) {
                if (DecoratorUtil.isDecoratorKind(decorator, ContractDecoratorKind.IGNORE)) {
                    this.isIgnore = true;
                }
                if (DecoratorUtil.isDecoratorKind(decorator, ContractDecoratorKind.TOPIC)) {
                    this.isTopic = true;
                }
                if (DecoratorUtil.isDecoratorKind(decorator, ContractDecoratorKind.PACKED)) {
                    this.isPacked = true;
                    let decratorDef = new DecoratorNodeDef(decorator);
                    if (decratorDef.pairs.has("capacity")) {
                        this.capacity = Number(decratorDef.pairs.get("capacity"));
                    }
                }
            }
        }
    }
}
export class FieldDef {
    protected fieldPrototype: FieldPrototype;
    range: Range;
    name: string;
    type!: NamedTypeNodeDef;
    selector: KeySelector;
    varName: string;
    doc: string[];
    declaration: FieldDeclaration;
    decorators: DecoratorsInfo;
    rangeString = "";

    constructor(field: FieldPrototype) {
        this.fieldPrototype = field;
        this.name = field.name;
        this.declaration = <FieldDeclaration>field.declaration;
        this.range = this.declaration.range;
        this.rangeString = this.declaration.range.toString();
        this.doc = DecoratorUtil.getDoc(field.declaration);
        this.varName = "_" + this.name;
        this.decorators = new DecoratorsInfo(this.fieldPrototype.declaration.decorators);
        let storeKey = this.fieldPrototype.internalName + this.name;
        this.selector = new KeySelector(storeKey);
        this.resolveField();
    }

    /**
     * 
     */
    private resolveField(): void {
        let fieldDeclaration: FieldDeclaration = <FieldDeclaration>this.fieldPrototype.declaration;
        let commonType: TypeNode | null = fieldDeclaration.type;
        if (commonType && commonType.kind == NodeKind.NAMEDTYPE) {
            let typeNode = <NamedTypeNode>commonType;
            this.type = new NamedTypeNodeDef(this.fieldPrototype, typeNode);
        }
        // IF the type is array, special process
        if (this.type.typeKind == TypeKindEnum.ARRAY) {
            let str = FieldDefHelper.getConcreteStorable(this);
            this.type.codecTypeAlias = FieldDefHelper.getStorableExport(this);
            this.type.instanceType = str;
            this.type.capacity = this.decorators.capacity;
        }

        if (this.type.typeKind == TypeKindEnum.MAP) {
            let str = FieldDefHelper.getConcreteStorable(this);
            this.type.codecTypeAlias = FieldDefHelper.getStorableExport(this);
            this.type.instanceType = str;
        }
    }
}
export class TopicFieldDef extends FieldDef {

    isTopic = false;
    constructor(field: FieldPrototype) {
        super(field);
        this.isTopic = ElementUtil.isTopicField(field);
    }

}
export class ParameterNodeDef {
    private parameterNode: ParameterNode;
    name: string;
    type: NamedTypeNodeDef;

    constructor(parent: Element, parameterNode: ParameterNode) {
        this.parameterNode = parameterNode;
        this.name = this.parameterNode.name.range.toString();
        this.type = new NamedTypeNodeDef(parent, <NamedTypeNode>this.parameterNode.type);
    }

    generateTypeSeq(typeNodeMap: Map<string, NamedTypeNodeDef>): void {
        this.type.genTypeSequence(typeNodeMap);
    }
}

export class DecoratorNodeDef {

    constructor(decorator: DecoratorNode, public pairs: Map<string, string> = new Map<string, string>()) {
        if (decorator.args) {
            decorator.args.forEach(expression => {
                // console.log(`expression: ${expression.range.toString()}`);
                // console.log(`expression kind: ${NodeKind[expression.kind]}`);
                if (expression.kind == NodeKind.BINARY) {
                    let identifier = AstUtil.getIdentifier(expression);
                    let val = AstUtil.getBinaryExprRight(expression);
                    this.pairs.set(identifier, val);
                }
                // TODO using the strick logical
                if (expression.kind == NodeKind.LITERAL) {
                    let exp = expression.range.toString().trim();
                    let regex = new RegExp(/{|}|,/);
                    regex.test(exp);
                    let result = Strings.splitString(exp, regex);
                    for (let item of result) {
                        let pairItem = item.split(/:/);
                        this.pairs.set(pairItem[0].trim(), pairItem[1]);
                    }
                }
            });
        }
    }
}

/**
 * Doc decorator info
 */
export class DocDecoratorNodeDef extends DecoratorNodeDef {
    doc = "";
    constructor(decorator: DecoratorNode) {
        super(decorator);
        if (this.pairs.has("desc")) {
            this.doc = Strings.removeQuotation(this.pairs.get("desc") || "");
        } else {
            DecoratorUtil.throwNoArguException(decorator, "desc");
        }
    }
}

export class MessageDecoratorNodeDef extends DecoratorNodeDef {
    payable = false;
    mutates = "true";
    selector = "";

    constructor(decorator: DecoratorNode) {
        super(decorator);
        if (decorator.args) {
            decorator.args.forEach(expression => {
                let identifier = AstUtil.getIdentifier(expression);
                if (identifier == 'payable') {
                    this.payable = true;
                } else if (identifier == 'mutates') {
                    this.mutates = AstUtil.getBinaryExprRight(expression);
                    DecoratorUtil.checkMutates(decorator, this.mutates);
                } else if (identifier == 'selector') {
                    this.selector = Strings.removeQuotation(AstUtil.getBinaryExprRight(expression));
                    DecoratorUtil.checkSelecrot(decorator, this.selector);
                } else {
                    DecoratorUtil.throwNoArguException(decorator, identifier);
                }
            });
        }
        if (this.payable && this.mutates == 'false') {
            throw new Error(`Decorator: ${decorator.name.range.toString()} arguments mutates and payable can only exist one. Trace: ${RangeUtil.location(decorator.range)} `);
        }

    }
}

export class FunctionDef {
    protected funcProto: FunctionPrototype;
    declaration: FunctionDeclaration;
    parameters: ParameterNodeDef[] = [];
    methodName: string;
    isReturnable = false;
    isConstructor = false;
    returnType: NamedTypeNodeDef | null = null;
    doc: string[];
    rangeString = "";
    defaultVals: string[] = [];

    constructor(funcPrototype: FunctionPrototype) {
        this.declaration = <FunctionDeclaration>funcPrototype.declaration;
        this.doc = DecoratorUtil.getDoc(funcPrototype.declaration);
        this.funcProto = funcPrototype;
        this.methodName = this.funcProto.name;
        this.rangeString = this.declaration.range.toString();
        this.resolve();
    }

    resolve(): void {
        let params = this.funcProto.functionTypeNode.parameters;
        params.forEach(param => {
            this.parameters.push(new ParameterNodeDef(this.funcProto, param));
        });
        this.resolveReturnType();
    }

    resolveReturnType(): void {
        if (this.funcProto.name == "constructor") {
            this.isConstructor = true;
            return ;
        }
        let returnType = this.funcProto.functionTypeNode.returnType;
        let returnTypeDesc = new NamedTypeNodeDef(this.funcProto, <NamedTypeNode>returnType);
        if (returnTypeDesc.typeKind != TypeKindEnum.VOID) {
            returnTypeDesc.codecType = TypeHelper.getCodecType(returnTypeDesc.plainType);
            this.isReturnable = true;
            this.returnType = returnTypeDesc;
        } else {
            this.returnType = null;
        }
    }

    public genTypeSequence(typeNodeMap: Map<string, NamedTypeNodeDef>): void {
        this.parameters.forEach(item => {
            item.generateTypeSeq(typeNodeMap);
        });
        if (this.isReturnable) {
            this.returnType!.genTypeSequence(typeNodeMap);
        }
    }
}
export class ConstructorDef extends FunctionDef {
    
    constructor(funcPrototype: FunctionPrototype) {
        super(funcPrototype);
        AstUtil.checkPublic(this.declaration);
        if (this.isReturnable) {
            throw new Error(`The method that marked by @constructor should return void type. Please check ${RangeUtil.location(this.declaration.range)}`);
        }
    }

    public createMetadata(): ConstructorSpec {
        let args: ArgumentSpec[] = this.parameters.map(item => {
            let type = new TypeSpec(item.type.index, item.type.plainType);
            return new ArgumentSpec(type, item.name);
        });
        return new ConstructorSpec([this.methodName],
            new KeySelector(this.methodName).short,
            args, this.doc);
    }
}

export class MessageFunctionDef extends FunctionDef {
    messageDecorator: MessageDecoratorNodeDef;
    bodyRange: Range;
    mutatable = true;
    selector: KeySelector;
    metadata: MessageSpec;

    constructor(funcPrototype: FunctionPrototype) {
        super(funcPrototype);
        AstUtil.checkPublic(this.declaration);
        let msgDecorator = AstUtil.getSpecifyDecorator(funcPrototype.declaration, ContractDecoratorKind.MESSAGE);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.messageDecorator = new MessageDecoratorNodeDef(msgDecorator!);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.selector = new KeySelector(this.methodName);
        this.bodyRange = this.funcProto.bodyNode!.range;
        if (this.messageDecorator.mutates == "false") {
            this.mutatable = false;
        } 
        if (this.messageDecorator.selector) {
            this.selector.setShortHex(this.messageDecorator.selector);
        }
        this.metadata = this.createMetadata();
    }

    public createMetadata(): MessageSpec {
        let args: ArgumentSpec[] = this.parameters.map(item => {
            let type = MetadataUtil.createTypeSpec(item.type);
            return new ArgumentSpec(type!, item.name);
        });
        let msgSpec = new MessageSpec([this.methodName],
            this.selector.short,
            args,
            MetadataUtil.createTypeSpec(this.returnType), this.doc);
        msgSpec.setMutates(this.mutatable);
        msgSpec.setPayable(this.messageDecorator.payable);
        return msgSpec;
    }
}