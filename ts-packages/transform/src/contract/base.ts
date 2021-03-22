import {
    FieldDeclaration,
    ImportStatement,
    NamedTypeNode,
    NodeKind,
    ParameterNode,
    Source,
    SourceKind,
    TypeDeclaration,
    TypeNode,
    Element,
    ElementKind,
    FieldPrototype,
    FunctionPrototype,
    TypeDefinition,
    Range,
    DecoratorNode,
} from "assemblyscript";

import { AstUtil, ContractDecoratorKind } from "../utils";
import { Collections } from "../collectionutil";
import { AbiHelper } from "../contract";
import { LayoutDef } from "./storage";
import { Strings } from "../primitiveutil";

/**
 * The parameter type enum
 * basic type and composite type, array and map.
 *
 */
export enum TypeEnum {
    NUMBER,
    STRING,
    ARRAY,
    MAP,
    CLASS,
}
export class FieldDef {
    protected fieldPrototype: FieldPrototype;
    layout: LayoutDef = new LayoutDef();
    name = "";
    type: NamedTypeNodeDef | null = null;
    storeKey = "";
    varName = "";
    path = "";

    constructor(field: FieldPrototype) {
        this.fieldPrototype = field;
        this.name = field.name;
        this.varName = "_" + this.name;
        this.storeKey = this.fieldPrototype.parent.name + this.name;
        this.resolveField();
    }

    private resolveField(): void {
        let fieldDeclaration: FieldDeclaration = <FieldDeclaration>(
            this.fieldPrototype.declaration
        );
        let commonType: TypeNode | null = fieldDeclaration.type;
        if (commonType && commonType.kind == NodeKind.NAMEDTYPE) {
            let typeNode = <NamedTypeNode>commonType;
            this.type = new NamedTypeNodeDef(this.fieldPrototype, typeNode);
        }
    }
}

export class ParameterNodeDef {
    private parameterNode: ParameterNode;
    name: string;
    type: NamedTypeNodeDef;

    constructor(parent: Element, parameterNode: ParameterNode) {
        this.parameterNode = parameterNode;
        this.name = this.parameterNode.name.range.toString();
        this.type = new NamedTypeNodeDef(
            parent,
            <NamedTypeNode>this.parameterNode.type
        );
    }

    setTypeIndex(typeNodeMap: Map<string, NamedTypeNodeDef>): void {
        this.type.setTypeIndex(typeNodeMap);
    }
}

export class DecoratorNodeDef {
    private decorator: DecoratorNode;

    constructor(decorator: DecoratorNode) {
        this.decorator = decorator;
    }
}

export class MessageDecoratorNodeDef extends DecoratorNodeDef {
    private payable = false;
    mutates = "true";
    private selector = "";

    constructor(decorator: DecoratorNode) {
        super(decorator);
        if (decorator.args) {
            decorator.args.forEach((expression) => {
                let identifier = AstUtil.getIdentifier(expression);
                if (identifier == "payable") {
                    this.payable = true;
                } else if (identifier == "mutates") {
                    this.mutates = AstUtil.getBinaryExprRight(expression);
                } else if (identifier == "selector") {
                    this.selector = Strings.removeQuotation(
                        AstUtil.getBinaryExprRight(expression)
                    );
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
    returnType: NamedTypeNodeDef | undefined;
    defaultVals: string[] = [];

    constructor(funcPrototype: FunctionPrototype) {
        this.funcProto = funcPrototype;
        this.methodName = this.funcProto.name;
        this.resolve();
    }

    resolve(): void {
        let params = this.funcProto.functionTypeNode.parameters;
        params.forEach((param) => {
            this.parameters.push(new ParameterNodeDef(this.funcProto, param));
        });
        let returnType = this.funcProto.functionTypeNode.returnType;
        let returnTypeDesc = new NamedTypeNodeDef(
            this.funcProto,
            <NamedTypeNode>returnType
        );
        if (!returnTypeDesc.isReturnVoid()) {
            let wrapType = TypeUtil.getWrapperType(returnTypeDesc.name);
            returnTypeDesc.codecType = wrapType;
            returnTypeDesc.originalType = returnTypeDesc.name;
            this.isReturnable = true;
        }
        this.returnType = returnTypeDesc;
    }

    public setTypeIndex(typeNodeMap: Map<string, NamedTypeNodeDef>): void {
        this.parameters.forEach((item) => {
            item.setTypeIndex(typeNodeMap);
        });
        if (this.isReturnable) {
            this.returnType!.setTypeIndex(typeNodeMap);
        }
    }
}

export class MessageFuctionDef extends FunctionDef {
    messageDecorator: MessageDecoratorNodeDef;
    bodyRange: Range;
    havingMutates = false;

    constructor(funcPrototype: FunctionPrototype) {
        super(funcPrototype);
        let msgDecorator = AstUtil.getSpecifyDecorator(
            funcPrototype.declaration,
            ContractDecoratorKind.MESSAGE
        );
        this.messageDecorator = new MessageDecoratorNodeDef(msgDecorator!);
        this.bodyRange = this.funcProto.bodyNode!.range;
        if (this.messageDecorator.mutates == "false") {
            this.havingMutates = true;
        }
    }
}
export class TypeUtil {
    static typeWrapperMap: Map<string, string> = new Map([
        ["i8", "Int8"],
        ["i16", "Int16"],
        ["i32", "Int32"],
        ["i64", "Int64"],
        ["i128", "Int128"],
        ["isize", "Int32"],
        ["u8", "UInt8"],
        ["u16", "UInt16"],
        ["u32", "UInt32"],
        ["u64", "UInt64"],
        ["u128", "UInt128"],
        ["usize", "UInt32"],
        ["f32", "float32"],
        ["f64", "float64"],
        ["bool", "Bool"],
        ["boolean", "Bool"],
        ["string", "ScaleString"],
    ]);

    static abiTypeMap: Map<string, string> = new Map([
        ["i8", "i8"],
        ["i16", "i16"],
        ["i32", "i32"],
        ["i64", "i64"],
        ["isize", "i32"],
        ["u8", "u8"],
        ["u16", "u16"],
        ["u32", "u32"],
        ["u64", "u64"],
        ["u128", "u128"],
        ["i128", "i128"],
        ["usize", "u32"],
        ["bool", "bool"],
        ["boolean", "bool"],
        ["string", "str"],
    ]);

    static defaultValMap: Map<string, string> = new Map([
        ["i8", "0"],
        ["i16", "0"],
        ["i32", "0"],
        ["i64", "0"],
        ["isize", "0"],
        ["u8", "0"],
        ["u16", "0"],
        ["u32", "0"],
        ["u64", "0"],
        ["u128", "0"],
        ["i128", "0"],
        ["usize", "0"],
        ["f32", "0"],
        ["f64", "0"],
        ["bool", "false"],
        ["boolean", "false"],
        ["string", "''"],
    ]);

    static getWrapperType(asType: string): string {
        let type: string | undefined = TypeUtil.typeWrapperMap.get(asType);
        return type == undefined ? "" : type;
    }

    static getDefaultVal(asType: string): string {
        let type: string | undefined = TypeUtil.defaultValMap.get(asType);
        return type == undefined ? "" : type;
    }

    static getAbiType(asType: string): string {
        let type: string | undefined = TypeUtil.abiTypeMap.get(asType);
        return type == undefined ? "" : type;
    }
}
export class ImportSourceDef {
    private entrySources: Source[] = [];
    private importedElement: Set<string> = new Set();
    unimports: string[] = [];

    constructor(sources: Source[]) {
        sources.forEach((element) => {
            if (element.sourceKind == SourceKind.USER_ENTRY) {
                this.entrySources.push(element);
                this.resolveImportSource(element);
            }
        });
    }

    private resolveImportSource(source: Source): void {
        source.statements.forEach((statement) => {
            if (statement.kind == NodeKind.IMPORT) {
                let importStatement = <ImportStatement>statement;
                if (importStatement.declarations) {
                    importStatement.declarations.forEach((declaration) => {
                        this.importedElement.add(declaration.range.toString());
                    });
                }
            }
        });
    }

    toImportElement(name: string): void {
        if (!this.importedElement.has(name)) {
            this.unimports.push(name);
        }
        this.importedElement.add(name);
    }
}

/**
 * Type node description
 */
export class NamedTypeNodeDef {
    protected parent: Element;
    protected typeNode: NamedTypeNode;
    typeKind: TypeEnum | undefined;
    typeArguments: NamedTypeNodeDef[] = [];
    name = "";
    codecType = "";
    originalType = "";
    defaultVal = "";
    abiType = "";
    protected index = 0;

    constructor(parent: Element, typeNode: NamedTypeNode) {
        this.parent = parent;
        this.typeNode = typeNode;
        this.name = typeNode.name.range.toString();
        this.originalType = this.name;
        this.abiType = TypeUtil.getAbiType(this.name);
        this.codecType = TypeUtil.getWrapperType(this.originalType);
        this.defaultVal = TypeUtil.getDefaultVal(this.originalType);
        this.getArgs();
    }

    public setTypeIndex(typeNodeMap: Map<string, NamedTypeNodeDef>): void {
        let originalType = this.originalType;
        if (!typeNodeMap.has(originalType)) {
            this.index = typeNodeMap.size + 1;
            typeNodeMap.set(originalType, this);
        } else {
            let typeDef = typeNodeMap.get(originalType);
            this.index = typeDef!.index;
        }
    }

    getDeclareType(): string {
        return this.typeNode.range.toString();
    }

    isReturnVoid(): boolean {
        return this.name == "void";
    }

    get typeEnum(): TypeEnum {
        var typeName = this.name;
        if (AstUtil.isString(typeName)) {
            return TypeEnum.STRING;
        }
        if (AstUtil.isArrayType(typeName)) {
            return TypeEnum.ARRAY;
        }
        if (AstUtil.isMapType(typeName)) {
            return TypeEnum.MAP;
        }
        var type = this.findElement(typeName);

        if (type) {
            if (type.kind == ElementKind.TYPEDEFINITION) {
                let typeDefine = <TypeDefinition>type;
                let declaration = <TypeDeclaration>typeDefine.declaration;
                let _typeNode = <NamedTypeNode>declaration.type;
                let name = _typeNode.name.range.toString();
                if (AbiHelper.abiTypeLookup.get(name) && name != "Asset") {
                    return TypeEnum.NUMBER;
                }
            }
            if (type.kind == ElementKind.CLASS_PROTOTYPE) {
                return TypeEnum.CLASS;
            }
        }
        return TypeEnum.NUMBER;
    }

    isArray(): boolean {
        return this.typeEnum == TypeEnum.ARRAY;
    }

    getArrayArgAbiTypeEnum(): TypeEnum {
        var typeName = this.getArgs()[0];
        if (AstUtil.isString(typeName)) {
            return TypeEnum.STRING;
        }
        var type = this.findSourceAsElement(typeName);
        if (type != null && type.kind == ElementKind.CLASS_PROTOTYPE) {
            return TypeEnum.CLASS;
        }
        return TypeEnum.NUMBER;
    }

    isPrimaryType(): boolean {
        if (this.typeEnum == TypeEnum.NUMBER) {
            return this.findSourceAsTypeName(this.name) == "u64";
        }
        return false;
    }

    getArrayArg(): string {
        if (this.typeNode.typeArguments) {
            return this.typeNode.typeArguments[0].range.toString();
        }
        throw new Error(
            `The typenode is not array:${this.name}.` +
                ` Location in ${AstUtil.location(this.typeNode.range)}`
        );
    }

    getAbiDeclareType(): string {
        var abiType = this.typeEnum;
        var typeName = this.typeNode.name.range.toString();
        switch (abiType) {
            case TypeEnum.STRING: {
                return "string";
            }
            case TypeEnum.NUMBER:
            case TypeEnum.CLASS: {
                return typeName;
            }
            case TypeEnum.ARRAY: {
                return `${this.getArgs()[0]}[]`;
            }
            case TypeEnum.MAP: {
                return `${this.getArgs().join(",")}{}`;
            }
            default: {
                return typeName;
            }
        }
    }

    private getArgs(): string[] {
        var args = this.typeNode.typeArguments;
        var argType = new Array<string>();
        if (args) {
            for (let arg of args) {
                // console.log(`arg node type kind`, NodeKind[arg.kind]);
                if (arg.kind == NodeKind.NAMEDTYPE) {
                    let typeAnalyzer: NamedTypeNodeDef = new NamedTypeNodeDef(
                        this.parent,
                        <NamedTypeNode>arg
                    );
                    this.typeArguments.push(typeAnalyzer);
                }
                argType.push(arg.range.toString());
            }
        }
        return argType;
    }

    getAsTypes(): string[] {
        var args = this.getArgs();
        if (!Collections.isEmptyArray(args)) {
            return args;
        }
        return [this.name];
    }

    /**
     * the typename maybe global scope or local scope.
     * So search the local firtst, then search the global scope.
     *
     * @param typeName typename without type arguments
     */
    findElement(typeName: string): Element | null {
        return this.parent.lookup(typeName);
    }

    /**
     * Get the type {@type Type} by the type name
     * @param asTypeName the AssemblyScript type name
     */
    private findSourceAsElement(asTypeName: string): Element | null {
        var sourceTypeName = this.findSourceAsTypeName(asTypeName);
        var sourceType: Element | null = this.parent.lookup(sourceTypeName);
        return sourceType;
    }

    /**
     * Find the source type name,
     * eg: declare type account_name = u64;
     *     declare type account_name_alias = account_name;
     *     findSourceAsTypeName("account_name_alias") return "account_name";
     */
    private findSourceAsTypeName(typeName: string): string {
        var element = this.parent.lookup(typeName);
        if (element && element.kind == ElementKind.TYPEDEFINITION) {
            let typeDefine = <TypeDefinition>element;
            let aliasTypeName = typeDefine.typeNode.range.toString();
            return this.findSourceAsTypeName(aliasTypeName);
        }
        return typeName;
    }

    findSourceAbiType(typeName: string): string {
        var abiType: string | null =
            AbiHelper.abiTypeLookup.get(typeName) || null;
        if (abiType) {
            return abiType;
        }
        var element = this.parent.lookup(typeName);
        if (element && element.kind == ElementKind.TYPEDEFINITION) {
            let typeDefine = <TypeDefinition>element;
            let aliasTypeName = typeDefine.typeNode.range.toString();
            return this.findSourceAbiType(aliasTypeName);
        }
        return typeName;
    }
}
