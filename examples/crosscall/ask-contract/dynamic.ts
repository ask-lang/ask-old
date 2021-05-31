import { AccountId, u128 } from "ask-lang";

@dynamic
class Erc20 {
    constructor(account: AccountId) {
    }
    transfer(recipient: AccountId, amount: u128): bool {
        return true;
    }
}

@contract
class Contract {

    private erc20: Erc20;

    constructor() {
        this.erc20 = new Erc20(new AccountId());
    }

    @message
    public callOriginal(recipient: AccountId, amount: u128): void {
        this.erc20.transfer(recipient, amount);
    }

}