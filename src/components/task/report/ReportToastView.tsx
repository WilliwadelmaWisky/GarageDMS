import { type Report } from "@dtypes/task/report/report";
import ReportToast from "./ReportToast";

/**
 * 
 */
interface ReportToastViewProps {
    reports: Report[];
    className?: string;
}

/**
 * 
 * @param param0 
 * @returns 
 */
export default function ReportToastView({ 
    reports,
    className, 
}: ReportToastViewProps) {

    return (
        <div className={className}>
            <strong>Reports of Mechanics</strong>
            <div className="d-flex flex-column gap-2">
                {reports.map(report => (
                    <ReportToast 
                        key={report.reportID} 
                        className="w-100" 
                        report={report}
                    />
                ))}
            </div>
        </div>  
    );
}
