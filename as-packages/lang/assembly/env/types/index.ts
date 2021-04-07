import { UInt128, UInt64, UInt32, ByteArray, Codec } from "as-scale-codec";
export { Hash } from "as-scale-codec";

// TODO: define interfaces for all of them.
// Default types for env.
// Preprocess should import these types for default config.

export type AccountId = ByteArray;
export type Balance = UInt128;
export type Timestamp = UInt64;
export type BlockNumber = UInt32;

// TODO: move it to as-scale-codec
export class Void implements Codec {
    toU8a(): u8[] {
        return new Array<u8>(0);
    }

    encodedLength(): i32 {
        return 0;
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    populateFromBytes(bytes: u8[], index: i32): void {}

    eq(other: Void): bool {
        return true;
    }

    notEq(other: Void): bool {
        return false;
    }

    @inline
    @operator("==")
    static eq(a: Void, b: Void): bool {
        return true;
    }

    @inline
    @operator("!=")
    static notEq(a: Void, b: Void): bool {
        return false;
    }
}
