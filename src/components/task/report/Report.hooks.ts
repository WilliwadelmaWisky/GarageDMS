import { findReportsByTask, type Report } from "@dtypes/task/report/report";
import { useState } from "react";

/**
 * 
 */
interface WrapperState {
    reports: Report[];
}

/**
 * 
 * @param taskID 
 * @returns
 */
export function useReportWrapperState(taskID: string) {

    const [state, setState] = useState<WrapperState>(() => ({
        reports: findReportsByTask(taskID),
    }));


    return { reports: state.reports, setState };
}