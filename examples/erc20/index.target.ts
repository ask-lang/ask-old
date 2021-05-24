import { AccountId, AccountId0, SpreadStorableMap, u128, UInt128, Storage, Crypto, ScaleString, UInt8, Msg, FnParameters, ReturnData, Bool, Log, Event } from "ask-lang";

@storage
class ERC20Storage {
  _balances: SpreadStorableMap<AccountId, UInt128> | null;
  _allowances: SpreadStorableMap<AccountId, SpreadStorableMap<AccountId, UInt128>> | null;
  _totalSupply: UInt128 | null;
  _name: ScaleString | null;
  _symbol: ScaleString | null;
  _decimal: UInt8 | null;

  get balances(): SpreadStorableMap<AccountId, UInt128> {
    if (!this._balances) {
      this._balances = new SpreadStorableMap<AccountId, UInt128>("erc20.balances");
    }
    return this._balances!
  }

  get allowances(): SpreadStorableMap<AccountId, SpreadStorableMap<AccountId, UInt128>> {
    if (!this._allowances) {
      this._allowances = new SpreadStorableMap<AccountId, SpreadStorableMap<AccountId, UInt128>>("erc20.allownaces");
    }
    return this._allowances!;
  }

  get totalSupply(): u128 {
    if (!this._totalSupply) {
      const st = new Storage(Crypto.blake256s("erc2o.totalSupply"));
      let v = st.load<UInt128>();
      if (!v) this._totalSupply = new UInt128();
      else this._totalSupply = v;
    }
    return this._totalSupply!.unwrap();
  }

  set totalSupply(v: u128) {
    this._totalSupply = new UInt128(v);
    const st = new Storage(Crypto.blake256s("erc2o.totalSupply"));
    st.store(this._totalSupply!);
  }

  get name(): string {
    if (!this._name) {
      const st = new Storage(Crypto.blake256s("erc2o.name"));
      let v = st.load<ScaleString>();
      if (!v) this._name = new ScaleString();
      else this._name = v;
    }
    return this._name!.toString();
  }

  set name(v: string) {
    this._name = new ScaleString(v);
    const st = new Storage(Crypto.blake256s("erc2o.name"));
    st.store(this._name!);
  }

  get symbol(): string {
    if (!this._symbol) {
      const st = new Storage(Crypto.blake256s("erc2o.symbol"));
      let v = st.load<ScaleString>();
      if (!v) this._symbol = new ScaleString();
      else this._symbol = v;
    }
    return this._symbol!.toString();
  }

  set symbol(v: string) {
    this._symbol = new ScaleString(v);
    const st = new Storage(Crypto.blake256s("erc2o.symbol"));
    st.store(this._symbol!);
  }

  get decimal(): u8 {
    if (!this._decimal) {
      const st = new Storage(Crypto.blake256s("erc2o.decimal"));
      let v = st.load<UInt8>();
      if (!v) this._decimal = new UInt8();
      else this._decimal = v;
    }
    return this._decimal!.unwrap();
  }

  set decimal(v: u8) {
    this._decimal = new UInt8(v);
    const st = new Storage(Crypto.blake256s("erc2o.decimal"));
    st.store(this._decimal!);
  }
}

class Approved extends Event {
  from: u8;
  to: u8;
  success: bool;

  constructor(_from: u8, _to: u8, _success: bool) {
    super()
    this.from = _from;
    this.to = _to;
    this.success = _success;

    // this.prepare();
    this.emit();
  }

  // as-preprocessor should generate this method for @Event
  prepare(): void {
    this.index = 0;
    this.appendTopic(new UInt8(this.from));
    this.appendTopic(new UInt8(this.to));

    this.appendData(new UInt8(this.from));
    this.appendData(new UInt8(this.to));
    this.appendData(new Bool(this.success));
  }
}

@event
class Transfer extends Event {
  @topic from: AccountId;
  @topic to: AccountId;

  value: u128;

  constructor(from: AccountId, to: AccountId, value: u128) {
    super();
    this.from = from;
    this.to = to;
    this.value = value;

    this.emit();
  }

  prepare(): void {
    this.index = 0;
    this.appendTopic(this.from);
    this.appendTopic(this.to);

    this.appendData(this.from);
    this.appendData(this.to);
    this.appendData(new UInt128(this.value));
  }
}

@event
class Approval extends Event {
  @topic owner: AccountId;
  @topic spender: AccountId;

  value: u128;

  constructor(from: AccountId, to: AccountId, value: u128) {
    super();
    this.owner = from;
    this.spender = to;
    this.value = value;

    this.emit();
  }

  prepare(): void {
    this.index = 1;
    this.appendTopic(this.owner);
    this.appendTopic(this.spender);

    this.appendData(this.owner);
    this.appendData(this.spender);
    this.appendData(new UInt128(this.value));
  }
}

@contract
class ERC20 {
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
  balanceOf(account: AccountId): u128 {
    return this.storage.balances.get(account).unwrap();
  }

  @message
  mint(to: AccountId, amount: u128): void {
    this._mint(to, amount);
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
    Log.println("transfer finished.");
    let allow = this.getAllowanceItem(sender);
    let leftAllowance: u128 = allow.get(msg.sender).unwrap();
    assert(leftAllowance >= amount, "allowance overflow");
    leftAllowance = leftAllowance - amount;
    Log.println("calculate finished.");
    this._approve(sender, msg.sender, leftAllowance);
    return true;
  }

  @message
  increaseAllowance(spender: AccountId, addedValue: u128): bool {
    let info = this.getAllowanceItem(msg.sender);
    let leftAllowance: u128 = info.get(spender).unwrap();
    leftAllowance = leftAllowance + addedValue;
    this._approve(msg.sender, spender, leftAllowance);
    return true;
  }

  @message
  decreaseAllowance(spender: AccountId, subtractedValue: u128): bool {
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

  protected _mint(account: AccountId, amount: u128): void {
    assert(account.notEq(AccountId0), "ERC20: mint to the zero address");
    this.storage.totalSupply += amount;
    let leftValue = this.storage.balances.get(account).unwrap() + amount;
    this.storage.balances.set(account, new UInt128(leftValue));
    (new Transfer(AccountId0, account, amount));
  }

  protected _burn(account: AccountId, amount: u128): void {
    assert(account.notEq(AccountId0), "ERC20: burn from the zero address");
    let leftValue = this.storage.balances.get(account).unwrap() - amount;
    this.storage.balances.set(account, new UInt128(leftValue));
    this.storage.totalSupply -= amount;
    (new Transfer(account, AccountId0, amount));
  }

  protected _approve(owner: AccountId, spender: AccountId, amount: u128): void {
    assert(owner.notEq(AccountId0), "ERC20: approve from the zero address");
    assert(spender.notEq(AccountId0), "ERC20: approve to the zero address");

    let list = this.getAllowanceItem(owner);
    list.set(spender, new UInt128(amount));
    (new Approval(owner, spender, amount));
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
    (new Transfer(sender, recipient, amount));
  }

  private getAllowanceItem(key: AccountId): SpreadStorableMap<AccountId, UInt128> {
    let item = this.storage.allowances.get(key);
    if (item.entryKey == "") {
      item.entryKey = key.toString();
      this.storage.allowances.set(key, item);
    }
    return item;
  }
}


var msg: Msg = new Msg();

export function deploy(): i32 {
  let erc20 = new ERC20();

  const defaultSelector: u8[] = [0xed, 0x4b, 0x9d, 0x1b];
  if (msg.isSelector(defaultSelector)) {
    const fnParameters = new FnParameters(msg.data);
    let p0 = fnParameters.get<ScaleString>();
    let p1 = fnParameters.get<ScaleString>();
    erc20.default(p0.toString(), p1.toString());
  }
  return 0;
}

export function call(): i32 {
  const erc20 = new ERC20();
  // name
  const nameSelector: u8[] = [0x3a, 0xda, 0xf7, 0x0d];
  if (msg.isSelector(nameSelector)) {
    let rs = erc20.name();
    ReturnData.set<ScaleString>(new ScaleString(rs));
  }

  // symbol
  const symbolSelector: u8[] = [0x9b, 0xd1, 0x93, 0x3e];
  if (msg.isSelector(symbolSelector)) {
    let rs = erc20.symbol();
    ReturnData.set<ScaleString>(new ScaleString(rs));
  }

  // decimal
  const decimalSelector: u8[] = [0xcc, 0x3f, 0xec, 0x6d];
  if (msg.isSelector(decimalSelector)) {
    let rs = erc20.decimal();
    ReturnData.set<UInt8>(new UInt8(rs));
  }

  // totalSupply
  const totalSupply: u8[] = [0xca, 0xe6, 0x05, 0x95];
  if (msg.isSelector(totalSupply)) {
    let rs = erc20.totalSupply();
    ReturnData.set<UInt128>(new UInt128(rs));
  }

  // balanceOf
  const balanceOfSelector: u8[] = [0xf4, 0x8d, 0xef, 0x67];
  if (msg.isSelector(balanceOfSelector)) {
    const fnParameters = new FnParameters(msg.data);
    let p0 = fnParameters.get<AccountId>();
    let rs = erc20.balanceOf(p0);
    ReturnData.set<UInt128>(new UInt128(rs));
  }

  // transfer
  const transferSelector: u8[] = [0x84, 0xa1, 0x5d, 0xa1];
  if (msg.isSelector(transferSelector)) {
    const fnParameters = new FnParameters(msg.data);
    let p0 = fnParameters.get<AccountId>();
    let p1 = fnParameters.get<UInt128>();
    let rs = erc20.transfer(p0, p1.unwrap());
    ReturnData.set<Bool>(new Bool(rs));
  }

  // allowance
  const allowanceSelector: u8[] = [0x6a, 0x00, 0x16, 0x5e];
  if (msg.isSelector(allowanceSelector)) {
    const fnParameters = new FnParameters(msg.data);
    let p0 = fnParameters.get<AccountId>();
    let p1 = fnParameters.get<AccountId>();
    let rs = erc20.allowance(p0, p1);
    ReturnData.set<UInt128>(new UInt128(rs));
  }

  // approve
  const approveSelector: u8[] = [0x68, 0x12, 0x66, 0xa0];
  if (msg.isSelector(approveSelector)) {
    const fnParameters = new FnParameters(msg.data);
    let p0 = fnParameters.get<AccountId>();
    let p1 = fnParameters.get<UInt128>();
    let rs = erc20.approve(p0, p1.unwrap());
    ReturnData.set<Bool>(new Bool(rs));
  }

  // transferFrom
  const tfromSelector: u8[] = [0x02, 0xa6, 0xe0, 0xd5];
  if (msg.isSelector(tfromSelector)) {
    const fnParameters = new FnParameters(msg.data);
    let p0 = fnParameters.get<AccountId>();
    let p1 = fnParameters.get<AccountId>();
    let p2 = fnParameters.get<UInt128>();
    let rs = erc20.transferFrom(p0, p1, p2.unwrap());
    ReturnData.set<Bool>(new Bool(rs));
  }

  // mint
  const mintSelector: u8[] = [0xcf, 0xdd, 0x9a, 0xa2];
  if (msg.isSelector(mintSelector)) {
    const fnParameters = new FnParameters(msg.data);
    let p0 = fnParameters.get<AccountId>();
    let p1 = fnParameters.get<UInt128>();
    erc20.mint(p0, p1.unwrap());
  }

  // increase allowance
  const incAllowanceSelector: u8[] = [0xcb, 0x00, 0x53, 0x56];
  if (msg.isSelector(incAllowanceSelector)) {
    const fnParameters = new FnParameters(msg.data);
    let p0 = fnParameters.get<AccountId>();
    let p1 = fnParameters.get<UInt128>();
    let rs = erc20.increaseAllowance(p0, p1.unwrap());
    ReturnData.set<Bool>(new Bool(rs));
  }

  // increase allowance
  const decAllowanceSelector: u8[] = [0xe1, 0x9f, 0xab, 0xb4];
  if (msg.isSelector(decAllowanceSelector)) {
    const fnParameters = new FnParameters(msg.data);
    let p0 = fnParameters.get<AccountId>();
    let p1 = fnParameters.get<UInt128>();
    let rs = erc20.decreaseAllowance(p0, p1.unwrap());
    ReturnData.set<Bool>(new Bool(rs));
  }

  return 0;
}