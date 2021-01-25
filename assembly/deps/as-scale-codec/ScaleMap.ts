import { CompactInt } from ".";
import { BytesReader } from "./BytesReader";
import { Codec } from "./interfaces/Codec";
import { UnwrappableCodec } from "./interfaces/UnwrappableCodec";

/**
 * @description SCALE Codec support for native Map type
 */
export class ScaleMap<K extends Codec, V extends Codec> implements UnwrappableCodec<Map<K, V>>{
    /**
     * Map value of ScaleMap
     */
    public readonly data: Map<K, V>;
    
    constructor(data: Map<K, V> = new Map()){
        this.data = data;
    }
    
    /**
     * @description return underlying native type
     */
    unwrap(): Map<K, V>{
        return this.data;
    }
    /**
     * Check if ScaleMap has given key
     * @param key 
     */
    has(key: K): bool{
        return this.data.has(key);
    }
    /**
     * Get the value of given key
     * @param key 
     */
    get(key: K): V{
        return this.data.get(key);
    }
    /**
     * Set this value to the given key
     * @param key 
     * @param value 
     */
    set(key: K, value: V): void{
        this.data.set(key, value);
    }
    /**
     * Delete the given key with its value from the ScaleMap
     * @param key 
     */
    delete(key: K): void{
        this.data.delete(key);
    }
    /**
     * Get array of keys of the ScaleMap
     */
    keys(): K[]{
        return this.data.keys();
    }
    /**
     * Get array of values of the ScaleMap
     */
    values(): V[]{
        return this.data.values();
    }
    /**
     * The number of bytes this Map has
     */
    encodedLength(): i32{
        return this.toU8a().length;
    }
    /**
     * Convert ScaleMap to u8[]
     * Length is encoded first, followed by all key and value encodings concatenated 
     */
    toU8a(): u8[]{
        let result: u8[] = [];
        let keys: K[] = this.data.keys();
        let lenData: CompactInt = new CompactInt(keys.length);
        result = result.concat(lenData.toU8a());
        for(let i = 0; i < keys.length; i++){
            result = result
            .concat(keys[i].toU8a())
            .concat(this.data.get(keys[i]).toU8a());
        }
        return result;
    }
    
    /**
     * @description Non-static constructor
     * @param bytes 
     * @param index 
     */
    populateFromBytes(bytes: u8[], index: i32 = 0): void {
        const bytesReader = new BytesReader(bytes.slice(index));
        const lenComp = bytesReader.readInto<CompactInt>();
        for(let i: i32 = 0; i < lenComp.unwrap(); i++){
            const key = bytesReader.readInto<K>();
            const value = bytesReader.readInto<V>();
            this.data.set(key, value);
        }
    }
    /**
     * @description Overloaded == operator
     * @param a instance of ExtrinsicData
     * @param b Instance of ExtrinsicData
     */
    eq(other: ScaleMap<K, V>): bool {
        let areEqual = true;
        const aKeys = this.data.keys();
        const bKeys = other.data.keys();

        if(aKeys.length != bKeys.length){
            return false;
        }
        for (let i=0; i<aKeys.length; i++){
            if(aKeys[i] != bKeys[i]){
                areEqual = false;
                break;
            }
        }
        return areEqual;
    }

    /**
     * @description Overloaded != operator
     * @param a instance of ExtrinsicData
     * @param b Instance of ExtrinsicData
     */
    notEq(other: ScaleMap<K, V>): bool {
        return !this.eq(other);
    }

    static fromU8a<K extends Codec, V extends Codec>(input: u8[], index: i32 = 0): ScaleMap<K, V>{
        const data = new Map<K, V>();
        const bytesReader = new BytesReader(input);
        const lenComp = bytesReader.readInto<CompactInt>();

        for(let i: i32 = 0; i<lenComp.unwrap(); i++){
            const key = bytesReader.readInto<K>();
            const value = bytesReader.readInto<V>();
            data.set(key, value);
        }
        return new ScaleMap<K, V>(data);
    }
}