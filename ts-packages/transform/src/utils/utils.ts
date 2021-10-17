import {
    DeclarationStatement,
    ClassDeclaration,
    DecoratorNode,
    ClassPrototype,
    Element,
    ElementKind,
    FunctionPrototype,
    Expression,
    IdentifierExpression,
    NodeKind,
    BinaryExpression,
    SourceKind,
    FieldPrototype,
    NamedTypeNode,
    Range,
    CommonFlags
} from "assemblyscript";
import { ContractDecoratorKind } from "../enums/decorator";
import { DecoratorUtil } from "./decoratorutil";
import { Strings } from "./primitiveutil";
export class ElementUtil {

    static isEventClassPrototype(element: Element): boolean {
        if (element.kind == ElementKind.CLASS_PROTOTYPE) {
            let clzPrototype = <ClassPrototype>element;
            return AstUtil.hasSpecifyDecorator(clzPrototype.declaration, ContractDecoratorKind.EVENT);
        }
        return false;
    }

    static isUserEntryFile(range: Range) : boolean {
        return range.source.sourceKind == SourceKind.USER_ENTRY;
    }

    static isTopContractClass(element: Element): boolean {
        if (element.kind == ElementKind.CLASS_PROTOTYPE) {
            let clzPrototype = <ClassPrototype>element;
            return ElementUtil.isUserEntryFile(clzPrototype.declaration.range) &&
                AstUtil.hasSpecifyDecorator(clzPrototype.declaration, ContractDecoratorKind.CONTRACT);
        }
        return false;
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

    /**
     * Whether the element is field prototype.
     * @param element 
     * @returns 
     */
    static isField(element: Element): boolean {
        return element.kind == ElementKind.FIELD_PROTOTYPE;
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
        return AstUtil.getSpecifyDecorator(statement, ContractDecoratorKind.DOC);
    }

    /**
      * Check the statment weather have the specify the decorator
      * @param statement Ast declaration statement
      * @param kind The specify decorators
      */
    static hasSpecifyDecorator(statement: DeclarationStatement, kind: ContractDecoratorKind): boolean {
        if (statement.decorators) {
            return DecoratorUtil.containDecorator(statement.decorators, kind);
        }
        return false;
    }

    static getSpecifyDecorator(statement: DeclarationStatement, kind: ContractDecoratorKind): DecoratorNode | null {
        if (statement.decorators) {
            for (let decorator of statement.decorators) {
                if (DecoratorUtil.matchKind(decorator, kind)) {
                    return decorator;
                }
            }
        }
        return null;
    }

    /**
       * Get the basic type name
       * If the type name is string[], so the basic type name is string
       * @param declareType
       */
    static getArrayArgument(declareType: string): string {
        var bracketIndex = declareType.indexOf("[");
        if (bracketIndex != -1) {
            return declareType.substring(0, bracketIndex).trim();
        }
        bracketIndex = declareType.indexOf("<");
        if (bracketIndex != -1) {
            let endIndex = declareType.indexOf(">");
            return declareType.substring(bracketIndex + 1, endIndex).trim();
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
            || declareType == "StorableArray"
            || declareType == "SpreadStorableArray"
            || declareType == "PackedStorableArray";
    }

    /**
       * Whether the declare type is map
       * @param declareType the declare type
       */
    static isMapType(declareType: string): boolean {
        return declareType == "Map"
            || declareType == "StorableMap"
            || declareType == "SpreadStorableMap"
            || declareType == "PackedStorableMap";
    }

    static checkPublicModifier(declaration: DeclarationStatement): void {
        if (declaration.isAny(CommonFlags.PRIVATE)) {
            throw new Error(`Decorator[@message] should mark on public method(Method: ${declaration.name.range.toString()} isn't public method). Check ${RangeUtil.location(declaration.range)}.`);
        }
    }
}
export class RangeUtil {
    public static location(range: Range): string {
        return `source text: ${range.toString()} in path:${range.source.normalizedPath} lineAt: ${range.source.lineAt(range.start)} columnAt: ${range.source.columnAt()} range: (${range.start.toString(10)} ${range.end.toString(10)}).`;
    }
}