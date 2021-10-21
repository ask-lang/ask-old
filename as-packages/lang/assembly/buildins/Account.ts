/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { Callable } from "./Callable";
import { u128 } from "as-bignum";
import { ReturnCode, seal_address, seal_transfer } from "pl-as-contract-runtime";
import { Account, Balance } from "../env";
import { WriteBuffer } from "../primitives/writebuffer";
import { Codec } from "pl-as-scale-codec";
import { ReadBuffer } from "../primitives/readbuffer";
/**
 * @class AccountId
 * Class AccountId stands for an address, which should be a storagable type.
 */

function SendBalance(
    destination: Account,
    value: Balance
): bool {
    let destBuffer = new WriteBuffer(destination.toU8a());
    let valBuffer = new WriteBuffer(value.toU8a());

    let ret = seal_transfer(
        destBuffer.buffer,
        destBuffer.size,
        valBuffer.buffer,
        valBuffer.size
    );

    return ret === ReturnCode.Success;
}

function TransferBalance(
    destination: Account,
    value: Balance
): void {
    let status = SendBalance(destination, value);
    assert(status, "Transfer balance reverted.");
}
/**
 * This class stands for an account, both with external owner address and contract address.
 *
 *
 * @export
 * @class Account
 * @implements {Codec}
 */
export class AccountId implements Codec{

    private static _Self: AccountId;
    private static _Null: AccountId;

    private _id: Account;

    static from(uarr: u8[]): AccountId {
        let account = new AccountId();
        account._id = Account.from(uarr);
        return account;
    }
    /**
     * Get a Null account, like `address(0)` in solidity.
     *
     * @readonly
     * @static
     * @type {AccountId}
     * @memberof Account
     */
    static get Null(): AccountId {
        if (AccountId._Null === null) {
            AccountId._Null = new AccountId();
        }
        return AccountId._Null;
    }
    /**
     * Get the Account of the contact which executing with.
     *
     * @readonly
     * @static
     * @type {AccountId}
     * @memberof Account
     */
    static get Self(): AccountId {
        if (AccountId._Self === null) {
            let readbuf = new ReadBuffer(32);
            seal_address(readbuf.valueBuffer, readbuf.sizeBuffer);
            AccountId._Self = AccountId.from(readbuf.valueBytes);
        }
        return AccountId._Self;
    }

    constructor(id: Account = new Account(new Array<u8>(32).fill(0))) {
        this._id = id;
    }
    /**
     * Get the `AccountId` with this account.
     * AccountId is a customized data type, which defined by the FRAME of substrate.
     *
     * @readonly
     * @type {Account}
     * @memberof Account
     */
    get id(): Account { return this._id; }

    /**
     * To transfer from Account.Self to this account.
     *
     * @param value Balance type, default type is u128
     */
    transfer(value: Balance): void {
        TransferBalance(this._id, value);
    }
    /**
     * To call external message.
     *
     * refer to `QuickStart.md` for more details about cross call.
     *
     * @param data bytes of function signature and its arguments
     * @param gas max gas to call external message
     * @param value value send to external message
     * @returns bytes returned by external message
     */
    call(data: u8[], gas: u64 = 0, value: u128 = u128.Zero): u8[] {
        let callable = new Callable(this._id.toU8a());
        let ret = callable.gas(gas).value(value).data(data).call();
        assert(ret == ReturnCode.Success, "call external message failed.");
        return callable.callResult();
    }
    /**
     * convert to string value.
     *
     * @returns an hex styled string
     */
    toString(): string {
        return this._id.toString();
    }

    @inline @operator("==")
    static __eq(lhs: AccountId, rhs: AccountId): bool {
        return lhs._id.eq(rhs._id);
    }

    @inline @operator("!=")
    static __neq(lhs: AccountId, rhs: AccountId): bool {
        return lhs._id.notEq(rhs._id);
    }

    toU8a(): u8[] {
        return this._id.toU8a();
    }

    encodedLength(): i32 {
        return this._id.encodedLength();
    }

    populateFromBytes(bytes: u8[], index: i32 = 0): void {
        this._id.populateFromBytes(bytes, index);
    }

    eq(other: AccountId): bool {
        return this._id.eq(other._id);
    }

    notEq(other: AccountId): bool {
        return this._id.notEq(other._id);
    }
}
