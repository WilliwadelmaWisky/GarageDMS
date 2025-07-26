import type { TimeSpan } from "./timespan";

/**
 * 
 */
export class WorkOrder {
    private _rows: Row[];

    constructor() {
        this._rows = [];
    }
}

/**
 * 
 */
export class Row {
    private _type: Type;
    private _seller: string;
    private _text: string;
    private _instructionTime: TimeSpan;
    private _clockedTime: TimeSpan;
    private _amount: number;
    private _unitPrice: number;
    private _totalPrice: number;
    private _collectDate: Date;
}

export type Type = 'text' | 'job'