import type { TimeSpan } from "@datatypes/timespan";

/**
 * 
 */
export type Work = {
    WorkID: string,
    Order: string,
    TaskID: string,
    StaffID: string,
    Description: string,
    InstructionTime: TimeSpan,
    ClockedTime: TimeSpan,
    Discount: number,
    UnitPrice: number,
}