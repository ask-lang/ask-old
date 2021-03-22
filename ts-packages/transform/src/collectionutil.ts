export class Collections {
    /**
     * Check the array is empty
     * @param arr parameter array
     */
    static isEmptyArray<T>(arr: T[]): boolean {
        return arr.length == 0;
    }

    static newArray<T>(arg1: T): T[] {
        var arr = new Array<T>();
        arr.push(arg1);
        return arr;
    }
}
