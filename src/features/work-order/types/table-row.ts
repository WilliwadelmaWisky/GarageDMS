import type { Date } from '@datatypes/date';
import type { TimeSpan } from '@datatypes/timespan';

/**
 * 
 */
export type TableRow = {
    Type: string,
    Seller: string,
    Mechanic: string,
    Text: string,
    InstructionTime: TimeSpan,
    ClockedTime: TimeSpan,
    Amount: number,
    UnitPrice: number,
    Discount: number,
    TotalPrice: number,
    CollectDate: Date,
    AmountInStock: number,
    AmountAvailable: number
}
