import {
    FieldDeclaration,
    NamedTypeNode,
    NodeKind,
    ParameterNode,
    TypeNode,
    Element,
    FieldPrototype,
    FunctionPrototype,
    DecoratorNode,
    FunctionDeclaration
} from "assemblyscript";

import { AstUtil, ElementUtil, RangeUtil } from "../utils/utils";
import { ArgumentSpec, ConstructorSpec, MessageSpec, TypeSpec } from "contract-metadata/src";
import { KeySelector } from "../preprocess/selector";
import { MetadataUtil } from "../utils/metadatautil";
import { ContractDecoratorKind } from "../enums/decorator";
import { FieldDefHelper, TypeHelper } from "../utils/typeutil";
import { TypeKindEnum } from "../enums/customtype";
import { NamedTypeNodeDef } from "./typedef";
import { Interpreter } from "./interpreter";
import { toDecoratorDef, MessageDecoratorNodeDef, StateDecoratorNodeDef } from "./decorator";
import { ArrayLayout, CellLayout, CryptoHasher, FieldLayout, HashingStrategy, HashLayout, StructLayout } from "contract-metadata/src/layouts";


export class DecoratorInfo {
    decorators: DecoratorNode[] = [];
    ignore = true;
    isTopic = false;
    isPacked = false;
    isLazy = false;
    capacity = 0;

    constructor(decorators: DecoratorNode[] | null) {
        if (!decorators) {
            return ;
        }
        this.decorators = decorators;
        for (let decorator of this.decorators) {
            let decoratorNode = toDecoratorDef(decorator);
            let kind = decoratorNode.kind;
            if (kind == ContractDecoratorKind.INTERNAL) {
                continue;
            }
            if (kind == ContractDecoratorKind.TOPIC) {
                this.isTopic = true;
            }
            // if has no STATE decorator, ignore the field
            if (kind == ContractDecoratorKind.STATE) {
                this.isLazy = (<StateDecoratorNodeDef>decoratorNode).lazy;
                this.ignore = (<StateDecoratorNodeDef>decoratorNode).ignore;
            }
            if (kind == ContractDecoratorKind.PACKED) {
                this.isPacked = true;
                this.capacity = decoratorNode.getIfAbsent("capacity", 0, "number");
            }
            if (kind == ContractDecoratorKind.SPREAD) {
                this.isPacked = false;
                this.capacity = decoratorNode.getIfAbsent("capacity", 0, "number");
            }
        }
    }
}

export class FieldDef extends Interpreter {
    type!: NamedTypeNodeDef;
    selector: KeySelector;
    varName: string;
    lazy = false;
    declaration: FieldDeclaration;
    decorators: DecoratorInfo;

    constructor(prototype: FieldPrototype) {
        super(prototype);
        this.declaration = <FieldDeclaration>prototype.declaration;
        this.varName = "_" + this.name;
        this.decorators = new DecoratorInfo(this.element.declaration.decorators);
        let storeKey = this.element.internalName + this.name;
        this.selector = new KeySelector(storeKey);
        this.lazy = this.decorators.isLazy;
        this.resolveField();
    }

    /**
     * Resolve fields
     */
    private resolveField(): void {
        let commonType: TypeNode | null = this.declaration.type;
        if (commonType && commonType.kind == NodeKind.NAMEDTYPE) {
            let typeNode = <NamedTypeNode>commonType;
            this.type = new NamedTypeNodeDef(this.element, typeNode);
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

    createMetadata(): FieldLayout[] {
        return [this.getFiledLayout()];
    }


    private getArrayLayout(field: FieldDef): FieldLayout {
        let lenCellLayout = new CellLayout(field.selector.hex, field.type.index);
        let lenFieldLayout = new FieldLayout("len", lenCellLayout);

        let arrLayout = new ArrayLayout(field.selector.key, field.type.capacity, 1, lenCellLayout);
        let arrFiledLayout = new FieldLayout("elems", arrLayout);

        let arrStruct = new StructLayout([lenFieldLayout, arrFiledLayout]);
        return new FieldLayout(field.name, arrStruct);
    }

    private getMapLayout(field: FieldDef): FieldLayout {
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


    private getFiledLayout(): FieldLayout {
        let field = this;
        if (TypeHelper.isPrimitiveType(field.type.typeKind)) {
            let layout = new CellLayout(field.selector.hex, field.type.index);
            return new FieldLayout(field.name, layout);
        } else if (field.type.typeKind == TypeKindEnum.ARRAY) {
            return this.getArrayLayout(field);
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
            return this.getMapLayout(field);
        }
        let layout = new CellLayout(field.selector.hex, field.type.index);
        return new FieldLayout(field.name, layout);
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

export class FunctionDef extends Interpreter {
    declaration: FunctionDeclaration;
    parameters: ParameterNodeDef[] = [];
    isReturnable = false;
    isConstructor = false;
    returnType: NamedTypeNodeDef | null = null;

    constructor(public element: FunctionPrototype, public lazy = false) {
        super(element);
        this.declaration = <FunctionDeclaration>element.declaration;
        this.resolve();
    }

    resolve(): void {
        let params = this.element.functionTypeNode.parameters;
        params.forEach(param => {
            this.parameters.push(new ParameterNodeDef(this.element, param));
        });
        this.resolveReturnType();
    }

    resolveReturnType(): void {
        if (this.element.name == "constructor") {
            this.isConstructor = true;
            return ;
        }
        let returnType = this.element.functionTypeNode.returnType;
        let returnTypeDesc = new NamedTypeNodeDef(this.element, <NamedTypeNode>returnType);
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
        AstUtil.checkPublicModifier(this.declaration);
        if (this.isReturnable) {
            throw new Error(`The method that marked by @constructor should return void type. Please check ${RangeUtil.location(this.declaration.range)}`);
        }
    }

    public createMetadata(): ConstructorSpec {
        let args: ArgumentSpec[] = this.parameters.map(item => {
            let type = new TypeSpec(item.type.index, item.type.plainType);
            return new ArgumentSpec(type, item.name);
        });
        return new ConstructorSpec([this.name],
            new KeySelector(this.name).short,
            args, this.doc);
    }
}

export class MessageFunctionDef extends FunctionDef {
    messageDecorator: MessageDecoratorNodeDef;
    mutatable = true;
    selector: KeySelector;
    metadata: MessageSpec;

    constructor(funcPrototype: FunctionPrototype) {
        super(funcPrototype);
        AstUtil.checkPublicModifier(this.declaration);
        let msgDecorator = AstUtil.getSpecifyDecorator(funcPrototype.declaration, ContractDecoratorKind.MESSAGE);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.messageDecorator = new MessageDecoratorNodeDef(msgDecorator!);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.selector = new KeySelector(this.name);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.mutatable = this.messageDecorator.mutates;
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
        let msgSpec = new MessageSpec([this.name],
            this.selector.short,
            args,
            MetadataUtil.createTypeSpec(this.returnType), this.doc);
        msgSpec.setMutates(this.mutatable);
        msgSpec.setPayable(this.messageDecorator.payable);
        return msgSpec;
    }
}