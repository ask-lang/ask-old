import {
    NamedTypeNode,
    NodeKind,
    TypeDeclaration,
    Element,
    ElementKind,
    TypeDefinition,
    ClassPrototype
} from "assemblyscript";


import { TypeHelper } from "../utils/typeutil";
import { TypeKindEnum } from "../enums/customtype";
import { ClassInterpreter } from "./classdef";
import { Strings } from "../utils/primitiveutil";

export class NameTyper {

    protected parent: Element;
    protected typeNode: NamedTypeNode;
    current!: Element;
    typeKind: TypeKindEnum;
    constructor(parent: Element, typeNode: NamedTypeNode) {
        this.parent = parent;
        this.typeNode = typeNode;
        this.typeKind = this.getTypeKind();
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
        let plainType = this.typeNode.name.range.toString();
        let element = this.parent.lookup(plainType)!;
        this.current = element;
        let buildinElement: Element = this.findBuildinElement(element);
        if (buildinElement.kind == ElementKind.FUNCTION_PROTOTYPE) {
            return TypeKindEnum.NUMBER;
        } else if (buildinElement.kind == ElementKind.TYPEDEFINITION) {
            if (buildinElement.name == Strings.VOID) {
                return TypeKindEnum.VOID;
            } else if (TypeHelper.nativeType.includes(buildinElement.name)) {
                return TypeKindEnum.NUMBER;
            }
            let declaration = <TypeDeclaration>(<TypeDefinition>buildinElement).declaration;
            let definitionNode = <NamedTypeNode>declaration.type;
            let name = definitionNode.name.range.toString();
            return TypeHelper.getTypeKindByName(name);
        } else if (buildinElement.kind == ElementKind.CLASS_PROTOTYPE) {
            return TypeHelper.getTypeKindByName(buildinElement.name);
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
        if (element && element.kind == ElementKind.TYPEDEFINITION) {
            let defineElement = <TypeDefinition>element;
            let aliasTypeName = defineElement.typeNode.range.toString();
            let defineType = this.parent.lookup(aliasTypeName);
            if (defineType) {
                return this.findBuildinElement(defineType);
            }
        }
        return element;
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
    isCodec = true;
    plainType: string;
    plainTypeNode: string; // that with argument
    codecType: string;
    codecTypeAlias: string; // original contract type
    // Used for array and map
    instanceType = ""; // Specify contract type that concrete type
    definedCodeType = "";
    abiType: string;
    index = 0;
    capacity = 0;

    constructor(parent: Element, typeNode: NamedTypeNode) {
        this.parent = parent;
        this.typeNode = typeNode;
        this.plainTypeNode = typeNode.range.toString();
        this.definedCodeType = this.plainTypeNode;
        this.plainType = typeNode.name.range.toString();
        this.typeKind = this.getTypeKind();
        this.abiType = TypeHelper.getAbiType(this.plainType);
        this.codecType = TypeHelper.getCodecType(this.plainType);
        this.codecTypeAlias = this.getNameSpace() + this.codecType;
        if (this.typeKind != TypeKindEnum.ARRAY && this.typeKind != TypeKindEnum.MAP) {
            this.plainTypeNode = this.codecTypeAlias;
            this.definedCodeType = this.codecType;
        }
        // this.resolveArguments();
    }

    /**
     * Export all codec type
     * @returns
     */
    getTypeKey(): string {
        if (TypeHelper.isPrimitiveType(this.typeKind)) {
            return this.codecType;
        }
        return this.definedCodeType + this.capacity;
    }


    public getNameSpace(): string {
        return this.typeKind == TypeKindEnum.USER_CLASS || this.typeKind == TypeKindEnum.ARRAY ? "" : "_lang.";
    }

    // TODO
    public genTypeSequence(definedTypeMap: Map<string, NamedTypeNodeDef>): void {
        let typeName = this.getTypeKey();
        if (definedTypeMap.has(typeName)) {
            let typeDef = definedTypeMap.get(typeName);
            this.index = typeDef!.index;
        } else {
            this.index = definedTypeMap.size + 1;
            definedTypeMap.set(typeName, this);
        }
        if (this.typeKind == TypeKindEnum.USER_CLASS) {
            let clzPrototype = <ClassPrototype>this.current;
            let classInter = new ClassInterpreter(clzPrototype);
            classInter.fields.forEach(item => item.type.genTypeSequence(definedTypeMap));
        } else if (this.typeKind == TypeKindEnum.ARRAY) {
            this.typeArguments.forEach(item => item.genTypeSequence(definedTypeMap));
        }
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
        let element = this.parent.lookup(this.plainType)!;
        let buildinElement: Element = this.findBuildinElement(element);
        this.current = buildinElement;
        // console.log(`this.current: ${element.name}`);
        // console.log(`this.plainType: ${this.plainType}`);
        // console.log(`Element ${ElementKind[buildinElement.kind]}, ${buildinElement.name}, ${this.plainType}`);
        if (buildinElement.kind == ElementKind.FUNCTION_PROTOTYPE) {
            this.isCodec = false;
            return TypeKindEnum.NUMBER;
        } else if (buildinElement.kind == ElementKind.TYPEDEFINITION) {
            if (buildinElement.name == Strings.VOID) {
                this.isCodec = false;
                return TypeKindEnum.VOID;
            } else if (TypeHelper.nativeType.includes(buildinElement.name)) {
                this.isCodec = false;
                return TypeKindEnum.NUMBER;
            }
            let declaration = <TypeDeclaration>(<TypeDefinition>buildinElement).declaration;
            let definitionNode = <NamedTypeNode>declaration.type;
            // console.log(`TYPEDEFINITION ${definitionNode.range.toString()},  ${buildinElement.name}`);
            let name = definitionNode.name.range.toString();
            return TypeHelper.getTypeKindByName(name);
        } else if (buildinElement.kind == ElementKind.CLASS_PROTOTYPE) {
            let type = TypeHelper.getTypeKindFromUnCodec(buildinElement.name);
            if (type) {
                this.isCodec = false;
                return type;
            }
            return TypeHelper.getTypeKindByName(buildinElement.name);
        }
        this.isCodec = true;
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

    /**
     * Argument maybe also generic.
     */
    private resolveArguments(): void {
        var args = this.typeNode.typeArguments;
        if (args) {
            for (let arg of args) {
                if (arg.kind == NodeKind.NAMEDTYPE) {
                    let argumentTypeNode: NamedTypeNodeDef = new NamedTypeNodeDef(this.parent, <NamedTypeNode>arg);
                    this.typeArguments.push(argumentTypeNode);
                }
            }
        }
    }
}

export class ArrayNameTypeNode extends NamedTypeNodeDef {
    typeArguments: NamedTypeNodeDef[] = [];
    capacity = 0;
    constructor(parent: Element, typeNode: NamedTypeNode) {
        super(parent, typeNode);
    }
}