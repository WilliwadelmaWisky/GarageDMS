/**
 * 
 */
export interface Task {
    taskID: string;
    title: string;
    description: string;
    isWarranty: boolean;
}


export function isTaskInvoiced(taskID: string): boolean {
    console.log("isTaskInvoiced called! not implemented.");
    return false;
}

export function calcTaskTotal(taskID: string): number {

    /*
    const totalWorkPrice = hasWorks ? task.works!.map(w => w.expectedDuration * w.hourlyRate * (1 - w.discount)).reduce((prev, current) => prev + current) : 0;
    const totalPartPrice = hasParts ? task.parts!.map(p => p.amount * p.unitPrice * (1 - p.discount)).reduce((prev, current) => prev + current) : 0;
    const totalPrice = totalWorkPrice + totalPartPrice;
    */

    console.log("calcTaskTotal called! not implemented.");
    return 0;
}