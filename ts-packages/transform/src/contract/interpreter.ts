import { DeclaredElement, Range} from "assemblyscript";
import { DecoratorUtil } from "../utils/decoratorutil";
import { getCustomDecoratorKind, getDecoratorPairs } from "./decorator";

export class Interpreter {
    element: DeclaredElement;
    range: Range;
    rangeStr: string;
    name: string;
    doc: string[];

    constructor(element: DeclaredElement) {
        this.element = element;
        this.range = this.element.declaration.range;
        this.rangeStr = this.range.toString();
        this.name = element.name;
        this.doc = DecoratorUtil.getDoc(this.element.declaration);
    }

    // public getDecorator(kind: ContractDecoratorKind, key: string): string | boolean {
    //     let val = "";
    //     this.element.decoratorNodes?.filter(item => getCustomDecoratorKind(item) == kind).forEach(item => {
    //         let pairs = getDecoratorPairs(item);
    //         if (pairs.has(key)) {
    //             val = pairs.get(key)!;
    //         }
    //     });
    //     return val;
    // }
}