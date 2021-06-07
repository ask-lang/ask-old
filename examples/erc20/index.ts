import { AccountId, u128 } from "ask-lang";
import {ERC20} from "./ERC20";

@contract
@doc(desc = "MyToken conract that extended erc20 contract")
class MyToken extends ERC20 {

  constructor() {
    super();
  }

  @constructor
  default(name: string = "", symbol: string = ""): void {
    super.default(name, symbol);
  }

  @message
  @doc(desc = "Mint a token")
  mint(to: AccountId, amount: u128): void {
    this._mint(to, amount);
  }

  @message
  @doc(desc = "burn the token")
  burn(from: AccountId, amount: u128): void {
    this._burn(from, amount);
  }
}