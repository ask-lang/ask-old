import {
    ElementKind,
    Element,
    ClassPrototype,
    FunctionPrototype,
    Program,
    VariableLikeElement,
    FunctionDeclaration,
    DeclarationStatement,
    FieldDeclaration,
    NodeKind,
    ParameterNode,
    Expression,
    VariableLikeDeclarationStatement,
    StringLiteralExpression,
    TypeNode,
    DecoratorNode,
    ClassDeclaration,
    NamedTypeNode,
} from "assemblyscript";

import { AstUtil, ContractDecoratorKind } from "./utils";

import { Strings } from "./primitiveutil";
import { ProgramAnalyzar } from "./analyzer";
import { ContractProgram } from "./interperter";
import { NamedTypeNodeDef } from "./contract/base";
class StructDef {
    name = "";
    fields: Array<{ name: string; type: string }> = [];
    base = "";

    addField(name: string, type: string): void {
        this.fields.push({ name: name, type: type });
    }
}

class AbiAliasDef {
    new_type_name: string;
    type: string;

    constructor(newTypeName: string, wasmType: string) {
        this.new_type_name = newTypeName;
        this.type = wasmType;
    }
}

/**
 * Contract abi action. This class represents one action structure.
 * The field "ability" represents whether action would change the db status.
 * It has two values, normal and pureview.
 * Pureview represents readable action which would not change the db.
 */
class ActionDef {
    name: string;
    type: string;
    ability: string;
    ricardian_contract = "";

    constructor(name: string, type: string, ability = "normal") {
        this.name = name;
        this.type = type;
        this.ability = ability;
    }

    static isValidAbility(ability: string): boolean {
        return ability == "normal" || ability == "pureview";
    }
}

export class AbiHelper {
    /**
     * Main node support internal abi type
     * bool
     */
    static abiTypeLookup: Map<string, string> = new Map([
        ["i8", "int8"],
        ["i16", "int16"],
        ["i32", "int32"],
        ["i64", "int64"],
        ["isize", "uin32"],
        ["u8", "uint8"],
        ["u16", "uint16"],
        ["u32", "uint32"],
        ["u64", "uint64"],
        ["usize", "usize"],
        ["f32", "float32"],
        ["f64", "float64"],
        ["bool", "bool"],
        ["boolean", "bool"],
        ["string", "string"],
        ["String", "string"],
        ["u128", "u128"],
        ["i128", "i128"],
    ]);
}

class TableDef {
    name: string;
    type: string;
    index_type = "i64";
    keys_names: string[] = ["currency"];
    keys_types: string[] = ["uint64"];

    constructor(name: string, type: string, indexType = "i64") {
        this.name = name;
        this.type = type;
        this.index_type = indexType;
    }
}

/**
 * Abi defination
 */
class AbiDef {
    version = "link";
    types: Array<AbiAliasDef> = new Array<AbiAliasDef>();
    structs: Array<StructDef> = new Array<StructDef>();
    actions: Array<ActionDef> = new Array<ActionDef>();
    tables: Array<TableDef> = new Array<TableDef>();
}

export class ContractInfo {
    abiInfo: AbiDef = new AbiDef();
    program: Program;
    abiTypeLookup: Map<string, string> = AbiHelper.abiTypeLookup;
    typeAliasSet: Set<string> = new Set<string>();
    structsLookup: Map<string, StructDef> = new Map();
    elementLookup: Map<string, Element> = new Map();

    constructor(program: Program) {
        this.program = program;
    }

    private addAbiTypeAlias(typeNodeAnalyzer: NamedTypeNodeDef): void {
        var asTypes = typeNodeAnalyzer.getAsTypes();
        for (let asType of asTypes) {
            if (this.typeAliasSet.has(asType)) {
                continue;
            }
            // if the as argument is basic type, get his alias type
            let abiType = typeNodeAnalyzer.findSourceAbiType(asType);
            if (abiType && asType != abiType) {
                this.abiInfo.types.push(new AbiAliasDef(asType, abiType));
            }
            // If the as argument is class, convert it to struct
            let element = typeNodeAnalyzer.findElement(asType);
            if (element && element.kind == ElementKind.CLASS_PROTOTYPE) {
                let classPrototype = <ClassPrototype>element;
                this.getStructFromClzPrototype(classPrototype);
            }
            this.typeAliasSet.add(asType);
        }
    }

    // resolveDatabaseDecorator(clsProto: ClassPrototype): void {
    //   var decorators = clsProto.decoratorNodes;
    //   if (!decorators) {
    //     return;
    //   }
    //   for (let decorator of decorators) {
    //     if (fromNode(decorator.name) == ContractDecoratorKind.DATABASE && decorator.args) {
    //       // Decorator argument must have two arguments
    //       if (decorator.args.length != 2) {
    //         throw new Error("Database decorator must have two arguments");
    //       }
    //       let type = decorator.args[0].range.toString();
    //       let name = this.getExprValue(clsProto, decorator.args[1]);
    //       AbiUtils.checkDatabaseName(name);
    //       this.abiInfo.tables.push(new TableDef(name, type));
    //       this.getStructFromNode(clsProto, decorator.args[0]);
    //     }
    //   }
    // }

    /**
     * Get the expression value.
     * @param expr
     */
    getExprValue(protoEle: Element, expr: Expression): string {
        var arg: string = expr.range.toString();
        if (Strings.isAroundQuotation(arg)) {
            return arg.substring(1, arg.length - 1);
        }
        var element = protoEle.lookup(arg);
        var internalName = AstUtil.getInternalName(expr);
        if (!element) {
            element = this.program.elementsByName.get(internalName) || null;
        }
        if (element) {
            let declaration = <VariableLikeDeclarationStatement>(
                (<VariableLikeElement>element).declaration
            );
            if (declaration.initializer) {
                let literal = <StringLiteralExpression>declaration.initializer;
                return literal.value;
            }
        }
        throw new Error(`Can't find constant ${internalName}`);
    }

    /**
     *  Get struct from expression.
     */
    // private getStructFromNode(ele: Element, node: Node): void {
    //     var element = ele.lookup(node.range.toString());
    //     var classPrototype = <ClassPrototype>element;
    //     this.getStructFromClzPrototype(classPrototype);
    // }

    /**
     * Add the field of the class to the structure
     * @param classPrototype The class prototype
     * @param struct The abi structure
     */
    private addFieldsFromClassPrototype(
        classPrototype: ClassPrototype,
        struct: StructDef
    ): void {
        var members: DeclarationStatement[] = (<ClassDeclaration>(
            classPrototype.declaration
        )).members;
        if (
            classPrototype.basePrototype &&
            AstUtil.impledSerializable(classPrototype.basePrototype)
        ) {
            this.addFieldsFromClassPrototype(
                classPrototype.basePrototype,
                struct
            );
        }
        for (let member of members) {
            if (member.kind == NodeKind.FIELDDECLARATION) {
                let fieldDeclare: FieldDeclaration = <FieldDeclaration>member;
                let memberName = member.name.range.toString();
                let memberType: TypeNode | null = fieldDeclare.type;
                if (
                    memberType &&
                    !AstUtil.hasSpecifyDecorator(
                        fieldDeclare,
                        ContractDecoratorKind.DEPLOYER
                    )
                ) {
                    let typeNodeAnalyzer: NamedTypeNodeDef = new NamedTypeNodeDef(
                        classPrototype,
                        <NamedTypeNode>memberType
                    );
                    let abiType = typeNodeAnalyzer.getDeclareType();
                    struct.addField(memberName, abiType);
                    this.addAbiTypeAlias(typeNodeAnalyzer);
                }
            }
        }
    }

    private getStructFromClzPrototype(classPrototype: ClassPrototype): void {
        if (!this.abiTypeLookup.get(classPrototype.name)) {
            let struct = new StructDef();
            struct.name = classPrototype.name;
            this.addFieldsFromClassPrototype(classPrototype, struct);
            this.addToStruct(struct);
        }
    }

    /**
     * It need to check the struct having fields.
     * @param struct the struct to add
     */
    private addToStruct(struct: StructDef): void {
        if (!this.structsLookup.has(struct.name)) {
            this.abiInfo.structs.push(struct);
            this.structsLookup.set(struct.name, struct);
        }
    }

    /**
     *  Resolve ClassPrototype to dispatcher
     */
    private getActionAbility(funcPrototype: FunctionPrototype): string {
        var statement = funcPrototype.declaration;
        var decoratorNode: DecoratorNode | null = AstUtil.getSpecifyDecorator(
            statement,
            ContractDecoratorKind.MESSAGE
        );
        if (!decoratorNode) {
            throw new Error(
                `The function don't have action decorator, location: ${AstUtil.location(
                    statement.range
                )}.`
            );
        }
        var args: Expression[] | null = decoratorNode.args;
        if (args && args.length > 0) {
            let arg = this.getExprValue(funcPrototype, args[0]);
            if (!ActionDef.isValidAbility(arg)) {
                throw new Error(
                    `Invalid action ability arguments: ${arg}, location: ${AstUtil.location(
                        statement.range
                    )}.`
                );
            }
            return arg;
        }
        return "normal";
    }

    /**
     * Resolve funciton prototype to abi
     */
    resolveFunctionPrototype(funcProto: FunctionPrototype): void {
        var declaration: FunctionDeclaration = <FunctionDeclaration>(
            funcProto.declaration
        );
        var funcName = declaration.name.range.toString();
        var signature = declaration.signature;

        var struct = new StructDef();
        struct.name = funcName;

        var parameters: ParameterNode[] = signature.parameters;
        for (let parameter of parameters) {
            let type: TypeNode = parameter.type;
            let typeInfo = new NamedTypeNodeDef(funcProto, <NamedTypeNode>type);
            let abiType = typeInfo.getDeclareType();
            struct.addField(parameter.name.range.toString(), abiType);
            this.addAbiTypeAlias(typeInfo);
        }

        this.addToStruct(struct);
        this.abiInfo.actions.push(
            new ActionDef(funcName, funcName, this.getActionAbility(funcProto))
        );
    }
}

export function getContractInfo(program: Program): ContractProgram {
    new ProgramAnalyzar(program);
    return new ContractProgram(program);
}
