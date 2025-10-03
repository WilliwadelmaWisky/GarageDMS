
/**
 * 
 */
export type Label = "duration" | "cost" | "discount" | "total";

/**
 * 
 * @param label 
 * @returns 
 */
export function labelDisplayName(label: Label): string {
    switch (label) {
        case "duration":    return "DURATION (h)";
        case "cost":        return "COST ($)";
        case "discount":    return "DISCOUNT (%)";
        case "total":       return "TOTAL ($)";
    }
}


/**
 * 
 */
export interface JobChangeEvent {
    EVENT_TYPE: "CHANGE";
    jobID: string;
    duration: number;
    cost: number;
    discount: number;
}

/**
 * 
 */
export interface JobDeleteEvent {
    EVENT_TYPE: "DELETE";
    jobID: string;
}

/**
 * 
 */
export interface JobAddEvent {
    EVENT_TYPE: "ADD";
    jobID: string;
    amount: number;
    cost: number;
    discount: number;
}

/**
 * 
 */
type JobEvent = JobChangeEvent | JobDeleteEvent | JobAddEvent;

/**
 * 
 */
export interface JobListChangeEvent {
    targets: JobEvent[];
    deltaTotal: number;
}
