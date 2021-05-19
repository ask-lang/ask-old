import { AccountId, Codec, AccountId0, SpreadStorableMap, StorableMap, u128, UInt128 } from "ask-lang";

@storage
class ERC20Storage {
  balances: StorableMap<AccountId, UInt128>;
  allowances: StorableMap<AccountId, StorableMap<AccountId, UInt128>>;

  totalSupply: u128;
  name: string;
  symbol: string;
  decimal: u8;
}

@event
class Transfer {
  @topic from: AccountId;
  @topic to: AccountId;

  value: u128;
}

@event
class Approval {
  @topic owner: AccountId;
  @topic spender: AccountId;

  value: u128;
}

@contract
class ERC20 {
  private storage: ERC20Storage;

  constructor() {
    this.storage = new ERC20Storage();
  }

  @constructor
  default(name: string = "", symbol: string = "") {
    this.storage.name = name;
    this.storage.symbol = symbol;
    this.storage.decimal = 18;
  }

  @message(mutates = false)
  name(): string {
    return this.storage.name;
  }

  @message(mutates = false)
  symbol(): string {
    return this.storage.symbol;
  }

  @message(mutates = false)
  decimal(): u8 {
    return this.storage.decimal;
  }

  @message(mutates = false)
  totalSupply(): u128 {
    return this.storage.totalSupply;
  }

  @message(mutates = false)
  balanceOf(account: AccountId): u128 {
    return this.storage.balances.get(account).unwrap();
  }

  @message
  transfer(recipient: AccountId, amount: u128): bool {
    let from = msg.sender;
    this._transfer(from, recipient, amount);
    return true;
  }

  @message(mutates = false)
  allowance(owner: AccountId, spender: AccountId): u128 {
    return this.storage.allowances.get(owner).get(spender).unwrap();
  }

  @message
  approve(spender: AccountId, amount: u128): bool {
    this._approve(msg.sender, spender, amount);
    return true;
  }

  @message
  transferFrom(sender: AccountId, recipient: AccountId, amount: u128): bool {
    this._transfer(sender, recipient, amount);
    let leftAllowance: u128 = this.storage.allowances.get(sender).get(msg.sender).unwrap();
    leftAllowance = leftAllowance - amount;
    this._approve(sender, msg.sender, leftAllowance);
    return true;
  }

  @message
  increaseAllowance(spender: AccountId, addedValue: u128): bool {
    let leftAllowance: u128 = this.storage.allowances.get(msg.sender).get(spender).unwrap();
    leftAllowance = leftAllowance + addedValue;
    this._approve(msg.sender, spender, leftAllowance);
    return true;
  }

  @message
  decreaseAllowance(spender: AccountId, subtractedValue: u128): bool {
    let leftAllowance: u128 = this.storage.allowances.get(msg.sender).get(spender).unwrap();
    leftAllowance = leftAllowance - subtractedValue;
    this._approve(msg.sender, spender, leftAllowance);
    return true;
  }

  protected _setupDecimals(decimals_: u8): void {
    this.storage.decimal = decimals_;
  }

  protected _mint(account: AccountId, amount: u128): void {
    assert(account.notEq(AccountId0), "ERC20: mint to the zero address");
    this.storage.totalSupply -= amount;
    let leftValue = this.storage.balances.get(account).unwrap() + amount;
    this.storage.balances.set(account, new UInt128(leftValue));
    (new Transfer(AccountId0, account, amount)).emit();
  }

  protected _burn(account: AccountId, amount: u128): void {
    assert(account.notEq(AccountId0), "ERC20: burn from the zero address");
    let leftValue = this.storage.balances.get(account).unwrap() - amount;
    this.storage.balances.set(account, new UInt128(leftValue));
    this.storage.totalSupply -= amount;
    (new Transfer(account, AccountId0, amount)).emit();
  }

  protected _approve(owner: AccountId, spender: AccountId, amount: u128): void {
    assert(owner.notEq(AccountId0), "ERC20: approve from the zero address");
    assert(spender.notEq(AccountId0), "ERC20: approve to the zero address");

    let list = this.storage.allowances.get(owner);
    if (list.entryKey == "") {
      this.storage.allowances.set(owner, new SpreadStorableMap<AccountId, UInt128>(owner.toString()));
    }

    this.storage.allowances.get(owner).set(spender, new UInt128(amount));
    (new Approval(owner, spender, amount)).emit();
  }

  protected _transfer(sender: AccountId, recipient: AccountId, amount: u128): void {
    assert(sender.notEq(AccountId0), "ERC20: transfer from the zero address");
    assert(recipient.notEq(AccountId0), "ERC20: transfer to the zero address");

    let spenderBalance = this.storage.balances.get(sender).unwrap();
    assert(spenderBalance >= amount, "ERC20: transfer amount exceeds balance");

    let senderLeft = spenderBalance - amount;
    this.storage.balances.set(sender, new UInt128(senderLeft));

    let recipientLeft = this.storage.balances.get(recipient).unwrap() + amount;
    this.storage.balances.set(recipient, new UInt128(recipientLeft));
    (new Transfer(sender, recipient, amount)).emit();
  }
}