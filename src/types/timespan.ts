/**
 * 
 */
export type TimeSpan = {
    Milliseconds: number
}

export const NULL: TimeSpan = { Milliseconds: -1 };
export const ZERO: TimeSpan = { Milliseconds: 0 };
export const MIN_VALUE: TimeSpan = { Milliseconds: 0 };
export const MAX_VALUE: TimeSpan = { Milliseconds: 3600000000 };