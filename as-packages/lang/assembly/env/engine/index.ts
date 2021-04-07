import { Codec } from "as-scale-codec";
import { Crypto } from "../../primitives/crypto";
import { CallInput, IKey } from "./backend";

export * from "./backend";
// TODO: support condition compiling for on-chain and off-chain
export * from "./onchain";

export class Key<T extends number = u8> implements IKey {
    private key: Array<T>;

    constructor(key: Array<T>) {
        this.key = key;
    }

    to_bytes(): ArrayBuffer {
        return this.key.buffer;
    }

    static from<T extends number = u8>(key: Array<T>): Key<T> {
        return new Key(key);
    }
}

export class CallInputBuilder implements CallInput {
    static fnSelctor(name: string): u8[] {
        // FIXME(liangqin) the generate value is not consisted with native version.....
        return Crypto.blake256s(name).toU8a().slice(0, 4);
    }

    static encodeArgs(args: Codec[]): u8[] {
        let data = new Array<u8>();
        for (let i = 0; i < args.length; i++) {
            data = data.concat(args[i].toU8a());
        }
        return data;
    }

    constructor(
        private readonly name: string,
        private readonly args: Codec[]
    ) {}

    functionSelctor(): u8[] {
        return CallInputBuilder.fnSelctor(this.name);
    }
    arguments(): u8[] {
        return CallInputBuilder.encodeArgs(this.args);
    }
    toU8a(): u8[] {
        // TODO: find a wat to opt array copy
        return this.functionSelctor().concat(this.arguments());
    }
    encodedLength(): i32 {
        return this.toU8a().length;
    }
    populateFromBytes(bytes: u8[], index: i32): void {
        throw new Error("Method not implemented.");
    }

    eq(other: CallInputBuilder): bool {
        if (this.name != other.name) {
            return false;
        }

        let argsA = this.args;
        let argsB = other.args;
        if (argsA.length != argsB.length) {
            return false;
        }
        for (let i = 0; i < argsA.length; i++) {
            if (argsA[i] != argsB[i]) {
                return false;
            }
        }
        return true;
    }
    notEq(other: CallInputBuilder): bool {
        return !this.eq(other);
    }

    @inline
    @operator("==")
    static eq(a: CallInputBuilder, b: CallInputBuilder): bool {
        return a.eq(b);
    }

    @inline
    @operator("!=")
    static notEq(a: CallInputBuilder, b: CallInputBuilder): bool {
        return a.notEq(b);
    }
}
