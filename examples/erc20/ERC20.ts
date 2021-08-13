import { Account, Account0, SpreadStorableMap, u128, UInt128, msg } from "ask-lang";

@storage
class ERC20Storage {
  balances: SpreadStorableMap<Account, UInt128>;
  allowances: SpreadStorableMap<Account, SpreadStorableMap<Account, UInt128>>;

    totalSupply: u128;
    name: string;
    symbol: string;
    decimal: u8;
}

@event
class Transfer {
    @topic from: Account;
    @topic to: Account;

    value: u128;

    constructor(from: Account, to : Account, value: u128) {
        this.from = from;
        this.to = to;
        this.value = value;
    }
}

@event
class Approval {
    @topic owner: Account;
    @topic spender: Account;

    value: u128;


    constructor(owner: Account, spender: Account, value: u128) {
        this.owner = owner;
        this.spender = spender;
        this.value = value;
    }
}

@contract
export class ERC20 {
  private storage: ERC20Storage;

  constructor() {
    this.storage = new ERC20Storage();
  }

  @constructor
  default(name: string = "", symbol: string = ""): void {
    this.storage.name = name;
    this.storage.symbol = symbol;
    this.storage.decimal = 18;
    this.storage.totalSupply = u128.Zero;
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
  balanceOf(account: Account): u128 {
    return this.storage.balances.get(account).unwrap();
  }

  @message
  transfer(recipient: Account, amount: u128): bool {
    let from = msg.sender;
    this._transfer(from, recipient, amount);
    return true;
  }

  @message(mutates = false)
  allowance(owner: Account, spender: Account): u128 {
    return this.storage.allowances.get(owner).get(spender).unwrap();
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
    let leftAllowance: u128 = allow.get(msg.sender).unwrap();
    assert(leftAllowance >= amount, "allowance overflow");
    leftAllowance = leftAllowance - amount;
    this._approve(sender, msg.sender, leftAllowance);
    return true;
  }

  @message
  increaseAllowance(spender: Account, addedValue: u128): bool {
    let info = this.getAllowanceItem(msg.sender);
    let leftAllowance: u128 = info.get(spender).unwrap();
    leftAllowance = leftAllowance + addedValue;
    this._approve(msg.sender, spender, leftAllowance);
    return true;
  }

  @message
  decreaseAllowance(spender: Account, subtractedValue: u128): bool {
    let info = this.getAllowanceItem(msg.sender);
    let leftAllowance: u128 = info.get(spender).unwrap();
    assert(leftAllowance >= subtractedValue, "substract value over flow.");
    leftAllowance = leftAllowance - subtractedValue;
    this._approve(msg.sender, spender, leftAllowance);
    return true;
  }

  protected _setupDecimals(decimals_: u8): void {
    this.storage.decimal = decimals_;
  }

  protected _mint(account: Account, amount: u128): void {
    assert(account.notEq(Account0), "ERC20: mint to the zero address");
    this.storage.totalSupply += amount;
    let leftValue = this.storage.balances.get(account).unwrap() + amount;
    this.storage.balances.set(account, new UInt128(leftValue));
    (new Transfer(Account0, account, amount));
  }

  protected _burn(account: Account, amount: u128): void {
    assert(account.notEq(Account0), "ERC20: burn from the zero address");
    let balanceOfAccount = this.storage.balances.get(account).unwrap();
    assert(balanceOfAccount >= amount, "ERC20: not enough balance to bure.");
    let leftValue = balanceOfAccount - amount;
    this.storage.balances.set(account, new UInt128(leftValue));
    this.storage.totalSupply -= amount;
    (new Transfer(account, Account0, amount));
  }

  protected _approve(owner: Account, spender: Account, amount: u128): void {
    assert(owner.notEq(Account0), "ERC20: approve from the zero address");
    assert(spender.notEq(Account0), "ERC20: approve to the zero address");

    let list = this.getAllowanceItem(owner);
    list.set(spender, new UInt128(amount));
    (new Approval(owner, spender, amount));
  }

  protected _transfer(sender: Account, recipient: Account, amount: u128): void {
    assert(sender.notEq(Account0), "ERC20: transfer from the zero address");
    assert(recipient.notEq(Account0), "ERC20: transfer to the zero address");

    let spenderBalance = this.storage.balances.get(sender).unwrap();
    assert(spenderBalance >= amount, "ERC20: transfer amount exceeds balance");

    let senderLeft = spenderBalance - amount;
    this.storage.balances.set(sender, new UInt128(senderLeft));

    let recipientLeft = this.storage.balances.get(recipient).unwrap() + amount;
    this.storage.balances.set(recipient, new UInt128(recipientLeft));
    (new Transfer(sender, recipient, amount));
  }

  private getAllowanceItem(key: Account): SpreadStorableMap<Account, UInt128> {
    let item = this.storage.allowances.get(key);
    if (item.entryKey == "") {
      item.entryKey = key.toString();
      this.storage.allowances.set(key, item);
    }
    return item;
  }
}
