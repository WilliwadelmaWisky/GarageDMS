import type { Report } from "@dtypes/task/report/report";
import { format } from "date-fns/format";
import Toast from "react-bootstrap/esm/Toast";

/**
 * 
 */
interface ReportToastProps {
    report: Report;
    className?: string;
}

/**
 * 
 * @param param0 
 * @returns 
 */
export default function ReportToast({
    report,
    className,
}: ReportToastProps) {
    
    return (
        <Toast className={className}>
            <Toast.Header closeButton={false}>
                <strong className="me-auto">{report.mechanic}</strong>
                <strong>{format(report.date, "d.M.yyyy")}</strong>
            </Toast.Header>
            <Toast.Body>
                {report.value}
            </Toast.Body>
        </Toast>
    );
}