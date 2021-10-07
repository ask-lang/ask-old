import { DeclarationStatement, DecoratorNode } from "assemblyscript";
import { getCustomDecoratorKind } from "../contract/decorator";
import { DocDecoratorNodeDef } from "../contract/elementdef";
import { ContractDecoratorKind } from "../enums/decorator";
import { Strings } from "./primitiveutil";
import { AstUtil, RangeUtil } from "./utils";

export class DecoratorUtil {

    static isDecoratorKind(decorator: DecoratorNode, kind: ContractDecoratorKind): boolean {
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

    public static getDoc(statement: DeclarationStatement): string[] {
        let decortor = AstUtil.getDocDecorator(statement);
        return decortor == null ? [Strings.EMPTY] : [new DocDecoratorNodeDef(decortor).doc];
    }

    public static checkSelector(decorator: DecoratorNode, selector: string): void {
        let isLegal = false;
        if (selector) {
            var re = /0x[0-9A-Fa-f]{8}/g;
            if (re.test(selector)) {
                isLegal = true;
            }
        }
        if (!isLegal) {
            throw new Error(`Decorator: ${decorator.name.range.toString()} argument selector value should be start with 0x hex string(4 Bytes). Trace: ${RangeUtil.location(decorator.range)} `);
        }
    }

    public static checkMutates(decorator: DecoratorNode, val: string): void {
        let isLegal = (val == 'false');
        if (!isLegal) {
            throw new Error(`Decorator: ${decorator.name.range.toString()} argument mutates value should be false. Trace: ${RangeUtil.location(decorator.range)} `);
        }
    }

    public static throwNoArguException(decorator: DecoratorNode, identifier: string): void {
        throw new Error(`Decorator: ${decorator.name.range.toString()} should not contain argument ${identifier}. Trace: ${RangeUtil.location(decorator.range)} `);
    }
}