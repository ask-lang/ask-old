/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

export class WriteBuffer {
    private valueBuf: Array<u8>;

    constructor(u8a: Array<u8>) {
        this.valueBuf = u8a;
    }

    static from(ab: ArrayBuffer): WriteBuffer {
        let arr = new Array<u8>(ab.byteLength);
        memory.copy(
            arr.dataStart,
            changetype<usize>(ab),
            ab.byteLength
        );

        return new WriteBuffer(arr);
    }

    get size(): u32 {
        return this.valueBuf.length;
    }

    get buffer(): usize {
        return this.valueBuf.dataStart;
    }
}
