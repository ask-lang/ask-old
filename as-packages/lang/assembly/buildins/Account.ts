/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { Callable } from "./Callable";
import { u128 } from "as-bignum";
import { ReturnCode, seal_address, seal_transfer } from "as-contract-runtime";
import { AccountId, Balance } from "../env";
import { WriteBuffer } from "../primitives/writebuffer";
import { Codec } from "as-scale-codec";
import { ReadBuffer } from "../primitives/readbuffer";
/**
 * @class AccountId
 * Class AccountId stands for an address, which should be a storagable type.
 */

function SendBalance(
    destination: AccountId,
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
    destination: AccountId,
    value: Balance
): void {
    let status = SendBalance(destination, value);
    assert(status, "Transfer balance reverted.");
}

export class Account implements Codec{

    private static _Self: Account;
    private static _Null: Account;

    private _id: AccountId;

    static from(uarr: u8[]): Account {
        let account = new Account();
        account._id = AccountId.from(uarr);
        return account;
    }
    /**
     * Get a Null account, like `address(0)` in solidity.
     *
     * @readonly
     * @static
     * @type {Account}
     * @memberof Account
     */
    static get Null(): Account {
        if (Account._Null === null) {
            Account._Null = new Account();
        }
        return Account._Null;
    }
    /**
     * Get the Account of the contact which executing.
     *
     * @readonly
     * @static
     * @type {Account}
     * @memberof Account
     */
    static get Self(): Account {
        if (Account._Self === null) {
            let readbuf = new ReadBuffer(32);
            seal_address(readbuf.valueBuffer, readbuf.sizeBuffer);
            Account._Self = Account.from(readbuf.valueBytes);
        }
        return Account._Self;
    }

    constructor(id: AccountId = new AccountId(new Array<u8>(32).fill(0))) {
        this._id = id;
    }

    get id(): AccountId { return this._id; }

    // transfer from `contract.address` to this.account
    transfer(value: Balance): void {
        TransferBalance(this._id, value);
    }

    call(data: u8[], gas: u64 = 0, value: u128 = u128.Zero): u8[] {
        let callable = new Callable(this._id.toU8a());
        let ret = callable.gas(gas).value(value).data(data).call();
        assert(ret == ReturnCode.Success, "call external message failed.");
        return callable.callResult();
    }

    @inline @operator("==")
    static __eq(lhs: Account, rhs: Account): bool {
        return lhs._id.eq(rhs._id);
    }

    @inline @operator("!=")
    static __neq(lhs: Account, rhs: Account): bool {
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

    eq(other: Account): bool {
        return this._id.eq(other._id);
    }

    notEq(other: Account): bool {
        return this._id.notEq(other._id);
    }
}
