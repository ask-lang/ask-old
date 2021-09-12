import { DeclaredElement, Range} from "assemblyscript";
import { Strings } from "../utils/primitiveutil";
import { DecoratorUtil } from "../utils/utils";

export class Interpreter {
    element: DeclaredElement;
    range: Range;
    rangeStr: string;
    camelName: string;
    name: string;
    doc: string[];

    constructor(element: DeclaredElement) {
        this.element = element;
        this.range = this.element.declaration.range;
        this.rangeStr = this.range.toString();
        console.log(`rangeStr: ${this.rangeStr}`);
        this.name = element.name;
        this.camelName = Strings.lowerFirstCase(this.name);
        this.doc = DecoratorUtil.getDoc(this.element.declaration);
    }
}