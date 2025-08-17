/**
 * 
 */
interface Props {
    title: string,
    className?: string | undefined 
}

/**
 * 
 * @param props 
 * @returns 
 */
export default function TableHeaderCellElement({ title, className }: Props) {

    return (
        <th 
            className={className}
            onMouseMove={e => {
                const rect = e.currentTarget.getBoundingClientRect();
                const offsetX = e.clientX - rect.left;
                const EDGE_THRESHOLD = 10;
                const isOnEdge = offsetX <= EDGE_THRESHOLD || offsetX >= rect.width - EDGE_THRESHOLD;

                e.currentTarget.style.cursor = isOnEdge ? "col-resize": "text";
            }}
            onClick={e => {
                const rect = e.currentTarget.getBoundingClientRect();
                const offsetX = e.clientX - rect.left;
                const EDGE_THRESHOLD = 10;
                const isOnEdge = offsetX <= EDGE_THRESHOLD || offsetX >= rect.width - EDGE_THRESHOLD;

                if (isOnEdge) {
                    console.log("valid click");
                }
            }}
        >
            {title.toUpperCase()}
        </th>
    );
}