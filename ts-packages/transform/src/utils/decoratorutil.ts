import { DeclarationStatement, DecoratorNode } from "assemblyscript";
import { DocDecoratorNodeDef, getCustomDecoratorKind } from "../contract/decorator";
import { ContractDecoratorKind } from "../enums/decorator";
import { Strings } from "./primitiveutil";
import { AstUtil, RangeUtil } from "./utils";

export class DecoratorUtil {

    static matchKind(decorator: DecoratorNode, kind: ContractDecoratorKind): boolean {
        return kind == getCustomDecoratorKind(decorator);
    }

    static containDecorator(decorators: DecoratorNode[], kind: ContractDecoratorKind): boolean {
        for (let decorator of decorators) {
            if (getCustomDecoratorKind(decorator) == kind) {
                return true;
            }
        }
        return false;
    }

    /**
     * Get the decorator of doc
     * @param statement 
     * @returns 
     */
    public static getDoc(statement: DeclarationStatement): string[] {
        let decortor = AstUtil.getDocDecorator(statement);
        return decortor == null ? [Strings.EMPTY] : [new DocDecoratorNodeDef(decortor).doc];
    }

    /**
     * Check the selector
     * @param decorator 
     * @param selector 
     * @returns 
     */
    public static checkSelector(decorator: DecoratorNode, selector: string): void {
        if (selector) {
            var re = /0x[0-9A-Fa-f]{8}/g;
            if (re.test(selector)) {
                return ;
            }
        }
        throw new Error(`Decorator: ${decorator.name.range.toString()} argument selector should be start with 0x hex string(4 Bytes). Check ${RangeUtil.location(decorator.range)}.`);
    }

    public static throwNoArguException(decorator: DecoratorNode, identifier: string): void {
        throw new Error(`Decorator: ${decorator.name.range.toString()} don't contain argument ${identifier}. Check ${RangeUtil.location(decorator.range)}.`);
    }
}