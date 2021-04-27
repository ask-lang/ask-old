import { Layout } from "./layouts";
import {
    IConstructorSpec,
    IContract,
    IContractMetadata,
    IContractSpec,
    IEventParamSpec,
    IEventSpec,
    IMessageParamSpec,
    IMessageSpec,
    ITypeSpec
} from "./specs";
import { Type } from "./types";
import { ISource } from "./specs";

export const METADATA_VERSION = "0.1.0";

export interface ToMetadata {
    toMetadata(): unknown;
}

/**
 * The main metadata
 */
export class ContractMetadata implements ToMetadata {
    public readonly metadataVersion: string = METADATA_VERSION;

    constructor(
        public readonly source: Source,
        public readonly contract: Contract,
        public readonly spec: ContractSpec,
        public readonly types: Array<Type>,
        public readonly storage: Layout
    ) {}

    toMetadata(): IContractMetadata {
        return {
            metadataVersion: this.metadataVersion,
            source: this.source,
            contract: this.contract.toMetadata(),
            spec: this.spec.toMetadata(),
            types: this.types.map((t) => t.toMetadata()),
            storage: this.storage.toMetadata(),
        };
    }
}

export class Source implements ToMetadata {
    constructor(
        public readonly hash: string,
        public readonly language: string,
        public readonly compiler: string
    ) {}

    toMetadata(): ISource {
        return {
            hash: this.hash,
            language: this.language,
            compiler: this.compiler,
        };
    }
}

export class Contract implements ToMetadata {
    private authors: Array<string> = [];
    private description: string | null = null;
    private documentation: string | null = null;
    private repository: string | null = null;
    private homepage: string | null = null;
    private license: string | null = null;
    constructor(private name: string, private version: string) {}

    setAuthors(authors: Array<string>): Contract {
        this.authors = authors;
        return this;
    }

    setDescription(description: string): Contract {
        this.description = description;
        return this;
    }

    setDocumentation(documentation: string): Contract {
        this.documentation = documentation;
        return this;
    }

    setRepository(repository: string): Contract {
        this.repository = repository;
        return this;
    }

    setHomepage(homepage: string): Contract {
        this.homepage = homepage;
        return this;
    }

    setLicense(license: string): Contract {
        this.license = license;
        return this;
    }

    toMetadata(): IContract {
        return {
            name: this.name,
            version: this.version,
            authors: this.authors,
            description: this.description,
            documentation: this.documentation,
            repository: this.repository,
            homepage: this.homepage,
            license: this.license,
        };
    }
}

export class ContractSpec implements ToMetadata {
    constructor(
        /// The set of constructors of the contract.
        public readonly constructors: Array<ConstructorSpec>,
        /// The external messages of the contract.
        public readonly messages: Array<MessageSpec>,
        /// The events of the contract.
        public readonly events: Array<EventSpec>,
        public readonly docs: Array<string>
    ) {}

    toMetadata(): IContractSpec {
        return {
            constructors: this.constructors.map((c) => c.toMetadata()),
            messages: this.messages.map((m) => m.toMetadata()),
            events: this.events.map((e) => e.toMetadata()),
            docs: this.docs,
        };
    }
}

export class ConstructorSpec implements ToMetadata {
    constructor(
        public readonly name: string[],
        public readonly selector: string,
        public readonly args: ArgumentSpec[] = [],
        public readonly docs: string[] = []
    ) {}

    toMetadata(): IConstructorSpec {
        return {
            args: this.args.map((arg) => arg.toMetadata()),
            docs: this.docs,
            name: this.name,
            selector: this.selector,
        };
    }
}

export class MessageSpec implements ToMetadata {
    private mutates = false;
    private payable = false;
    constructor(
        public readonly name: string[],
        public readonly selector: string,
        public readonly args: ArgumentSpec[] = [],
        public readonly returnType: TypeSpec | null,
        public readonly docs: string[] = []
    ) {}

    setMutates(mutates = true): MessageSpec {
        this.mutates = mutates;
        return this;
    }

    setPayable(payable = true): MessageSpec {
        this.payable = payable;
        return this;
    }

    toMetadata(): IMessageSpec {
        return {
            mutates: this.mutates,
            payable: this.payable,
            args: this.args.map((arg) => arg.toMetadata()),
            returnType: this.returnType?.toMetadata() || null,
            docs: this.docs,
            name: this.name,
            selector: this.selector,
        };
    }
}

export class EventSpec implements ToMetadata {
    constructor(
        public readonly name: string,
        public readonly args: EventParamSpec[],
        public readonly docs: string[]
    ) {}

    toMetadata(): IEventSpec {
        return {
            name: this.name,
            args: this.args.map((arg) => arg.toMetadata()),
            docs: this.docs,
        };
    }
}

export class EventParamSpec implements ToMetadata {
    constructor(
        public readonly indexed: boolean,
        public readonly type: ITypeSpec,
        public readonly docs: string[],
        public readonly name: string
    ) {}

    toMetadata(): IEventParamSpec {
        return this;
    }
}

export class ArgumentSpec implements ToMetadata {
    constructor(public readonly type: TypeSpec, public readonly name: string) {}

    toMetadata(): IMessageParamSpec {
        return {
            type: this.type.toMetadata(),
            name: this.name
        };
    }
}

export class TypeSpec implements ToMetadata {
    constructor(
        public readonly type: number,
        public readonly displayName: string
    ) {}

    toMetadata(): ITypeSpec {
        return {
            type: this.type,
            displayName: [this.displayName]
        };
    }
}
