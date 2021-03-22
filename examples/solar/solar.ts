/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */
import { u128 } from "ask-lang";

@storage
class Planets {
    name: string;
    radius: u32;
    isdwarf: boolean;
    typeU128: u128;
}

@contract
class SolarSystem {
    protected stored: Planets;

    constructor() {
        this.stored = new Planets();
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

    @message
    set(name: string, radius: u32, isdwarf: boolean, type128: u128): void {
        if (this.stored.name != name) {
            this.stored.name = name;
            this.stored.radius = radius;
            this.stored.isdwarf = isdwarf;
            this.stored.typeU128 = type128;
        }
    }

    @message(mutates = false)
    getType128(): u128 {
        return this.stored.typeU128;
    }

    @message
    setType128(type128: u128): void {
        this.stored.typeU128 = type128;
    }

    @message(mutates = false, selector = "0x0a0b0c0d")
    getRadius(): u32 {
        return this.stored.radius;
    }

    @message(mutates = false)
    errorGetRadius(): u32 {
        this.stored.radius = 100;
        return this.stored.radius;
    }  
}
