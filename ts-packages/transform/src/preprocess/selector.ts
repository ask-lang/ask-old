import * as blake2 from "blake2";

export class KeySelector {
    hex: string;
    short: string;
    u8Arr: string;
    key: string;
    constructor(key: string) {
        this.key = key;
        let keyHash = blake2.createHash('blake2b', { digestLength: 32 });
        keyHash.update(Buffer.from(key));
        let hexStr = keyHash.digest("hex");
        let selectorArr = [];
        for (let index = 0; index < 4; index++) {
            selectorArr.push("0x" + hexStr.substring(index * 2, index * 2 + 2));
        }
        this.hex = `0x${hexStr}`,
        this.short = `0x${hexStr.substr(0, 8)}`,
        this.u8Arr = `[${selectorArr.join(",")}]`;
    }
}
