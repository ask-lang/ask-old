import {ReadBuffer} from '../../primitives/readbuffer';

describe("ReadBuffer", () => {

  it("ReadBuffer.valueBytes.length", () => {
    let buf = new ReadBuffer(4);
    expect<Array<u8>>(buf.valueBytes).toHaveLength(4);
  });
});