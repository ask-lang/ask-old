/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */
@inline
export function arrayToTyped(arr: u8[]): Uint8Array {
  // const size = arr.length;
  // const u8a = new Uint8Array(size);
  // for (let i = 0; i < size; i++) {
  //   u8a[i] = arr[i];
  // }
  // return u8a;
  return Uint8Array.wrap(arr.buffer);
}

export function typedToArray(u8a: Uint8Array, length: i32 = -1): u8[] {
  const size = length == -1 ? u8a.length : length;
  const arr = new Array<u8>(size);
  // for (let i = 0; i < size; i++) {
  //   arr[i] = u8a[i];
  // }
  memory.copy(changetype<usize>(arr.buffer), changetype<usize>(u8a.buffer), size);
  return arr;
}

function toHexCharCode(v: u8): i32 {
  if (v >= 0 && v <= 9) return (v + 0x30) as i32;
  else /*if (v >= 10 && v <= 15)*/ return (v + 0x61 - 10) as i32; // to lowcase a ~ f

}
export function arryToHexString(arr: u8[]): string {
  let charcodes: i32[] = new Array<i32>(arr.length * 2);
  let hsb: u8;
  let lsb: u8;
  for (let i = 0; i < arr.length; i++) {
    hsb = ((arr[i] & 0xf0) >> 4) as u8;
    lsb = (arr[i] & 0x0f) as u8;

    charcodes.push(toHexCharCode(hsb));
    charcodes.push(toHexCharCode(lsb));
  }

  return String.fromCharCodes(charcodes);
}