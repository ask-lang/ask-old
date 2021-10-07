/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CharCode, DecoratorKind, DecoratorNode, Expression, IdentifierExpression, NodeKind } from "assemblyscript";
import { ContractDecoratorKind } from "../enums/decorator";
import { Strings } from "../utils/primitiveutil";
import { AstUtil, RangeUtil } from "../utils/utils";

function fromNode(nameNode: Expression): ContractDecoratorKind {
    if (nameNode.kind == NodeKind.IDENTIFIER) {
        let nameStr = (<IdentifierExpression>nameNode).text;
        switch (nameStr.charCodeAt(0)) {
            case CharCode.c: {
                if (nameStr == "contract") return ContractDecoratorKind.CONTRACT;
                if (nameStr == "constructor") return ContractDecoratorKind.CONSTRUCTOR;
                break;
            }
            case CharCode.d: {
                if (nameStr == 'doc') return ContractDecoratorKind.DOC;
                if (nameStr == "dynamic") return ContractDecoratorKind.DYNAMIC;
                if (nameStr == "immediately") return ContractDecoratorKind.IMMEDIATELY;
                break;
            }
            case CharCode.e: {
                if (nameStr == "event") return ContractDecoratorKind.EVENT;
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
                if (nameStr == "spread") return ContractDecoratorKind.SPREAD;
                if (nameStr == "state") return ContractDecoratorKind.STATE;
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

export function getCustomDecoratorKind(decorator: DecoratorNode): ContractDecoratorKind {
    if (decorator.decoratorKind != DecoratorKind.CUSTOM) {
        return ContractDecoratorKind.INTERNAL;
    }
    let kind = fromNode(decorator.name);
    if (kind == ContractDecoratorKind.OTHER) {
        throw new Error(`The contract don't support the decorator ${decorator.name.range.toString()}, please eheck ${RangeUtil.location(decorator.range)}`);
    }
    return kind;
}

export function toPairs(decorator: DecoratorNode): Map<string, string> {
    let pairs = new Map<string, string>();

    decorator.args && decorator.args.forEach(expression => {
        if (expression.kind == NodeKind.BINARY) {
            let identifier = AstUtil.getIdentifier(expression);
            let val = AstUtil.getBinaryExprRight(expression);
            pairs.set(identifier, val.trim());
        }
        // Todo using the strict logical
        if (expression.kind == NodeKind.LITERAL) {
            let exp = expression.range.toString().trim();
            let regex = new RegExp(/{|}|,/);
            regex.test(exp);
            let result = Strings.splitString(exp, regex);
            for (let item of result) {
                let pairItem = item.split(/:/);
                pairs.set(pairItem[0].trim(), pairItem[1].trim());
            }
        }
    });
    return pairs;
}

function checkDecoratorField(map: Map<string, string>, key: string, required: boolean, regex: RegExp, defaultVal: string): void {
    if (required && !map.has(key)) {
        throw Error(`field ${key} is not exist.`);
    }
    if (map.has(key)) {
        let val = map.get(key)!;
        if (!regex.test(val)) {
            throw Error(`filed ${key} should match the pattern ${regex}`);
        }
    } else {
        map.set(key, defaultVal);
    }
}

export function getDecoratorPairs(decorator: DecoratorNode): Map<string, string> {
    let pairs = toPairs(decorator);
    switch (getCustomDecoratorKind(decorator)) {
        case ContractDecoratorKind.STATE: {
            checkDecoratorField(pairs, "lazy", false, /false|true/g, "true");
            break;
        }
        case ContractDecoratorKind.DOC: {
            checkDecoratorField(pairs, "desc", true, /\\*/g, "");
            break;
        }
    }
    return pairs;
}

// export function getDecorator()