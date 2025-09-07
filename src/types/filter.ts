/**
 * 
 */
export interface Filter<T> {
    match: (target: T) => boolean;
}