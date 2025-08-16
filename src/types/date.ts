/**
 * 
 */
export type Date = {
    DayOfMonth: number,
    Month: number,
    Year: number
}

export const NULL: Date = { DayOfMonth: -1, Month: -1, Year: -1 };
export const MIN_VALUE: Date = { DayOfMonth: 1, Month: 1, Year: 1900 };
export const MAX_VALUE: Date = { DayOfMonth: 31, Month: 12, Year: 2100 }; 
