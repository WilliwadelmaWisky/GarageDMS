/**
 * 
 */
export interface Task {
    id: string;
    title: string;
    description: string;
    work: Work[];
    parts: Part[];
    report?: string;
    invoice?: string;
}

/**
 * 
 */
export interface Work {
    id: string;
    title: string;
    expectedDuration: number;
    actualDuration: number;
    hourlyRate: number;
    discount: number;
}

/**
 * 
 */
export interface Part {
    id: string;
    name: string;
    amount: number;
    unitPrice: number;
    discount: number;
}