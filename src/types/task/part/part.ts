import { v4 as uuidv4 } from "uuid";

/**
 * 
 */
export interface Part {
    partID: string;
    taskID: string;
    itemID: string;
    amount: number;
    cost: number;
    discount: number;
}


/**
 * 
 * @returns 
 */
export function generatePartID(): string {
    return uuidv4();
}


export function calcPartTotal(part: Part): number {
    return calcTotal(part.cost, part.amount, part.discount);
}

export function calcTotal(cost: number, amount: number, discount: number): number {
    const discountClamped = Math.min(Math.max(discount, 0), 1);
    return amount * cost * (1 - discountClamped);
}



export function findPartsByTask(taskID: string): Part[] {
    console.log("findPartsByTask called! not implemented.");
    return [];
}

export function findPartsByItem(itemID: string): Part[] {
    console.log("findPartsByItem called! not implemented.");
    return [];
}

export function newPartByItem(itemID: string): Part | null {
    console.log("newPartByItem called! not implemented.");
    return null;
}
