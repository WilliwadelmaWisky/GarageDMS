import type { Date } from "@datatypes/date";
import type { TimeSpan } from "@datatypes/timespan";

/**
 * 
 */
export type Task = {
    TaskID: string,
    Title: string,
    SellerID: string,
    IsInvoiced: boolean,
    Contents: Content[]
}


export type Content = TextRow | WorkRow | PartRow;

export type TextRow = {
    ID: string,
    Type: "text",
    SellerID: string,
    Text: string,
};

export type WorkRow = {
    ID: string,
    Type: "work",
    SellerID: string,
    MechanicID: string,
    Description: string,
    InstructionTime: TimeSpan,
    ClockedTime: TimeSpan,
    Discount: number,
    UnitPrice: number,
};

export type PartRow = {
    ID: string,
    Type: "part",
    SellerID: string,
    PartID: string,
    Amount: number,
    Discount: number,
    UnitPrice: number,
    CollectDate: Date
};