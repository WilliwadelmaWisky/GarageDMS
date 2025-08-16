import { MAX_VALUE, MIN_VALUE, type Date } from "@datatypes/date";


const DAYS_IN_MONTH: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const DAYS_IN_YEAR: number = 365;
const MONTHS_IN_YEAR: number = 12;


/**
 * 
 * @param dayOfMonth 
 * @param month 
 * @param year 
 * @returns 
 */
export function of(dayOfMonth: number, month: number, year: number): Date {

    // Check errors
    if (Number.isNaN(dayOfMonth) || Number.isNaN(month) || Number.isNaN(year)) { throw new Error('value cannot be nan'); }
    if (!Number.isInteger(dayOfMonth) || !Number.isInteger(month) || !Number.isInteger(year)) { throw new Error('value cannot be decimal'); }
    if (year < MIN_VALUE.Year || year > MAX_VALUE.Year) { throw new Error('invalid year'); }
    if (month < 1 || month > MONTHS_IN_YEAR) { throw new Error('invalid month'); }
    const maxDayOfMonth = (month === 2 && isLeapYear(year)) ? DAYS_IN_MONTH[month - 1] + 1 : DAYS_IN_MONTH[month - 1];
    if (dayOfMonth < 1 || dayOfMonth > maxDayOfMonth) { throw new Error('invalid dayOfMonth'); }

    return {
        DayOfMonth: dayOfMonth,
        Month: month,
        Year: year
    };
}


/**
 * 
 * @param year 
 * @returns 
 */
export function isLeapYear(year: number): boolean { 
    return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
}


/**
 * 
 * @param a 
 * @param b 
 */
export function lessThan(a: Date, b: Date): boolean {
    const yearDifference = a.Year - b.Year;
    if (yearDifference < 0) { return true; }
    if (yearDifference > 0) { return false; }

    // Same year
    const monthDifference = a.Month - b.Month;
    if (monthDifference < 0) { return true; }
    if (monthDifference > 0) { return false; }

    // Same year and month
    const dayDifference = a.DayOfMonth - b.DayOfMonth;
    return dayDifference < 0;
}

/**
 * 
 * @param a 
 * @param b 
 * @returns 
 */
export function greaterThan(a: Date, b: Date): boolean {
    const yearDifference = a.Year - b.Year;
    if (yearDifference > 0) { return true; }
    if (yearDifference < 0) { return false; }

    // Same year
    const monthDifference = a.Month - b.Month;
    if (monthDifference > 0) { return true; }
    if (monthDifference < 0) { return false; }

    // Same year and month
    const dayDifference = a.DayOfMonth - b.DayOfMonth;
    return dayDifference > 0;
}

/**
 * 
 * @param a 
 * @param b 
 * @returns 
 */
export function equals(a: Date, b: Date): boolean {
    return a.Year == b.Year && a.Month == b.Month && a.DayOfMonth == b.DayOfMonth;
}


/**
 * 
 * @param a 
 * @param b 
 */
export function period(a: Date, b: Date): number {
    if (equals(a, b)) { return 0; }

    const earlierDate = lessThan(a, b) ? a : b;
    const laterDate = greaterThan(a, b) ? a : b;

    let periodInDays = dayOfYear(laterDate);
    for (let i = earlierDate.Year; i < laterDate.Year; i++) {
        periodInDays += daysInYear(i);
    }

    return periodInDays - dayOfYear(earlierDate);
}


/**
 * 
 * @param year 
 * @returns 
 */
export function daysInYear(year: number) {
    return isLeapYear(year) ? DAYS_IN_YEAR + 1 : DAYS_IN_YEAR;
}

/**
 * 
 * @param date 
 * @returns
 */
export function dayOfYear(date: Date): number {
    let days = 0;
    for (let i = 1; i < date.Month; i++) {
        const daysInMonth = (i === 2 && isLeapYear(date.Year)) ? DAYS_IN_MONTH[i - 1] + 1 : DAYS_IN_MONTH[i - 1];
        days += daysInMonth;
    }

    return days + date.DayOfMonth;
}


/**
 * 
 * @param date
 * @returns
 */
export function toString(date: Date): string {
    return `${date.DayOfMonth}.${date.Month}.${date.Year.toString().slice(2, 4)}`
}