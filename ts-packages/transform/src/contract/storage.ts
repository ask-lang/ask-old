export class TypePair {
    key = "";
    ty = 0;
}

export class StorageDef {
    className = "";
    fields: FieldDef[] = [];
}

export class LayoutDef {
}

export class CellLayoutDef extends LayoutDef {
    cell: TypePair = new TypePair();
}

export class FieldDef {
    layout: LayoutDef = new LayoutDef();
    name = "";
    fieldType = "";
    fieldCodecType: string | undefined = "";
    storeKey = "";
    varName = "";
    path = "";
}