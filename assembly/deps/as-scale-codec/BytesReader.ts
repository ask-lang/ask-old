// Copyright 2020 LimeChain Ltd.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Codec } from '.';

/**
 * @description BytesReader class that helps reading bytes into SCALE Codec types
 */
export class BytesReader{
    /**
     * u8 bytes
     */
    public readonly bytes: u8[];
    /**
     * Current index to start decoding from
     */
    private index: i32 = 0;

    constructor(bytes: u8[]){
        this.bytes = bytes;
    }

    /**
     * @description Reads bytes into a given Type
     */
    readInto<T extends Codec>(): T{
        const instance: T = BytesReader.decodeInto<T>(this.bytes, this.index);
        this.index += instance.encodedLength();
        return instance;
    }
    /**
     * Returns the unread bytes from the reader
     */
    getLeftoverBytes(): u8[]{
        return this.bytes.slice(this.index);
    }
    /**
     * Read custom sized array of raw bytes
     * @param size byte array size
     */
    readBytes(size: i32): u8[]{
        const bytes: u8[] = this.bytes.slice(this.index, this.index + size);
        this.index += size;
        return bytes;
    }
    /**
     * @description Static variant of readInto() method
     * @param bytes 
     * @param index 
     */
    static decodeInto<T extends Codec>(bytes: u8[], index: i32 = 0): T{
        const instance: T = instantiate<T>();
        instance.populateFromBytes(bytes, index);
        return instance;
    }
}