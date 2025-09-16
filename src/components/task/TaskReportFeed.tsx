import type { Report } from "@dtypes/task/task";
import { format } from "date-fns/format";
import Toast from "react-bootstrap/esm/Toast";

/**
 * 
 */
interface TaskReportFeedProps {
    reports: Report[];
    className?: string;
}

/**
 * 
 * @param param0 
 * @returns 
 */
export default function TaskReportFeed({ reports, className }: TaskReportFeedProps) {

    return (
        <div className={className}>
            <strong>Reports of Mechanics</strong>
            <div className="d-flex flex-column gap-2">
                {reports.map(report => (
                    <Toast key={report.id} className="w-100">
                        <Toast.Header closeButton={false}>
                            <strong className="me-auto">{report.mechanic}</strong>
                            <strong>{format(report.date, "d.M.yyyy")}</strong>
                        </Toast.Header>
                        <Toast.Body>
                            {report.value}
                        </Toast.Body>
                    </Toast>
                ))}
            </div>
        </div>  
    );
}