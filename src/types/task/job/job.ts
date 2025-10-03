/**
 * 
 */
export interface Job {
    jobID: string;
    taskID: string;
    title: string;
    duration: number;
    cost: number;
    discount: number;
}


/**
 * 
 * @param job 
 * @returns 
 */
export function calcJobTotal(job: Job): number {
    return calcTotal(job.duration, job.cost, job.discount);
}

/**
 * 
 * @param duration 
 * @param cost 
 * @param discount 
 * @returns 
 */
export function calcTotal(duration: number, cost: number, discount: number): number {
    const discountClamped = Math.min(Math.max(discount, 0), 1);
    return duration * cost * (1 - discountClamped);
}


/**
 * 
 * @param taskID 
 * @returns 
 */
export function findJobsByTask(taskID: string) {
    return [];
}
