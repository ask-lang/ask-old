import { u128 } from "as-bignum";
import { SolarSystem } from "../solar/solar";
@contract
class SubContract extends SolarSystem {

    constructor() {
        super()
    }

    @constructor
    default(
        name: string = "Earth",
        radius: u32 = 6300,
        isdwarf: boolean = false,
        type128: u128 = u128.fromU64(12)
    ): void {
        this.stored.name = name;
        this.stored.radius = radius;
        this.stored.isdwarf = isdwarf;
        this.stored.typeU128 = type128;
    }

    @message(mutates = false)
    getBaseTypeU128(): u128 {
        return this.stored.typeU128;
    }
}