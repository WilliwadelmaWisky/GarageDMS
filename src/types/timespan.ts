const MILLIS_IN_SECOND: number = 1000;
const MILLIS_IN_MINUTE: number = MILLIS_IN_SECOND * 60;   //     60,000
const MILLIS_IN_HOUR: number = MILLIS_IN_MINUTE * 60;     //  3,600,000

/**
 * 
 */
export class TimeSpan {

    public static get ZERO(): TimeSpan { return new TimeSpan(0); }
    public static get MIN_VALUE(): TimeSpan { return new TimeSpan(0); }
    public static get MAX_VALUE(): TimeSpan { return new TimeSpan(3600000000); }

    private _millis: number;


    /**
     * 
     * @param seconds 
     * @returns 
     */
    public static ofSeconds(seconds: number): TimeSpan { 
        const secondsInMillis = seconds * 60;
        return new TimeSpan(secondsInMillis);
    }

    /**
     * 
     * @param hours 
     * @param minutes 
     * @param seconds 
     * @returns 
     */
    public static of(hours: number, minutes: number, seconds: number): TimeSpan {
        const totalSeconds = hours * 3600 + minutes * 60 + seconds;
        return TimeSpan.ofSeconds(totalSeconds);
    }


    /**
     * 
     * @param a 
     * @param b 
     * @returns 
     */
    public static add(a: TimeSpan, b: TimeSpan): TimeSpan {
        const result = a._millis + b._millis;
        return new TimeSpan(result);
    }

    /**
     * 
     * @param a 
     * @param b 
     * @returns 
     */
    public subtract(a: TimeSpan, b: TimeSpan): TimeSpan {
        const result = a._millis - b._millis;
        return new TimeSpan(result);
    }


    /**
     * 
     * @param millis 
     */
    constructor(millis: number) {
        if (Number.isNaN(millis)) {
            throw new Error("value cannot be NaN");
        }

        if (millis < 0) {
            throw new Error("value cannot be less than minimum");
        }

        if (millis > 3600000000) {
             throw new Error("value cannot be greater than maximum");
        }

        this._millis = millis;
    }


    /**
     * 
     */
    public get hours(): number {
        return Math.floor((this._millis / MILLIS_IN_HOUR) % 24);
    }

    /**
     * 
     */
    public get minutes(): number {
        return Math.floor((this._millis / MILLIS_IN_MINUTE) % 60);
    }

    /**
     * 
     */
    public get seconds(): number {
        return Math.floor((this._millis / MILLIS_IN_SECOND) % 60);
    }


    /**
     * 
     */
    public get totalHours(): number {
        return this._millis / MILLIS_IN_HOUR;
    }

    /**
     * 
     */
    public get totalMinutes(): number {
        return this._millis / MILLIS_IN_MINUTE;
    }

    /**
     * 
     */
    public get totalSeconds(): number {
        return this._millis / MILLIS_IN_SECOND;
    }

    /**
     * 
     */
    public get totalMilliseconds(): number {
        return this._millis;
    }


    /**
     * 
     * @returns
     */
    public toString(): string {
        return `${this.totalHours}`
    }
}