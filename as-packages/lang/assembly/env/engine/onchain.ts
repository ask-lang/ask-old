import { ReadBuffer } from "../../primitives/readbuffer";
import {
    seal_address,
    seal_balance,
    seal_caller,
    seal_clear_storage,
    seal_gas_left,
    seal_get_storage,
    seal_input,
    seal_minimum_balance,
    seal_println,
    seal_rent_allowance,
    seal_return,
    seal_set_storage,
    seal_transfer,
    seal_value_transferred,
    seal_now,
    seal_tombstone_deposit,
    seal_call,
    ReturnCode,
} from "as-contract-runtime";
import { BalanceType } from "../BalanceType";
import { Codec } from "as-scale-codec";
import { CallInput, IKey, TypedEnvBackend } from "./backend";
import { SizeBuffer } from "../../primitives/sizebuffer";

@inline
export function env(): EnvInstance {
    return EnvInstance.env;
}

/**
 * On-chain env for ask!. Preprocess should use this for on-chain mode.
 */
export class EnvInstance implements TypedEnvBackend {
    public static readonly env: EnvInstance = new EnvInstance();

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() {}

    /* EnvBackend */

    setContractStorage<K extends IKey, V extends Codec>(
        key: K,
        value: V
    ): void {
        const valBytes = value.toU8a();
        return seal_set_storage(
            key.to_bytes(),
            valBytes.buffer,
            valBytes.length
        );
    }
    getContractStorage<K extends IKey, V extends Codec>(key: K): V {
        const value = instantiate<V>();
        const len = value.encodedLength();
        // TODO: recycle buf for env
        const buf = new ReadBuffer(len);
        const code = seal_get_storage(
            key.to_bytes(),
            buf.valueBuffer,
            buf.sizeBuffer
        );

        assert(
            code != ReturnCode.Success,
            "getContractStorage: ReturnCode is not Success: " + code.toString()
        );

        // if read storage from native successfully, then populate it.
        // otherwise let it along with default constructed value.
        if (buf.readSize <= len) {
            value.populateFromBytes(buf.valueBytes, 0);
        }

        return value;
    }

    clearContractStroage<K extends IKey>(key: K): void {
        return seal_clear_storage(key.to_bytes());
    }

    decodeInput<V extends Codec>(): V {
        // TODO:
        return ReadBuffer.readInstance<V>(seal_input);
    }

    returnValue<V extends Codec>(flags: number, value: V): void {
        let valBytes = value.toU8a();
        seal_return(flags, valBytes.buffer, valBytes.length);
    }

    println(content: string): void {
        seal_println(changetype<ArrayBuffer>(content), content.length);
    }

    /* TypedEnvBackend */

    caller<A extends Codec>(): A {
        return ReadBuffer.readInstance<A>(seal_caller);
    }

    transferredBalance<B extends Codec = BalanceType>(): B {
        return ReadBuffer.readInstance<B>(seal_value_transferred);
    }

    transfer<A extends Codec, B extends Codec>(dest: A, value: B): void {
        const destBytes = dest.toU8a();
        const valueBytes = value.toU8a();
        seal_transfer(
            destBytes.buffer,
            destBytes.length,
            valueBytes.buffer,
            valueBytes.length
        );
    }

    gasLeft<T extends Codec>(): T {
        return ReadBuffer.readInstance<T>(seal_gas_left);
    }

    blockTimestamp<T extends Codec>(): T {
        return ReadBuffer.readInstance<T>(seal_now);
    }

    accountId<T extends Codec>(): T {
        return ReadBuffer.readInstance<T>(seal_address);
    }

    balance<T extends Codec>(): T {
        return ReadBuffer.readInstance<T>(seal_balance);
    }

    rentAllowance<T extends Codec>(): T {
        return ReadBuffer.readInstance<T>(seal_rent_allowance);
    }

    minimumBalance<T extends Codec>(): T {
        return ReadBuffer.readInstance<T>(seal_minimum_balance);
    }

    tombstoneDeposit<T extends Codec>(): T {
        return ReadBuffer.readInstance<T>(seal_tombstone_deposit);
    }

    blockNumber<T extends Codec>(): T {
        return ReadBuffer.readInstance<T>(seal_balance);
    }

    // TODO: refine it
    call<
        A extends Codec,
        B extends Codec,
        I extends CallInput,
        T extends Codec
    >(callee: A, gasLimit: u64, transferredValue: B, input: I): T {
        const calleeBytes = callee.toU8a();
        const valueBytes = transferredValue.toU8a();
        const inputBytes = input.toU8a();

        const output = instantiate<T>();
        // TODO: resize the buffer
        const len = output.encodedLength();
        const outputBytes = new Array<u8>(len);
        const outputLenBytes = new SizeBuffer(len);
        seal_call(
            calleeBytes.buffer,
            calleeBytes.length,
            gasLimit,
            valueBytes.buffer,
            valueBytes.length,
            inputBytes.buffer,
            inputBytes.length,
            outputBytes.buffer,
            outputLenBytes.buffer
        );
        output.populateFromBytes(outputBytes, 0);
        return output;
    }
}
