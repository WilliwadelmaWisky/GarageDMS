import { useReportWrapperState } from "./Report.hooks";
import ReportToastView from "./ReportToastView";

/**
 * 
 */
interface ReportToastViewWrapperProps {
    taskID: string;
    className?: string;
}

/**
 * 
 * @param param0 
 */
export default function ReportToastViewWrapper({
    taskID,
    className,
}: ReportToastViewWrapperProps) {

    const { reports, setState } = useReportWrapperState(taskID);

    return (
        <ReportToastView reports={reports} className={className}/>
    );
}