import { Codec } from "as-scale-codec";

export interface IKey {
    to_bytes(): ArrayBuffer;
}

export interface Env {
    env(): TypedEnvBackend;
}

export interface CallInput extends Codec {
    /**
     * @description Return SCALE encoded selector
     */
    functionSelctor(): u8[];
    /**
     * @description Return SCALE encoded args
     */
    arguments(): u8[];
}

export interface EnvBackend {
    setContractStorage<K extends IKey, V extends Codec>(key: K, value: V): void;

    getContractStorage<K extends IKey, V extends Codec>(key: K): V;

    clearContractStroage(key: IKey): void;

    decodeInput<V extends Codec>(): V;

    returnValue<V extends Codec>(flags: u32, value: V): void;

    println(content: string): void;

    // TODO: add more methods

    // hashBytes

    // call_chain_extension()
}

export interface TypedEnvBackend extends EnvBackend {
    caller<T extends Codec>(): T;

    transferredBalance<T extends Codec>(): T;

    gasLeft<T extends Codec>(): T;

    blockTimestamp<T extends Codec>(): T;

    accountId<T extends Codec>(): T;

    balance<T extends Codec>(): T;

    rentAllowance<T extends Codec>(): T;

    blockNumber<T extends Codec>(): T;

    minimumBalance<T extends Codec>(): T;

    tombstoneDeposit<T extends Codec>(): T;

    transfer<A extends Codec, B extends Codec>(dest: A, value: B): void;

    call<
        A extends Codec,
        B extends Codec,
        I extends CallInput,
        T extends Codec
    >(
        callee: A,
        gasLimit: u64,
        transferredValue: B,
        input: I
    ): T;

    // TODO: add more methods

    // emitEvent<T extends Codec, Event>(): void;

    // setRentAllowance<T extends Codec>(newValue: T): void;

    // invokeContract()

    // evalContracr()

    // restoreContract<A extends Codec, H extends Codec, B extends Codec> (accountId: A, codeHash: H, rentAllowance: B, filteredKeys: Array<IKey>): void;

    // terminateContract<T extends Codec>(beneficiary: T): void;
}
