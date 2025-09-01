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


/**
 * 
 * @param startIndex 
 * @param endIndex 
 * @param array 
 * @param predicate 
 * @returns 
 */
export function nextIndex<T>(startIndex: number, array: Array<T>, predicate: (element: T, index: number) => boolean) {
    for (let i = startIndex; i < array.length; i++) {
        if (predicate(array[i], i)) {
            return i;
        }
    }

    return -1;
}


/**
 * 
 * @param element 
 * @param array 
 * @returns 
 */
export function add<T>(element: T, array: Array<T>): Array<T> {
    return [
        ...array,
        element
    ];
}

/**
 * 
 * @param index 
 * @param element
 * @param array 
 * @returns
 */
export function insert<T>(index: number, element: T, array: Array<T>): Array<T> {
    if (index < 0 || index > array.length) {
        return array;
    }

    return [ 
        ...array.slice(0, index),
        element,
        ...array.slice(index) 
    ];
}

/**
 * 
 * @param index 
 * @param count 
 * @param array 
 * @returns 
 */
export function del<T>(index: number, count: number, array: Array<T>): Array<T> {
    if (index < 0 || index >= array.length || count <= 0) {
        return array;
    }

    return [
        ...array.slice(0, index),
        ...array.slice(index + count)
    ];
}

/**
 * 
 * @param index 
 * @param element 
 * @param array 
 * @returns 
 */
export function replace<T>(index: number, element: T, array: Array<T>): Array<T> {
    if (index < 0 || index >= array.length) {
        return array;
    }

    return [
        ...array.slice(0, index),
        element,
        ...array.slice(index + 1)
    ];
}

/**
 * 
 * @param index 
 * @param array 
 * @returns
 */
export function moveup<T>(index: number, array: Array<T>): Array<T> {
    if (index <= 0 || index >= array.length) {
        return array;
    }

    return [
        ...array.slice(0, index - 1),
        array[index],
        array[index - 1],
        ...array.slice(index + 1)
    ];
}

/**
 * 
 * @param index 
 * @param array 
 * @returns
 */
export function movedown<T>(index: number, array: Array<T>): Array<T> {
    if (index < 0 || index >= array.length - 1) {
        return array;
    }

    return [
        ...array.slice(0, index),
        array[index + 1],
        array[index],
        ...array.slice(index + 2)
    ];
}
