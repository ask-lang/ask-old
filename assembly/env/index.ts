import { Codec, Hash } from "as-scale-codec";
import { AccountId } from "./AccountId";
import { Balance } from "./Balance";
import { BlockNumber } from "./BlockNumber";
import { EmitableEvent } from "./EmitableEvent";
import { TimeStamp } from "./TimeStamp";

export * from './AccountId';
export * from './Balance';
export * from './BlockNumber';
export * from './EmitableEvent';
export * from './TimeStamp';

export namespace env {
  function balance(): Balance {}
  function account_id(): AccountId {}
  function block_number(): BlockNumber {}
  function block_timestamp(): TimeStamp {}

  function call_chain_extension(): void {}

  function caller(): AccountId {}

  function clear_contract_storage(key: string): void {}

  function debug_println(message: string): void {}


  function emit_event(evt: EmitableEvent): void {}


  function gas_left(): Balance {}

  function hash_bytes(input: u8[]): Hash {}

  function hash_encoded<T extends Codec>(input: T): Hash {}

  function invoke_contract<T extends Codec, R extends Codec>(params: T): R {}

  function minimum_balance(): Balance {}

  function random(): Hash {} // return a hash seed

  function rent_allowance(): Balance {}

  function restore_contrace(): void {} // set this contract to tomstone state

  function set_rent_allowance(input: Balance): void {}

  function terminate_contract(beneficiary: AccountId): void {}

  function tombstone_deposite(): Balance {}

  function transfer(destination: AccountId, value: Balance): void {}
  // return the transferred balance for the contract execution
  function transferred_balance(): Balance {}
  // returns the price for the specified amount of gas
  function weight_to_fee(gas: u64): Balance {}

  // ----- LOW LEVEL FUNCTIONS -----------------------
  // FIXME(liangqin): low level function, seems not necessary to export outside
  function eval_contract(): void {}
  function decode_input<T extends Codec>(): T {}

  function get_contract_storage<T extends Codec>(key: string): T {}
  function set_contract_storage<T extends Codec>(key: string, value: T): void {}
  function instantiate_contract(): void {}

  function return_value<T extends Codec>(value: T): void {}

}