const DAYS_IN_MONTH: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const DAYS_IN_YEAR: number = 365;
const MONTHS_IN_YEAR: number = 12;

/**
 * 
 */
export class Date {

    private _dayOfMonth: number;
    private _month: number;
    private _year: number;


    /**
     * 
     * @param dayOfMonth 
     * @param month 
     * @param year 
     * @returns 
     */
    public static of(dayOfMonth: number, month: number, year: number): Date {
        if (Number.isNaN(dayOfMonth) || Number.isNaN(month) || Number.isNaN(year)) {
            throw new Error('value cannot be nan');
        }

        if (!Number.isInteger(dayOfMonth) || !Number.isInteger(month) || !Number.isInteger(year)) {
            throw new Error('value cannot be decimal');
        }

        if (year < 1900 || year > 2100) {
            throw new Error('invalid year');
        }

        if (month < 1 || month > MONTHS_IN_YEAR) {
            throw new Error('invalid month');
        }

        const maxDayOfMonth = (month === 2 && Date.isLeapYear(year)) ? DAYS_IN_MONTH[month - 1] + 1 : DAYS_IN_MONTH[month - 1];
        if (dayOfMonth < 0 || dayOfMonth > maxDayOfMonth) {
            throw new Error('invalid dayOfMonth');
        }

        return new Date(dayOfMonth, month, year);
    }


    /**
     * 
     * @param year 
     * @returns 
     */
    public static isLeapYear(year: number): boolean { 
        return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
    }


    /**
     * 
     * @param a 
     * @param b 
     */
    public static lessThan(a: Date, b: Date): boolean {
        const yearDifference = a._year - b._year;
        if (yearDifference < 0) { return true; }
        if (yearDifference > 0) { return false; }

        // Same year
        const monthDifference = a._month - b._month;
        if (monthDifference < 0) { return true; }
        if (monthDifference > 0) { return false; }

        // Same year and month
        const dayDifference = a._dayOfMonth - b._dayOfMonth;
        return dayDifference < 0;
    }

    /**
     * 
     * @param a 
     * @param b 
     * @returns 
     */
    public static greaterThan(a: Date, b: Date): boolean {
        const yearDifference = a._year - b._year;
        if (yearDifference > 0) { return true; }
        if (yearDifference < 0) { return false; }

        // Same year
        const monthDifference = a._month - b._month;
        if (monthDifference > 0) { return true; }
        if (monthDifference < 0) { return false; }

        // Same year and month
        const dayDifference = a._dayOfMonth - b._dayOfMonth;
        return dayDifference > 0;
    }

    /**
     * 
     * @param a 
     * @param b 
     * @returns 
     */
    public static equals(a: Date, b: Date): boolean {
        return a._year == b._year && a._month == b._month && a._dayOfMonth == b._dayOfMonth;
    }


    /**
     * 
     * @param a 
     * @param b 
     */
    public static period(a: Date, b: Date): number {
        if (Date.equals(a, b)) {
            return 0;
        }

        const earlierDate = Date.lessThan(a, b) ? a : b;
        const laterDate = Date.greaterThan(a, b) ? a : b;

        const daysInYear = (year: number) => Date.isLeapYear(year) ? DAYS_IN_YEAR + 1 : DAYS_IN_YEAR;
        let periodInDays = laterDate.dayOfYear;

        for (let i = earlierDate._year; i < laterDate._year; i++) {
            periodInDays += daysInYear(i);
        }

        return periodInDays - earlierDate.dayOfYear;
    }


    /**
     * 
     * @param dayOfMonth 
     * @param month 
     * @param year 
     */
    private constructor(dayOfMonth: number, month: number, year: number) {
        this._dayOfMonth = dayOfMonth;
        this._month = month;
        this._year = year;
    }


    /**
     * 
     */
    public get dayOfMonth(): number { 
        return this._dayOfMonth; 
    }

    /**
     * 
     */
    public get dayOfYear(): number {
        let days = 0;
        for (let i = 1; i < this._month; i++) {
            const daysInMonth = (i === 2 && Date.isLeapYear(this._year)) ? DAYS_IN_MONTH[i - 1] + 1 : DAYS_IN_MONTH[i - 1];
            days += daysInMonth;
        }

        return days + this._dayOfMonth;
    }

    /**
     * 
     */
    public get month(): number { 
        return this._month; 
    }

    /**
     * 
     */
    public get year(): number { 
        return this._year; 
    }
}