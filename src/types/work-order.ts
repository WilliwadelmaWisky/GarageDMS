import { Date } from "./date";
import { TimeSpan } from "./timespan";

/**
 * 
 */
export class WorkOrder {

    private _jobs: Job[];

    constructor() {
        this._jobs = [];
    }

    get jobs(): Job[] { return this._jobs; }

    add(job: Job): void {
        this._jobs = [...this._jobs, job];
    }
}

/**
 * 
 */
export class Job {

    private _title: string;
    private _seller: string;
    private _rows: Row[];

    /**
     * 
     * @param title 
     * @param seller 
     */
    constructor(title: string, seller: string) {
        this._title = title;
        this._seller = seller;
        this._rows = [];
    }

    get title(): string { return this._title; }
    get seller(): string { return this._seller; }
    get rows(): Row[] { return this._rows; }

    /**
     * 
     * @param row 
     */
    add(row: Row): void {
        this._rows = [...this._rows, row];
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
    private _discount: number;
    private _totalPrice: number;
    private _collectDate: Date;

    /**
     * 
     * @param type 
     * @param seller 
     * @param text 
     * @param amount 
     * @param unitPrice 
     * @param discount 
     * @param totalPrice 
     */
    constructor(type: Type, seller: string, text: string, amount: number, unitPrice: number, discount: number, totalPrice: number) {
        this._type = type;
        this._seller = seller;
        this._text = text;
        this._instructionTime = TimeSpan.of(amount, 0, 0);
        this._clockedTime = TimeSpan.ZERO;
        this._amount = amount;
        this._unitPrice = unitPrice;
        this._totalPrice = totalPrice;
        this._discount = discount;
        this._collectDate = Date.NULL;
    }

    get type(): Type { return this._type; }
    get seller(): string { return this._seller; }
    get text(): string { return this._text; }
    get instructionTime(): TimeSpan { return this._instructionTime; }
    get clockedTime(): TimeSpan { return this._clockedTime; }
    get amount(): number { return this._amount; }
    get unitPrice(): number { return this._unitPrice; }
    get totalPrice(): number { return this._totalPrice; }
    get discount(): number { return this._discount; }
    get isCollected(): boolean { return Date.equals(this._collectDate, Date.NULL); }
    get collectDate(): Date { return this._collectDate; }
}

export type Type = 'text' | 'labour' | "part"