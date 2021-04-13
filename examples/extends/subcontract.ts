import {SolarSystem} from "../solar/solar";

@contract
class SubContract extends SolarSystem {

  constructor() {
   super()
  }

  @message(mutates = false)
  getBaseTypeU128(): u128 {
    return this.stored.typeU128;
  }
}