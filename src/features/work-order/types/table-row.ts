import { Date } from '@datatypes/date';
import type { TimeSpan } from '@datatypes/timespan';

export type TableRow = {
    Type: Type,
    Seller: string,
    Text: string,
    InstructionTime: TimeSpan,
    ClockedTime: TimeSpan,
    Amount: number,
    UnitPrice: number,
    Discount: number,
    TotalPrice: number,
    CollectDate: Date
}

type Type = "job" | "text" | "part"