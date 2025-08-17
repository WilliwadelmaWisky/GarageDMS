/**
 * 
 */
interface Props {
    children: React.ReactNode[] | React.ReactNode
}

/**
 * 
 * @param props 
 */
export default function TableHeaderRowElement({ children }: Props) {
    return (
        <tr>
            <th style={{width: "4em", textAlign: "center"}}></th>
            {children}
        </tr>
    );
}