import type { TimeSpan } from "@datatypes/timespan";
import type { Date } from "@datatypes/date";

export const HEADERS = ["type", "staff", "title", "i. time", "c, time", "amount", "unit price", "discount %", "total price", "collect date", "amount in stock", "amount available"];

/**
 * 
 */
export type Row = {
    rowID: string,
    type: "task" | "comment" | "part" | "work",
    staffID: string,
    title: string,
    instructionTime: TimeSpan,
    clockedTime: TimeSpan,
    amount: number,
    unitPrice: number,
    discount: number,
    totalPrice: number,
    collectDate: Date,
    amountInStock: number,
    amountAvailable: number
}