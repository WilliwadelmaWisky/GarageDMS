/**
 * 
 */
export interface Report {
    reportID: string;
    taskID: string;
    mechanic: string;
    value: string;
    date: Date;
}

/**
 * 
 * @param taskID 
 * @returns 
 */
export function findReportsByTask(taskID: string): Report[] {
    return [];
}
