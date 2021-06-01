import {
    DeclarationStatement,
    DecoratorKind,
    Node,
    ClassDeclaration,
    DecoratorNode,
    ClassPrototype,
    Element,
    ElementKind,
    FunctionPrototype,
    Expression,
    IdentifierExpression,
    CharCode,
    NodeKind,
    BinaryExpression,
    SourceKind,
    FieldPrototype,
    NamedTypeNode,
    Range,
    CommonFlags
} from "assemblyscript";
import { DecoratorNodeDef, DocDecoratorNodeDef, MessageDecoratorNodeDef } from "../contract/elementdef";
import { ContractDecoratorKind } from "../enums/decorator";
import { Strings } from "./primitiveutil";

export function fromNode(nameNode: Expression): ContractDecoratorKind {
    if (nameNode.kind == NodeKind.IDENTIFIER) {
        let nameStr = (<IdentifierExpression>nameNode).text;
        // assert(nameStr.length);
        switch (nameStr.charCodeAt(0)) {
            case CharCode.c: {
                if (nameStr == "contract") return ContractDecoratorKind.CONTRACT;
                if (nameStr == "constructor") return ContractDecoratorKind.CONSTRUCTOR;
                break;
            }
            case CharCode.d: {
                if (nameStr == 'doc') return ContractDecoratorKind.DOC;
                if (nameStr == "dynamic") return ContractDecoratorKind.DYNAMIC;
                break;
            }
            case CharCode.e: {
                if (nameStr == "event") return ContractDecoratorKind.EVENT;
                break;
            }
            case CharCode.i: {
                if (nameStr == "ignore") return ContractDecoratorKind.IGNORE;
                break;
            }
            case CharCode.m: {
                if (nameStr == "message") return ContractDecoratorKind.MESSAGE;
                break;
            }
            case CharCode.p: {
                if (nameStr == "packed") return ContractDecoratorKind.PACKED;
                break;
            }
            case CharCode.s: {
                if (nameStr == "storage") return ContractDecoratorKind.STORAGE;
                if (nameStr == "spread") return ContractDecoratorKind.SPREAD;
                break;
            }
            case CharCode.t: {
                if (nameStr == "topic") return ContractDecoratorKind.TOPIC;
                break;
            }
        }
    }
    return ContractDecoratorKind.OTHER;
}

export class ElementUtil {

    static isEventClassPrototype(element: Element): boolean {
        if (element.kind == ElementKind.CLASS_PROTOTYPE) {
            let clzPrototype = <ClassPrototype>element;
            return AstUtil.hasSpecifyDecorator(clzPrototype.declaration, ContractDecoratorKind.EVENT);
        }
        return false;
    }

    static isTopContractClass(element: Element): boolean {
        if (element.kind == ElementKind.CLASS_PROTOTYPE) {
            let clzPrototype = <ClassPrototype>element;
            return clzPrototype.declaration.range.source.sourceKind == SourceKind.USER_ENTRY &&
                AstUtil.hasSpecifyDecorator(clzPrototype.declaration, ContractDecoratorKind.CONTRACT);
        }
        return false;
    }

    static isStoreClassPrototype(element: Element): boolean {
        return (element.kind == ElementKind.CLASS_PROTOTYPE)
            ? AstUtil.hasSpecifyDecorator((<ClassPrototype>element).declaration, ContractDecoratorKind.STORAGE)
            : false;
    }

    static isDynamicClassPrototype(element: Element): boolean {
        return (element.kind == ElementKind.CLASS_PROTOTYPE)
            ? AstUtil.hasSpecifyDecorator((<ClassPrototype>element).declaration, ContractDecoratorKind.DYNAMIC)
            : false;
    }

    /**
     * Check the element whether is action function prototype.
     * @param element 
     */
    static isCntrFuncPrototype(element: Element): boolean {
        if (element.kind == ElementKind.FUNCTION_PROTOTYPE) {
            return AstUtil.hasSpecifyDecorator((<FunctionPrototype>element).declaration, ContractDecoratorKind.CONSTRUCTOR);
        }
        return false;
    }

    static isTopicField(element: Element): boolean {
        if (element.kind == ElementKind.FIELD_PROTOTYPE) {
            return AstUtil.hasSpecifyDecorator((<FieldPrototype>element).declaration, ContractDecoratorKind.TOPIC);
        }
        return false;
    }

    static isExtendCodec(element: Element): boolean {
        if (element.kind == ElementKind.CLASS_PROTOTYPE) {
            return ElementUtil.impledInterfaces(<ClassPrototype>element).includes("Codec");
        }
        return false;
    }


    /**
       * Get interfaces that class prototype implements.
       * @param classPrototype classPrototype
       */
    static impledInterfaces(classPrototype: ClassPrototype): string[] {
        var tempClz: ClassPrototype | null = classPrototype;
        var interfaces: string[] = new Array<string>();
        while (tempClz != null) {
            let implTypes = (<ClassDeclaration>tempClz.declaration).implementsTypes;
            if (implTypes) {
                for (let type of implTypes) {
                    interfaces.push(type.name.range.toString());
                }
            }
            tempClz = tempClz.basePrototype;
        }
        return interfaces;
    }


    /**
     * Check the element whether is action function prototype.
     * @param element 
     */
    static isMessageFuncPrototype(element: Element): boolean {
        if (element.kind == ElementKind.FUNCTION_PROTOTYPE) {
            let funcType = <FunctionPrototype>element;
            return AstUtil.hasSpecifyDecorator(funcType.declaration, ContractDecoratorKind.MESSAGE);
        }
        return false;
    }
}
export class AstUtil {

    static getSpecifyDecorator(statement: DeclarationStatement, kind: ContractDecoratorKind): DecoratorNode | null {
        if (statement.decorators) {
            for (let decorator of statement.decorators) {
                if (AstUtil.isSpecifyCustomDecorator(decorator, kind)) {
                    return decorator;
                }
            }
        }
        return null;
    }

    static isSpecifyCustomDecorator(decorator: DecoratorNode, kind: ContractDecoratorKind): boolean {
        return  (decorator.decoratorKind == DecoratorKind.CUSTOM && kind == fromNode(decorator.name));
    }

    static containDecorator(decorators: DecoratorNode[], kind: ContractDecoratorKind): boolean {
        for (let decorator of decorators) {
            if (decorator.decoratorKind == DecoratorKind.CUSTOM && kind == fromNode(decorator.name)) {
                return true;
            }
        }
        return false;
    }


    /**
      * Check the statment weather have the specify the decorator
      * @param statement Ast declaration statement
      * @param kind The specify decorators
      */
    static hasSpecifyDecorator(statement: DeclarationStatement, kind: ContractDecoratorKind): boolean {
        if (statement.decorators) {
            for (let decorator of statement.decorators) {
                if (decorator.decoratorKind == DecoratorKind.CUSTOM && kind == fromNode(decorator.name)) {
                    return true;
                }
            }
        }
        return false;
    }

    static isVoid(type: NamedTypeNode): boolean {
        return type.name.range.toString() == "void";
    }
 
    static getIdentifier(expression: Expression): string {
        if (expression.kind == NodeKind.IDENTIFIER) {
            return (<IdentifierExpression>expression).text;
        } else if (expression.kind == NodeKind.BINARY) {
            return (<BinaryExpression>expression).left.range.toString();
        }
        return "";
    }

    static getBinaryExprRight(expression: Expression): string {
        if (expression.kind == NodeKind.BINARY) {
            return (<BinaryExpression>expression).right.range.toString();
        }
        return Strings.EMPTY;
    }

    public static getDocDecorator(statement: DeclarationStatement): DecoratorNode | null {
        return this.getSpecifyDecorator(statement, ContractDecoratorKind.DOC);
    }

    /**
       * Get the basic type name
       * If the type name is string[], so the basic type name is string
       * @param declareType
       */
    static getArrayTypeArgument(declareType: string): string {
        var bracketIndex = declareType.indexOf("[");
        if (bracketIndex != -1) {
            let index = declareType.indexOf(" ") == -1 ? bracketIndex : declareType.indexOf(" ");
            return declareType.substring(0, index);
        }
        bracketIndex = declareType.indexOf("<");
        if (bracketIndex != -1) {
            let endIndex = declareType.indexOf(">");
            return declareType.substring(bracketIndex + 1, endIndex);
        }
        return declareType;
    }

    /**
       * Test the declare type whether is array type or not.
       * @param declareType The declare type
       */
    static isArrayType(declareType: string): boolean {
        return declareType == "[]"
            || declareType == "Array"
            || declareType == "SpreadStorableArray"
            || declareType == "PackedStorableArray";
    }

    /**
       * Whether the declare type is map
       * @param declareType the declare type
       */
    static isMapType(declareType: string): boolean {
        return declareType == "Map"
            || declareType == "SpreadStorableMap"
            || declareType == "PackedStorableMap";
    }

    static checkPublic(declaration: ClassDeclaration): void {
        if (declaration.isAny(CommonFlags.PRIVATE)) {
            throw new Error(`Method: ${declaration.name.range.toString()} should be public. Trace: ${RangeUtil.location(declaration.range)}.`);
        }
    }
}
export class RangeUtil {
    public static location(range: Range): string {
        return `content: ${range.toString()} path:${range.source.normalizedPath}
            lineAt: ${range.source.lineAt(range.start)} columnAt: ${range.source.columnAt()}
            range: (${range.start.toString(10)} ${range.end.toString(10)}).`;
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

    public static checkSelecrot(decorator: DecoratorNode, selector: string): void {
        let isLegal = false;
        if (selector) {
            var re = /0x[0-9A-Fa-f]{8}/g;
            if (re.test(selector)) {
                isLegal = true;
            }
        }
        if (!isLegal) {
            throw new Error(`Decorator: ${decorator.name.range.toString()} argument selector should be start with 0x hex string(4 Bytes). Trace: ${RangeUtil.location(decorator.range)} `);
        }
    }

    public static checkMutates(decorator: DecoratorNode, val: string): void {
        let isLegal = (val == 'false');
        if (!isLegal) {
            throw new Error(`Decorator: ${decorator.name.range.toString()} argument mutates should be false. Trace: ${RangeUtil.location(decorator.range)} `);
        }
    }

    public static throwNoArguException(decorator: DecoratorNode, identifier: string): void {
        throw new Error(`Decorator: ${decorator.name.range.toString()} should not contain argument ${identifier}. Trace: ${RangeUtil.location(decorator.range)} `);
    }

    
}
