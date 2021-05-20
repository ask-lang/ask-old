import { AccountId } from "ask-lang";

@dynamic
class Original {
    
    constructor(account: AccountId) {

    }

    createVoid(): void {
    }

    createA(i: u8): void {
    }

    createB(i: u8): u8 {
        return i;
    }
    createC(i: u8, b: bool): bool {
        return b;
    }
}

@contract
class Contract {

    private original: Original;

    constructor() {
        this.original = new Original(new AccountId());
    }

    @message
    public callOriginal(): void {
        this.original.createVoid();
    }

}