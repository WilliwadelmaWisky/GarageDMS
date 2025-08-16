
/**
 * 
 * @param param0 
 * @returns 
 */
export function TableHeaderItem({ element }: TableHeaderItemProps) {

    return (
        <th 
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
            {element.toUpperCase()}
        </th>
    );
}

interface TableHeaderItemProps {
    element: string,

}

export function TableBodyEmptyItem() {
    return <td></td>;
}
