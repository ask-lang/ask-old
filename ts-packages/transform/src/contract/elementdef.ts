import {
    FieldDeclaration,
    NamedTypeNode,
    NodeKind,
    ParameterNode,
    TypeDeclaration,
    TypeNode,
    Element,
    ElementKind,
    FieldPrototype,
    FunctionPrototype,
    TypeDefinition,
    Range,
    DecoratorNode,
    DeclarationStatement,
    ClassPrototype,
} from "assemblyscript";

import { AstUtil, ElementUtil } from "../utils/utils";
import { Strings } from "../utils/primitiveutil";
import { ArgumentSpec, ConstructorSpec, MessageSpec, TypeSpec } from "contract-metadata/src";
import { KeySelector } from "../preprocess/selector";
import { MetadataUtil } from "../utils/metadatautil";
import { ContractDecoratorKind } from "../enums/decorator";
import { FieldDefHelper, TypeHelper } from "../utils/typeutil";
import { TypeKindEnum } from "../enums/customtype";
import { ClassInterpreter } from "./classdef";

export class DecoratorsInfo {
    decorators: DecoratorNode[] | null;
    isIgnore = false;
    isTopic = false;
    isPacked = false;
    storeCapacity = 0;

    constructor(decorators: DecoratorNode[] | null) {
        this.decorators = decorators;

        if (this.decorators) {
            for (let decorator of this.decorators) {
                if (AstUtil.isSpecifyCustomDecorator(decorator, ContractDecoratorKind.IGNORE)) {
                    this.isIgnore = true;
                }
                if (AstUtil.isSpecifyCustomDecorator(decorator, ContractDecoratorKind.TOPIC)) {
                    this.isTopic = true;
                }
                if (AstUtil.isSpecifyCustomDecorator(decorator, ContractDecoratorKind.PACKED)) {
                    this.isPacked = true;
                    let decratorDef = new DecoratorNodeDef(decorator);
                    if (decratorDef.pairs.has("capacity")) {
                        this.storeCapacity = Number(decratorDef.pairs.get("capacity"));  
                    }
                }
            }
        }
    }
}
export class FieldDef {
    protected fieldPrototype: FieldPrototype;
    name: string;
    type!: NamedTypeNodeDef;
    selector: KeySelector;
    varName: string;
    doc: string[];
    decorators: DecoratorsInfo;

    constructor(field: FieldPrototype) {
        this.fieldPrototype = field;
        this.name = field.name;
        this.doc = DecoratorUtil.getDoc(field.declaration);
        this.varName = "_" + this.name;
        this.decorators = new DecoratorsInfo(this.fieldPrototype.declaration.decorators);
        let storeKey = this.fieldPrototype.parent.name + this.name;
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
            this.type.codecTypeGeneric = str;
        }

        if (this.type.typeKind == TypeKindEnum.MAP) {
            let str = FieldDefHelper.getConcreteStorable(this);
            this.type.codecTypeAlias = FieldDefHelper.getStorableExport(this);
            this.type.codecTypeGeneric = str;
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
    private decorator: DecoratorNode;
    pairs: Map<string, string>;
    constructor(decorator: DecoratorNode) {
        this.decorator = decorator;
        this.pairs = new Map<string, string>();
        if (decorator.args) {
            decorator.args.forEach(expression => {
                if (expression.kind == NodeKind.BINARY) {
                    let identifier = AstUtil.getIdentifier(expression);
                    let val = AstUtil.getBinaryExprRight(expression);
                    this.pairs.set(identifier, val);
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
                } else if (identifier == 'selector') {
                    this.selector = Strings.removeQuotation(AstUtil.getBinaryExprRight(expression));
                }
            });
        }
    }
}

export class FunctionDef {
    protected funcProto: FunctionPrototype;
    methodName = "";
    parameters: ParameterNodeDef[] = [];
    isReturnable = false;
    returnType: NamedTypeNodeDef | null = null;
    doc: string[];
    defaultVals: string[] = [];

    constructor(funcPrototype: FunctionPrototype) {
        this.doc = DecoratorUtil.getDoc(funcPrototype.declaration);
        this.funcProto = funcPrototype;
        this.methodName = this.funcProto.name;
        this.resolve();
    }

    resolve(): void {
        let params = this.funcProto.functionTypeNode.parameters;
        params.forEach(param => {
            this.parameters.push(new ParameterNodeDef(this.funcProto, param));
        });
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
    }

    public  createMetadata(): ConstructorSpec {
        let args: ArgumentSpec[] = this.parameters.map(item => {
            let type = new TypeSpec(item.type.index, item.type.plainType);
            return new ArgumentSpec(type, item.name);
        });
        return new ConstructorSpec([this.methodName],
            new KeySelector(this.methodName).short,
            args, []);
    }
}

export class DecoratorUtil {
    public static parseDeclaration(statement: DeclarationStatement): void {
        let decoratorDefs: DecoratorNodeDef[] = [];
        if (statement.decorators) {
            let decorator = AstUtil.getSpecifyDecorator(statement, ContractDecoratorKind.MESSAGE);
            if (decorator) {
                decoratorDefs.push(new MessageDecoratorNodeDef(decorator));
            }
            decorator = AstUtil.getSpecifyDecorator(statement, ContractDecoratorKind.DOC);
            if (decorator) {
                decoratorDefs.push(new DocDecoratorNodeDef(decorator));
            }
        }
    }

    public static getDoc(statement: DeclarationStatement): string[] {
        let decortor = AstUtil.getDocDecorator(statement);
        return decortor == null ? [Strings.EMPTY] : [new DocDecoratorNodeDef(decortor).doc];
    }
}

export class MessageFuctionDef extends FunctionDef {
    messageDecorator: MessageDecoratorNodeDef;
    bodyRange: Range;
    havingMutates = false;
    metadata: MessageSpec;

    constructor(funcPrototype: FunctionPrototype) {
        super(funcPrototype);
        let msgDecorator = AstUtil.getSpecifyDecorator(funcPrototype.declaration, ContractDecoratorKind.MESSAGE);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.messageDecorator = new MessageDecoratorNodeDef(msgDecorator!);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.bodyRange = this.funcProto.bodyNode!.range;
        if (this.messageDecorator.mutates == "false") {
            this.havingMutates = true;
        }
        this.metadata = this.createMetadata();
    }

    public createMetadata(): MessageSpec {
        let args: ArgumentSpec[] = this.parameters.map(item => {
            let type = MetadataUtil.createTypeSpec(item.type);
            return new ArgumentSpec(type!, item.name);
        });
        return  new MessageSpec([this.methodName],
            new KeySelector(this.methodName).short,
            args,
            MetadataUtil.createTypeSpec(this.returnType), this.doc);
    }
}

/**
 * Type node description
 */
export class NamedTypeNodeDef {
    protected parent: Element;
    protected typeNode: NamedTypeNode;
    current!: Element;
    typeKind: TypeKindEnum;
    typeArguments: NamedTypeNodeDef[] = [];
    isCodec = false;
    plainType: string;
    codecType: string;
    codecTypeAlias: string;
    codecTypeGeneric =  "";
    abiType: string;
    index = 0;

    constructor(parent: Element, typeNode: NamedTypeNode) {
        this.parent = parent;
        this.typeNode = typeNode;
        this.plainType = typeNode.name.range.toString();
        this.typeKind = this.getTypeKind();
        this.abiType = TypeHelper.getAbiType(this.plainType);
        this.codecType = TypeHelper.getCodecType(this.plainType);
        this.codecTypeAlias = this.getNameSpace() + this.codecType;
        this.resolveArguments();
    }

    public getNameSpace(): string {
        return this.typeKind == TypeKindEnum.USER_CLASS || this.typeKind == TypeKindEnum.ARRAY ? "" : "_lang.";
    }

    // TODO 
    public genTypeSequence(definedTypeMap: Map<string, NamedTypeNodeDef>): void {
        let typeName = this.codecType;
        if (definedTypeMap.has(typeName)) {
            let typeDef = definedTypeMap.get(typeName);
            this.index = typeDef!.index;
        } else {
            this.index = definedTypeMap.size + 1;
            definedTypeMap.set(typeName, this);
            console.log(`definedTypeMap ${typeName}`);
        }
        if (this.typeKind == TypeKindEnum.USER_CLASS) {
            let clzPrototype = <ClassPrototype>this.current;
            let classInter = new ClassInterpreter(clzPrototype);
            classInter.fields.forEach(item => item.type.genTypeSequence(definedTypeMap));
        }        
    }

    getTypeByName(typeName: string) : TypeKindEnum {
        if (typeName == "void") {
            return TypeKindEnum.VOID;
        }
        if (Strings.isString(typeName)) {
            return TypeKindEnum.STRING;
        }
        if (AstUtil.isArrayType(typeName)) {
            return TypeKindEnum.ARRAY;
        }
        if (AstUtil.isMapType(typeName)) {
            return TypeKindEnum.MAP;
        }
        if (TypeHelper.nativeType.includes(typeName)) {
            return TypeKindEnum.NUMBER;
        }
        if (TypeHelper.bigNumType.includes(typeName)) {
            return TypeKindEnum.BIG_NUM;
        }
        return TypeKindEnum.USER_CLASS;
    }

    /**
     * 
     * declare U8Array = Array<u8>
     * declare u8Arr = u8Array
     * 
     * FUNCTION_PROTOTYPE, u8
     * TYPEDEFINITION, void
     * CLASS_PROTOTYPE, string
     * CLASS_PROTOTYPE, u128
     * @returns 
     */
    getTypeKind(): TypeKindEnum {
        console.log(`plainType ${this.plainType}`);
        let element = this.parent.lookup(this.plainType)!;
        let buildinElement: Element = this.findBuildinElement(element);
        this.current = buildinElement;
        console.log(`Element ${ElementKind[buildinElement.kind]}, ${buildinElement.name}, ${this.plainType}`);
        if (buildinElement.kind == ElementKind.FUNCTION_PROTOTYPE) {
            this.isCodec = false;
            return TypeKindEnum.NUMBER;
        } else if (buildinElement.kind == ElementKind.TYPEDEFINITION) {
            if (buildinElement.name == "void") {
                return TypeKindEnum.VOID;
            } else if (TypeHelper.nativeType.includes(buildinElement.name)) {
                return TypeKindEnum.NUMBER;
            } 
            let declaration = <TypeDeclaration>(<TypeDefinition>buildinElement).declaration;
            let definitionNode = <NamedTypeNode>declaration.type;
            // console.log(`TYPEDEFINITION ${definitionNode.range.toString()},  ${buildinElement.name}`);
            let name = definitionNode.name.range.toString();
            return this.getTypeByName(name);
        } else if (buildinElement.kind == ElementKind.CLASS_PROTOTYPE) {
            return this.getTypeByName(buildinElement.name);
        }
        return TypeKindEnum.USER_CLASS;
    }

    

    /**
    * the typename maybe global scope or local scope.
    * So search the local first, then search the global scope.
    *
    * @param typeName typename without type arguments
    */
    private findBuildinElement(element: Element): Element {
        // console.log(`element: ${element.name}, ${ElementKind[element.kind]}`);
        if (element && element.kind == ElementKind.TYPEDEFINITION) {
            let defineElement = <TypeDefinition>element;
            let aliasTypeName = defineElement.typeNode.range.toString();
            // console.log(`aliasTypeName: ${aliasTypeName}`);
            let defineType = this.parent.lookup(aliasTypeName);
            if (defineType) {
                return this.findBuildinElement(defineType);
            }
        }
        return element;
    }

    private resolveArguments(): void {
        var args = this.typeNode.typeArguments;
        if (args) {
            for (let arg of args) {
                if (arg.kind == NodeKind.NAMEDTYPE) {
                    let typeAnalyzer: NamedTypeNodeDef = new NamedTypeNodeDef(this.parent, <NamedTypeNode>arg);
                    this.typeArguments.push(typeAnalyzer);
                }
            }
        }
    }

}

export class ArrayNameTypeNode extends NamedTypeNodeDef {

    typeArguments: NamedTypeNodeDef[] = [];

    constructor(parent: Element, typeNode: NamedTypeNode) {
        super(parent, typeNode);
        // this.resolveArguments();
    }
}
