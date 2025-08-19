/**
 * 
 * @param index 
 * @param array 
 * @returns 
 */
export function normalizeIndex<T>(index: number, array: Array<T>): number {
    if (array.length <= 0 || Number.isNaN(index)) {
        return NaN;
    }

    if (!Number.isInteger(index)) {
        throw new Error("index is not an integer");
    }

    if (index > array.length - 1 || index < -array.length) {
        throw new Error("index is out of bounds of the array");
    }

    return index < 0 ? array.length + index : index;
}
