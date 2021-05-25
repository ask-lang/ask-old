export interface IContractMetadata {
    readonly metadataVersion: string;
    readonly source: ISource;
    readonly contract: IContract;
    readonly spec: IContractSpec;
    readonly types: Array<ITypeDef>;
    readonly storage: ILayout;
}

export interface ISource {
    readonly hash: string;
    language: string;
    readonly compiler: string;
}

export type ITypeDef =
    | IPrimitiveDef
    | ITupleDef
    | IArrayDef
    | ISequenceDef
    | ICompositeDef
    | IVariantDef;

interface Def<T> {
    readonly def: T;
}

export type ILayout = IStructLayout | ICellLayout | IHashLayout | IArrayLayout | StructLayout;

export interface IStructLayout {
    struct: ArrayFieldLayout;
}

export interface ArrayFieldLayout {
    fields: Array<IFieldLayout>;
}

export interface ICellLayout {
    readonly key: string;
    readonly ty: number;
}

export interface IArrayLayout {
    readonly offset: string;
    readonly len: number;
    readonly cellsPerElem: number;
    readonly layout: ILayout;
}

export interface IFieldLayout {
    readonly name: string | null;
    readonly layout: ILayout;
}

export interface IHashLayout {
    readonly offset: string;
    readonly strategy: IHashingStrategy;
    readonly layout: ILayout;
}

export interface IHashingStrategy {
    readonly hasher: string;
    readonly prefix: string;
    readonly postfix: string;
}

export type IPrimitiveDef = Def<{
    primitive: string;
}>;

export type ITupleDef = Def<{
    tuple: {
        fields: Array<number>;
    };
}>;

export type IArrayDef = Def<{
    array: {
        len: number;
        type: number;
    };
}>;

export type ISequenceDef = Def<{
    sequence: {
        type: number;
    };
}>;

export type ICompositeDef = Def<{
    composite: {
        fields: Array<IField>;
    };
}>;

export type IVariantDef = Def<{
    variants: Array<IVariant>;
}>;

export interface IVariant {
    readonly name: string;
    readonly fields: Array<IField>;
    readonly discriminant: number | null;
}

export interface IField {
    readonly name?: string | null;
    readonly type: number;
}

export interface IContract {
    readonly name: string;
    readonly version: string;
    readonly authors: Array<string>;
    readonly description: string | null;
    readonly documentation: string | null;
    readonly repository: string | null;
    readonly homepage: string | null;
    readonly license: string | null;
}

export interface IContractSpec {
    /**
     * The set of constructors of the contract.
     */
    readonly constructors: Array<IConstructorSpec>;
    /**
     * The external messages of the contract.
     */
    readonly messages: Array<IMessageSpec>;
    /**
     * The events of the contract.
     */
    readonly events: Array<IEventSpec>;
    /**
     * The contract documentation.
     */
    readonly docs: Array<string>;
}

export interface IConstructorSpec extends NameSelectorSpec {
    /// The parameters of the deploy handler.
    readonly args: Array<IMessageParamSpec>;
    readonly docs: Array<string>;
}

export interface IMessageSpec extends NameSelectorSpec {
    /// If the message is allowed to mutate the contract state.
    readonly mutates: boolean;
    /// If the message is payable by the caller.
    readonly payable: boolean;
    /// The parameters of the message.
    readonly args: Array<IMessageParamSpec>;
    /// The return type of the message.
    readonly returnType: ITypeSpec | null;
    readonly docs: Array<string>;
}

export interface IEventSpec extends NameSpec {
    /// The event arguments.
    readonly args: Array<IEventParamSpec>;
    readonly docs: Array<string>;
}

export interface IEventParamSpec extends NameSpec {
    /// If the event parameter is indexed.
    readonly indexed: boolean;
    /// The type of the parameter.
    readonly type: ITypeSpec;
    readonly docs: Array<string>;
}

export interface IMessageParamSpec extends NameSpec {
    /// The type of the parameter.
    readonly type: ITypeSpec;
}

export interface ITypeSpec {
    /// The actual type.
    readonly type: number;
    /// The compile-time known displayed representation of the type.
    readonly displayName: string[];
}

interface NameSelectorSpec {
    /// The name of the message and some optional prefixes.
    ///
    /// In case of interface provided messages and constructors the prefix
    /// by convention in ask is the name of the interface.
    readonly name: Array<string>;
    /// The selector hash of the message.
    readonly selector: string;
}

interface NameSpec {
    /// The name of the parameter.
    readonly name: string;
}
