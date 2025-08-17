import { useState } from "react";

/**
 * 
 */
interface Props {
    children: React.ReactNode[] | React.ReactNode,
    onEdit?: () => void
}

/**
 * 
 * @param props
 * @returns 
 */
export default function TableBodyRowElement({ children, onEdit }: Props) {

    const [isSelected, setIsSelected] = useState<boolean>(false);

    return (
        <tr>
            <th 
                style={{width: "4em", textAlign: "center"}}
                onDoubleClick={e => {
                    if (onEdit !== undefined)
                        onEdit();
                }}
                onClick={e => {
                    console.log("select a row");
                    setIsSelected(true);
                }}
            ></th>
            {children}
        </tr>
    );
}
