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

import { Byte } from "../Byte";

describe("Byte", () => {
    it("should encode byte", () => {
        let v = new Byte(0xac);
        expect<u8[]>(v.toU8a()).toStrictEqual([0xac]);
    });

    it("should decode byte", () => {
        expect<Byte>(Byte.fromU8a([0x1f])).toStrictEqual(new Byte(0x1f));
    });

    it("should decode with populate method", () => {
        const instance = new Byte();
        instance.populateFromBytes([1]);
        expect<Byte>(instance).toStrictEqual(new Byte(1));
    });
    itThrows("when provided empty byte array", () => {
        Byte.fromU8a([]);
    });
});
