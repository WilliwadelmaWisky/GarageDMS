/**
 * 
 */
export interface Task {
    id: string;
    title: string;
    description: string;
    works: Work[];
    parts?: Part[];
    reports?: Report[];
    invoice?: string;
}

/**
 * 
 */
export interface Report {
    mechanic: string;
    value: string;
    date: Date;
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