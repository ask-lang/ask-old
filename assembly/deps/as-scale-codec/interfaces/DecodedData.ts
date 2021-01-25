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

/**
 * @name DecodedData
 * @description
 * DecodedData is used in Scale arrays as a standard output
 * each element should return after decoding
 * @param
 * value - Decoded value
 * decBytes - Number of decoded bytes
 */

export class DecodedData<T> {
    constructor (public readonly value: T, public readonly decBytes: i32) { }
}