import type { Date } from "@datatypes/date";
import type { TimeSpan } from "@datatypes/timespan";

/**
 * 
 */
export type WorkOrder = {
    ID: number,
    Type: Type,
    Jobs: Job[]
};

type Type = "offer" | "order";

type Job = {
    Title: string,
    SellerID: string,
    IsInvoiced: boolean,
    Contents: Content[]
}

export type Content = TextRow | WorkRow | PartRow;

export type TextRow = {
    Type: "text",
    SellerID: string,
    Text: string,
};

export type WorkRow = {
    Type: "work",
    SellerID: string,
    MechanicID: string,
    InstructionTime: TimeSpan,
    ClockedTime: TimeSpan,
    Discount: number,
    UnitPrice: number,
    TotalPrice: number
};

export type PartRow = {
    Type: "part",
    SellerID: string,
    PartID: string,
    Amount: number,
    Discount: number,
    UnitPrice: number,
    TotalPrice: number,
    CollectDate: Date
};