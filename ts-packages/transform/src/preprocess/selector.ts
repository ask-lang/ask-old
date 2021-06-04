import { blake2AsHex  } from "@polkadot/util-crypto";
export class KeySelector {
    hex: string;
    short: string;
    shortArr: string;
    hexArr: string;
    key: string;
    constructor(key: string) {
        this.key = key;
        // remove 0x
        let hexStr = blake2AsHex(key, 256).substring(2);
        let selectorArr = [];
        for (let index = 0; index < 32; index++) {
            selectorArr.push("0x" + hexStr.substring(index * 2, index * 2 + 2));
        }
        this.hex = `0x${hexStr}`;
        this.short = `0x${hexStr.substr(0, 8)}`;
        this.hexArr = `[${selectorArr.join(",")}]`;
        this.shortArr = `[${selectorArr.splice(0, 4).join(",")}]`;
    }

    setShortHex(shortHex: string): boolean {
        if (shortHex && shortHex.length == 10) {
            let selectorArr = [];
            for (let index = 0; index < 4; index++) {
                selectorArr.push("0x" + shortHex.substring(index * 2 + 2, index * 2 + 4));
            }
            this.short = shortHex;
            this.shortArr = `[${selectorArr.join(",")}]`;
            return true;
        }
        return false;
    } 
}
