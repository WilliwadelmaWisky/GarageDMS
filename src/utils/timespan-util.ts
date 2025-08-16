import { MAX_VALUE, MIN_VALUE, type TimeSpan } from "@datatypes/timespan";


const MILLIS_IN_SECOND: number = 1000;
const MILLIS_IN_MINUTE: number = MILLIS_IN_SECOND * 60;   //     60,000
const MILLIS_IN_HOUR: number = MILLIS_IN_MINUTE * 60;     //  3,600,000
const HOURS_IN_DAY: number = 24;
const MINUTES_IN_HOUR: number = 60;
const SECONDS_IN_MINUTE: number = 60;


/**
 * @param millis 
 * @returns
 */
function instantiate(millis: number): TimeSpan {

    // Check for invalid values
    if (Number.isNaN(millis)) { throw new Error("value cannot be NaN"); }
    if (millis < MIN_VALUE.Milliseconds) { throw new Error("value cannot be less than minimum"); }
    if (millis > MAX_VALUE.Milliseconds) { throw new Error("value cannot be greater than maximum"); }

    return { 
        Milliseconds: millis 
    };
}

/**
 * 
 * @param seconds 
 * @returns 
 */
export function ofSeconds(seconds: number): TimeSpan { 
    const totalMillis = seconds * MILLIS_IN_SECOND;
    return instantiate(totalMillis);
}

/**
 * 
 * @param hours 
 * @param minutes 
 * @param seconds 
 * @returns 
 */
export function of(hours: number, minutes: number, seconds: number): TimeSpan {
    const totalMillis = hours * MILLIS_IN_HOUR + minutes * MILLIS_IN_MINUTE + seconds * MILLIS_IN_SECOND;
    return instantiate(totalMillis);
}


/**
 * 
 * @param a 
 * @param b 
 * @returns 
 */
export function add(a: TimeSpan, b: TimeSpan): TimeSpan {
    const result = a.Milliseconds + b.Milliseconds;
    return instantiate(result);
}

/**
 * 
 * @param a 
 * @param b 
 * @returns 
 */
export function subtract(a: TimeSpan, b: TimeSpan): TimeSpan {
    const result = a.Milliseconds - b.Milliseconds;
    return instantiate(result);
}


/**
 * @param timespan 
 * @returns
 */
export function getHours(timespan: TimeSpan): number {
    return Math.floor((timespan.Milliseconds / MILLIS_IN_HOUR) % HOURS_IN_DAY);
}

/**
 * @param timespan 
 * @returns
 */
export function getMinutes(timespan: TimeSpan): number {
    return Math.floor((timespan.Milliseconds / MILLIS_IN_MINUTE) % MINUTES_IN_HOUR);
}

/**
 * @param timespan 
 * @returns
 */
export function getSeconds(timespan: TimeSpan): number {
    return Math.floor((timespan.Milliseconds / MILLIS_IN_SECOND) % SECONDS_IN_MINUTE);
}


/**
 * @param timespan 
 * @returns
 */
export function getTotalHours(timespan: TimeSpan): number {
    return timespan.Milliseconds / MILLIS_IN_HOUR;
}

/**
 * @param timespan 
 * @returns
 */
export function getTotalMinutes(timespan: TimeSpan): number {
    return timespan.Milliseconds / MILLIS_IN_MINUTE;
}

/**
 * @param timespan 
 * @returns
 */
export function getTotalSeconds(timespan: TimeSpan): number {
    return timespan.Milliseconds / MILLIS_IN_SECOND;
}


/**
 * @param timespan
 * @returns
 */
export function toString(timespan: TimeSpan): string {
    return `${getTotalHours(timespan)}`
}