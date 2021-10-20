import { AccountId, SpreadStorableMap, u128, UInt128, msg, Event, NullHash, Crypto } from "ask-lang";
@event
class Approval extends Event {
    @topic owner: AccountId;
    @topic spender: AccountId;

    value: u128;


    constructor(owner: AccountId, spender: AccountId, value: u128) {
      super();
      this.owner = owner;
      this.spender = spender;
      this.value = value;
    }
}

@event
class Transfer extends Event {
    @topic from: AccountId;
    @topic to: AccountId;

    amount: u128;


    constructor(from: AccountId, to: AccountId, amount: u128) {
      super();
      this.from = from;
      this.to = to;
      this.amount = amount;
    }
}

@contract
export class ERC20 {
  @state balances: SpreadStorableMap<AccountId, UInt128> = new SpreadStorableMap<AccountId, UInt128>();
  @state allowances: SpreadStorableMap<AccountId, SpreadStorableMap<AccountId, UInt128>> = new SpreadStorableMap<AccountId, SpreadStorableMap<AccountId, UInt128>>();

  @state totalSupply: u128 = u128.Zero;
  @state name_: string = "";
  @state symbol_: string = ""
  @state decimal_: u8 = 0;

  constructor() {
  }

  @constructor
  default(name: string = "", symbol: string = ""): void {
    this.name_ = name;
    this.symbol_ = symbol;
    this.decimal_ = 18;
    this.totalSupply = u128.Zero;
  }

  @message({"mutates": false})
  name(): string {
    return this.name_;
  }

  @message({ "mutates": false })
  symbol(): string {
    return this.symbol_;
  }

  @message({ "mutates": false })
  decimal(): u8 {
    return this.decimal_;
  }

  @message({ "mutates": false })
  supply(): u128 {
    return this.totalSupply;
  }

  @message({ "mutates": false })
  balanceOf(account: AccountId): u128 {
    let balance =  this.balances.get(account);//!.unwrap();
    if (balance) return balance.unwrap();
    else return u128.Zero;
  }

  @message
  transfer(recipient: AccountId, amount: u128): bool {
    let from = msg.sender;
    this._transfer(from, recipient, amount);
    return true;
  }

  @message({ "mutates": false })
  allowance(owner: AccountId, spender: AccountId): u128 {
    let o = this.allowances.get(owner);
    if (!o) return u128.Zero;

    let s = o.get(spender);
    if (!s) return u128.Zero;

    return s.unwrap();
  }

  @message
  approve(spender: AccountId, amount: u128): bool {
    this._approve(msg.sender, spender, amount);
    return true;
  }

  @message
  transferFrom(sender: AccountId, recipient: AccountId, amount: u128): bool {
    this._transfer(sender, recipient, amount);
    let allow = this.getAllowanceItem(sender);
    let leftAllowance: u128 = allow.get(msg.sender)!.unwrap();
    assert(leftAllowance >= amount, "allowance overflow");
    leftAllowance = leftAllowance - amount;
    this._approve(sender, msg.sender, leftAllowance);
    return true;
  }

  @message
  increaseAllowance(spender: AccountId, addedValue: u128): bool {
    let info = this.getAllowanceItem(msg.sender);
    let leftAllowance: u128 = info.get(spender)!.unwrap();
    leftAllowance = leftAllowance + addedValue;
    this._approve(msg.sender, spender, leftAllowance);
    return true;
  }

  @message
  decreaseAllowance(spender: AccountId, subtractedValue: u128): bool {
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

  protected _mint(account: AccountId, amount: u128): void {
    assert(account.notEq(AccountId.Null), "ERC20: mint to the zero address");
    this.totalSupply += amount;
    let leftValue = this.balanceOf(account) + amount;
    this.balances.set(account, new UInt128(leftValue));
    (new Transfer(AccountId.Null, account, amount)).emit();
  }

  protected _burn(account: AccountId, amount: u128): void {
    assert(account.notEq(AccountId.Null), "ERC20: burn from the zero address");
    let balanceOfAccount = this.balanceOf(account);
    assert(balanceOfAccount >= amount, "ERC20: not enough balance to bure.");
    let leftValue = balanceOfAccount - amount;
    this.balances.set(account, new UInt128(leftValue));
    this.totalSupply -= amount;
    (new Transfer(account, AccountId.Null, amount)).emit();
  }

  protected _approve(owner: AccountId, spender: AccountId, amount: u128): void {
    assert(owner.notEq(AccountId.Null), "ERC20: approve from the zero address");
    assert(spender.notEq(AccountId.Null), "ERC20: approve to the zero address");

    let list = this.getAllowanceItem(owner);
    list.set(spender, new UInt128(amount));
    (new Approval(owner, spender, amount)).emit();
  }

  protected _transfer(sender: AccountId, recipient: AccountId, amount: u128): void {
    assert(sender.notEq(AccountId.Null), "ERC20: transfer from the zero address");
    assert(recipient.notEq(AccountId.Null), "ERC20: transfer to the zero address");

    let spenderBalance =this.balanceOf(sender);
    assert(spenderBalance >= amount, "ERC20: transfer amount exceeds balance");

    let senderLeft = spenderBalance - amount;
    this.balances.set(sender, new UInt128(senderLeft));

    let recipientLeft = this.balanceOf(recipient) + amount;
    this.balances.set(recipient, new UInt128(recipientLeft));
    (new Transfer(sender, recipient, amount)).emit();
  }

  private getAllowanceItem(key: AccountId): SpreadStorableMap<AccountId, UInt128> {
    let item = this.allowances.get(key);
    if (item == null) {
      let entryKey = Crypto.blake256(key);
      item = new SpreadStorableMap<AccountId, UInt128>(entryKey)
      this.allowances.set(key, item);
    } else {
      if (item.entryKey == NullHash) {
        let entryKey = Crypto.blake256(key);
        item.entryKey = entryKey;
        this.allowances.set(key, item);
      }
    }
    return item;
  }
}
