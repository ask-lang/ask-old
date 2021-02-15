/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

@storage
class Planets {
  name: string;
  radius: u32;
  isdwarf: boolean;
}

@contract
class SolarSystem {
  protected stored: Planets;

  constructor() {
    this.stored = new Planets();
  }

  @constructor
  default(name: string = "Earth", radius: u32 = 6300, isdwarf: boolean = false): void {
    this.stored.name = name;
    this.stored.radius = radius;
    this.stored.isdwarf = isdwarf;
  }

  @message
  set(name: string, radius: u32, isdwarf: boolean): void {
    if (this.stored.isdwarf !== isdwarf) {
      this.stored.name = name;
      this.stored.radius = radius;
      this.stored.isdwarf = isdwarf;
    }
  }

  @message(mutates = false, selector = "0x0a0b0c0d")
  getRadius(): u32 {
    return this.stored.radius;
  }
}
