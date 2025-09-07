import type { TableColumnData } from "@dtypes/table";

/**
 * 
 */
interface TableHeadProps {
    column: TableColumnData;
}

/**
 * 
 * @param props 
 * @returns 
 */
export default function TableHead({ column }: TableHeadProps) {

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!column.enableExpanding) {
            return;
        }

        const rect = e.currentTarget.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const EDGE_THRESHOLD = 10;
        const isOnEdge = offsetX <= EDGE_THRESHOLD || offsetX >= rect.width - EDGE_THRESHOLD;

        //e.currentTarget.style.cursor = isOnEdge ? "col-resize": "text";
    };

    const handleClick = (e: React.MouseEvent) => {
        if (!column.enableSorting) {
            return;
        }

        const rect = e.currentTarget.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const EDGE_THRESHOLD = 10;
        const isOnEdge = offsetX <= EDGE_THRESHOLD || offsetX >= rect.width - EDGE_THRESHOLD;

        if (isOnEdge) {
            console.log("valid click");
        }
    }

    return (
        <th 
            onMouseMove={handleMouseMove}
            onClick={handleClick}
        >
            <>
                {column.title.toUpperCase()}
                {column.enableSorting && <><span>+</span><span>-</span></>}
            </>
        </th>
    );
}