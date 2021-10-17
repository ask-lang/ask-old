import { DeclaredElement, Range} from "assemblyscript";
import { DecoratorUtil } from "../utils/decoratorutil";

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
}