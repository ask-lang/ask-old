import { Account, SpreadStorableMap, u128, UInt128, msg, Event, NullHash, Crypto } from "ask-lang";
@event
class Approval extends Event {
    @topic owner: Account;
    @topic spender: Account;

    value: u128;


    constructor(owner: Account, spender: Account, value: u128) {
      super();
      this.owner = owner;
      this.spender = spender;
      this.value = value;
    }
}

@event
class Transfer extends Event {
    @topic from: Account;
    @topic to: Account;

    amount: u128;


    constructor(from: Account, to: Account, amount: u128) {
      super();
      this.from = from;
      this.to = to;
      this.amount = amount;
    }
}

@contract
export class ERC20 {
  // @state balances: SpreadStorableMap<Account, UInt128>;
  // @state allowances: SpreadStorableMap<Account, SpreadStorableMap<Account, UInt128>>;
  @state balances: SpreadStorableMap<Account, UInt128> = new SpreadStorableMap<Account, UInt128>();
  @state allowances: SpreadStorableMap<Account, SpreadStorableMap<Account, UInt128>> = new SpreadStorableMap<Account, SpreadStorableMap<Account, UInt128>>();

  @state totalSupply: u128 = u128.Zero;
  @state name_: string = "";
  @state symbol_: string = ""
  @state decimal_: u8 = 0;

  constructor() {
    // this.balances = new SpreadStorableMap<Account, UInt128>();
    // this.allowances = new SpreadStorableMap<Account, SpreadStorableMap<Account, UInt128>>();
  }

  @constructor
  default(name: string = "", symbol: string = ""): void {
    // this.balances = new SpreadStorableMap<Account, UInt128>();
    // this.allowances = new SpreadStorableMap<Account, SpreadStorableMap<Account, UInt128>>();
    this.name_ = name;
    this.symbol_ = symbol;
    this.decimal_ = 18;
    this.totalSupply = u128.Zero;
  }

  @message({"mutates": false})
  get name(): string {
    return this.name_;
  }

  @message({ "mutates": false })
  get symbol(): string {
    return this.symbol_;
  }

  @message({ "mutates": false })
  get decimal(): u8 {
    return this.decimal_;
  }

  @message({ "mutates": false })
  get supply(): u128 {
    return this.totalSupply;
  }

  @message({ "mutates": false })
  balanceOf(account: Account): u128 {
    return this.balances.get(account)!.unwrap();
  }

  @message
  transfer(recipient: Account, amount: u128): bool {
    let from = msg.sender;
    this._transfer(from, recipient, amount);
    return true;
  }

  @message({ "mutates": false })
  allowance(owner: Account, spender: Account): u128 {
    return this.allowances.get(owner)!.get(spender)!.unwrap();
  }

  @message
  approve(spender: Account, amount: u128): bool {
    this._approve(msg.sender, spender, amount);
    return true;
  }

  @message
  transferFrom(sender: Account, recipient: Account, amount: u128): bool {
    this._transfer(sender, recipient, amount);
    let allow = this.getAllowanceItem(sender);
    let leftAllowance: u128 = allow.get(msg.sender)!.unwrap();
    assert(leftAllowance >= amount, "allowance overflow");
    leftAllowance = leftAllowance - amount;
    this._approve(sender, msg.sender, leftAllowance);
    return true;
  }

  @message
  increaseAllowance(spender: Account, addedValue: u128): bool {
    let info = this.getAllowanceItem(msg.sender);
    let leftAllowance: u128 = info.get(spender)!.unwrap();
    leftAllowance = leftAllowance + addedValue;
    this._approve(msg.sender, spender, leftAllowance);
    return true;
  }

  @message
  decreaseAllowance(spender: Account, subtractedValue: u128): bool {
    let info = this.getAllowanceItem(msg.sender);
    let leftAllowance: u128 = info.get(spender)!.unwrap();
    assert(leftAllowance >= subtractedValue, "substract value over flow.");
    leftAllowance = leftAllowance - subtractedValue;
    this._approve(msg.sender, spender, leftAllowance);
    return true;
  }

  protected _setupDecimals(decimals_: u8): void {
    this.decimal_ = decimals_;
  }

  protected _mint(account: Account, amount: u128): void {
    assert(account.notEq(Account.Null), "ERC20: mint to the zero address");
    this.totalSupply += amount;
    let leftValue = this.balances.get(account)!.unwrap() + amount;
    this.balances.set(account, new UInt128(leftValue));
    (new Transfer(Account.Null, account, amount));
  }

  protected _burn(account: Account, amount: u128): void {
    assert(account.notEq(Account.Null), "ERC20: burn from the zero address");
    let balanceOfAccount = this.balances.get(account)!.unwrap();
    assert(balanceOfAccount >= amount, "ERC20: not enough balance to bure.");
    let leftValue = balanceOfAccount - amount;
    this.balances.set(account, new UInt128(leftValue));
    this.totalSupply -= amount;
    (new Transfer(account, Account.Null, amount));
  }

  protected _approve(owner: Account, spender: Account, amount: u128): void {
    assert(owner.notEq(Account.Null), "ERC20: approve from the zero address");
    assert(spender.notEq(Account.Null), "ERC20: approve to the zero address");

    let list = this.getAllowanceItem(owner);
    list.set(spender, new UInt128(amount));
    (new Approval(owner, spender, amount));
  }

  protected _transfer(sender: Account, recipient: Account, amount: u128): void {
    assert(sender.notEq(Account.Null), "ERC20: transfer from the zero address");
    assert(recipient.notEq(Account.Null), "ERC20: transfer to the zero address");

    let spenderBalance = this.balances.get(sender)!.unwrap();
    assert(spenderBalance >= amount, "ERC20: transfer amount exceeds balance");

    let senderLeft = spenderBalance - amount;
    this.balances.set(sender, new UInt128(senderLeft));

    let recipientLeft = this.balances.get(recipient)!.unwrap() + amount;
    this.balances.set(recipient, new UInt128(recipientLeft));
    (new Transfer(sender, recipient, amount));
  }

  private getAllowanceItem(key: Account): SpreadStorableMap<Account, UInt128> {
    let item = this.allowances.get(key)!;
    if (item.entryKey == NullHash) {
      item.entryKey = Crypto.blake256(key);
      this.allowances.set(key, item);
    }
    return item;
  }
}
