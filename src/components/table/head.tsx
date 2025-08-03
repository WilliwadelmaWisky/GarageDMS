import "./head.css";

/**
 * 
 * @returns 
 */
export function Head({ elements }: Props) {
    return (
        <tr>
            <th></th>
            <th>TYPE</th>
            <th>SELLER</th>
            {elements.map((element, index) => (
                <th 
                    key={index}
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
            ))}
        </tr>
    );
}

export interface Props {
    elements: string[]
}