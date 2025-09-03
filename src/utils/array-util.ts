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
 * @param index 
 * @param array 
 * @returns 
 */
export function get<T>(index: number, array: Array<T>): T {
    const i = normalizeIndex(index, array);
    return array[i];
}

/**
 * 
 * @param array 
 * @returns
 */
export function last<T>(array: Array<T>): T {
    return get(-1, array);
}


/**
 * 
 * @param startIndex 
 * @param endIndex 
 * @param array 
 * @param predicate 
 * @returns 
 */
export function previousIndex<T>(startIndex: number, array: Array<T>, predicate: (element: T, index: number) => boolean) {
    for (let i = startIndex; i >= 0; i--) {
        if (predicate(array[i], i)) {
            return i;
        }
    }

    return -1;
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

// ------------------------------------------------------------------------------------------------
//
// ------------------------------- STATE CHANGE ARRAY FUNCTIONS -----------------------------------
//
// ------------------------------------------------------------------------------------------------

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
 * @param array 
 * @param elements 
 * @returns
 */
export function addRange<T>(array: Array<T>, elements: Array<T>): Array<T> {
    return [
        ...array,
        ...elements
    ];
}

/**
 * 
 * @param array 
 * @param index 
 * @param element
 * @returns
 */
export function insert<T>(array: Array<T>, index: number, element: T,): Array<T> {
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
 * @param array 
 * @param index 
 * @param elements 
 * @returns 
 */
export function insertRange<T>(array: Array<T>, index: number, elements: Array<T>): Array<T> {
    if (index < 0 || index > array.length) {
        return array;
    }

    return [
        ...array.slice(0, index),
        ...elements,
        ...array.slice(index)
    ];
}

/**
 * 
 * @param array 
 * @param index 
 * @param count 
 * @returns 
 */
export function deleteRange<T>(array: Array<T>, index: number, count: number = 1): Array<T> {
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
 * @param array 
 * @param predicate 
 * @returns 
 */
export function deleteBy<T>(array: Array<T>, predicate: (element: T) => boolean): Array<T> {
    return [
        ...array.filter(element => !predicate(element))
    ]
}

/**
 * 
 * @param array 
 * @param index 
 * @param element 
 * @returns 
 */
export function replace<T>(array: Array<T>, index: number, element: T): Array<T> {
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
 * @param element 
 * @param array 
 * @returns 
 */
export function replaceRange<T>(array: Array<T>, index: number, elements: Array<T>): Array<T> {
    if (index < 0 || index >= array.length) {
        return array;
    }

    return [
        ...array.slice(0, index),
        ...elements,
        ...array.slice(index + elements.length)
    ];
}

/**
 * 
 * @param array 
 * @param mapper 
 * @returns 
 */
export function replaceBy<T>(array: Array<T>, mapper: (element: T) => T | undefined): Array<T> {
    const copyArray = [ ...array ];

    for (let i = 0; i < copyArray.length; i++) {
        const replacementElement = mapper(copyArray[i]);
        if (replacementElement !== undefined) {
            copyArray[i] = replacementElement;
        }
    }

    return copyArray;
}

/**
 * 
 * @param array 
 * @param index 
 * @param count 
 * @param by
 * @returns
 */
export function moveup<T>(array: Array<T>, index: number, count: number = 1, by: number = 1): Array<T> {
    if (index <= 0 || index >= array.length || count <= 0 || by <= 0) {
        return array;
    }

    return [
        ...array.slice(0, index - by),
        ...array.slice(index, index + count),
        ...array.slice(index - by, index),
        ...array.slice(index + count)
    ];
}

/**
 * 
 * @param array 
 * @param predicate 
 * @returns
 */
export function moveupBy<T>(array: Array<T>, predicate: (element: T) => boolean): Array<T> {
    let copyArray = [ ...array ];

    for (let i = 0; i < copyArray.length; i++) {
        if (predicate(copyArray[i])) {
            const prev = copyArray[i - 1];
            copyArray[i - 1] = copyArray[i];
            copyArray[i] = prev;
        }
    }

    return copyArray;
}

/**
 * 
 * @param array 
 * @param index 
 * @param count
 * @param by 
 * @returns
 */
export function movedown<T>(array: Array<T>, index: number, count: number = 1, by: number = 1): Array<T> {
    if (index < 0 || index >= array.length - 1 || count <= 0 || by <= 0) {
        return array;
    }

    return [
        ...array.slice(0, index),
        ...array.slice(index + count, index + count + by),
        ...array.slice(index, index + count),
        ...array.slice(index + count + by)
    ];
}

/**
 * 
 * @param array 
 * @param predicate 
 * @returns
 */
export function movedownBy<T>(array: Array<T>, predicate: (element: T) => boolean): Array<T> {
    let copyArray = [ ...array ];

    for (let i = copyArray.length - 1; i >= 0; i--) {
        if (predicate(copyArray[i])) {
            const prev = copyArray[i + 1];
            copyArray[i + 1] = copyArray[i];
            copyArray[i] = prev;
        }
    }

    return copyArray;
}
