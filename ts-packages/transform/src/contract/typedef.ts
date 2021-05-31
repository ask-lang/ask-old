import {
    NamedTypeNode,
    NodeKind,
    TypeDeclaration,
    Element,
    ElementKind,
    TypeDefinition,
    ClassPrototype,
} from "assemblyscript";


import { TypeHelper } from "../utils/typeutil";
import { TypeKindEnum } from "../enums/customtype";
import { ClassInterpreter } from "./classdef";
import { Strings } from "../utils/primitiveutil";
import { CONFIG } from "../config/compile";
import { ElementUtil } from "../utils/utils";
import { Collections } from "../utils/collectionutil";


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
        this.resolveArguments();
    }

    /**
     * Export all codec type
     * @returns
     */
    getTypeKey(): string {
        if (TypeHelper.isPrimitiveType(this.typeKind)) {
            return this.codecType;
        } else if (this.typeKind == TypeKindEnum.ARRAY) {
            return this.isCodec + this.definedCodeType + this.capacity;
        }
        return this.definedCodeType + this.capacity;
    }


    public getNameSpace(): string {
        return this.typeKind == TypeKindEnum.USER_CLASS || this.typeKind == TypeKindEnum.ARRAY ? "" : CONFIG.scope;
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
            this.resolveClassType(<ClassPrototype>this.current, definedTypeMap);
        } else if (this.typeKind == TypeKindEnum.ARRAY) {
            this.typeArguments.forEach(item => item.genTypeSequence(definedTypeMap));
        } else if (this.typeKind == TypeKindEnum.MAP) {
            this.typeArguments.forEach(item => item.genTypeSequence(definedTypeMap));
        }
    }

    /**
     * Resolve the class type
     * @param clzPrototype 
     * @param typeMap 
     * @returns 
     */
    private resolveClassType(clzPrototype: ClassPrototype, typeMap: Map<string, NamedTypeNodeDef>): boolean {
        let interpreter = new ClassInterpreter(clzPrototype);
        interpreter.resolveFieldMembers();
        if (clzPrototype.name === 'AccountId') {
            interpreter.fields.forEach(item => {
                if (item.type.typeKind == TypeKindEnum.ARRAY) {
                    item.type.capacity = 32;
                }
                item.type.genTypeSequence(typeMap);
            });
            return true;
        } else {
            interpreter.fields.forEach(item => {
                item.type.genTypeSequence(typeMap);
            });
        }
        return false;
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
        if (!element) {
            return TypeHelper.getTypeKindByName(this.plainType);
        }
        let buildinElement: Element = this.findBuildinElement(element);
        this.current = buildinElement;
        // console.log(`this.plainType: ${this.plainType}`);
        // if (this.plainType == "[]") {
        //     console.log(`element: ${element}`);
        // }
        // console.log(`buildinElement: ${buildinElement.name}`);
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
            let classTypeKind = TypeHelper.getTypeKindByName(buildinElement.name);
            if (classTypeKind == TypeKindEnum.USER_CLASS) {
                this.isCodec = ElementUtil.isExtendCodec(buildinElement);
            }
            return classTypeKind;
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