import { ToMetadata } from ".";
import {
    IVariant,
    IVariantDef,
    ICompositeDef,
    ITupleDef,
    IArrayDef,
    ISequenceDef,
    IPrimitiveDef,
    IField,
    ITypeDef,
} from "./specs";

export enum TypeKind {
    Primitive,
    Tuple,
    Array,
    Sequence,
    Composite,
    Variant,
    Compact,
    Phantom,
}

export interface Type extends ToMetadata {
    typeKind(): TypeKind;

    toMetadata(): ITypeDef;
}

export class PrimitiveDef implements Type {
    // TODO: use enum?
    constructor(public readonly primitive: string) {}

    typeKind(): TypeKind {
        return TypeKind.Primitive;
    }
    toMetadata(): IPrimitiveDef {
        return {
            def: {
                primitive: this.primitive,
            },
        };
    }
}

export class TupleDef implements Type {
    constructor(public readonly fields: Array<number>) {}

    typeKind(): TypeKind {
        return TypeKind.Tuple;
    }

    toMetadata(): ITupleDef {
        return {
            def: {
                tuple: {
                    fields: this.fields,
                },
            },
        };
    }
}

export class ArrayDef implements Type {
    constructor(public readonly len: number, public readonly type: number) {}

    typeKind(): TypeKind {
        return TypeKind.Array;
    }

    toMetadata(): IArrayDef {
        return {
            def: {
                array: {
                    len: this.len,
                    type: this.type,
                },
            },
        };
    }
}

export class SequenceDef implements Type {
    constructor(public readonly type: number) {}

    typeKind(): TypeKind {
        return TypeKind.Sequence;
    }

    toMetadata(): ISequenceDef {
        return {
            def: {
                sequence: {
                    type: this.type,
                },
            },
        };
    }
}

export class CompositeDef implements Type {
    constructor(public readonly fields: Array<Field>) {}

    typeKind(): TypeKind {
        return TypeKind.Composite;
    }
    toMetadata(): ICompositeDef {
        return {
            def: {
                composite: {
                    fields: this.fields.map((f) => f.toMetadata()),
                },
            },
        };
    }
}

export class VariantDef implements Type {
    constructor(public readonly variants: Array<Variant>) {}

    typeKind(): TypeKind {
        return TypeKind.Variant;
    }

    toMetadata(): IVariantDef {
        return {
            def: {
                variants: this.variants.map((v) => v.toMetadata()),
            },
        };
    }
}

// TODO:
// export class CompactDef implements Type {
//     typeKind(): TypeKind {
//         return TypeKind.Compact;
//     }
//     toMetadata() {
//         throw new Error("Method not implemented.");
//     }
// }

// TODO:
// export class PhantomDef implements Type {
//     typeKind(): TypeKind {
//         return TypeKind.Phantom;
//     }
//     toMetadata() {
//         throw new Error("Method not implemented.");
//     }
// }

export class Variant implements ToMetadata {
    constructor(
        public readonly name: string,
        public readonly fields: Array<Field>,
        public readonly discriminant: number | null
    ) {}

    toMetadata(): IVariant {
        return {
            name: this.name,
            fields: this.fields.map((f) => f.toMetadata()),
            discriminant: this.discriminant,
        };
    }
}

export class Field implements ToMetadata {
    constructor(
        public readonly name: string | null,
        public readonly type: number,
        public readonly typeName: string
    ) {}

    toMetadata(): IField {
        return this;
    }
}
