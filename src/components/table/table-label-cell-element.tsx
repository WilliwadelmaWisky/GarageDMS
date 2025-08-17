/**
 * 
 */
interface Props {
    value: string,
    className?: string | undefined
}

/**
 * 
 * @param props 
 * @returns 
 */
export default function TableLabelCellElement({ value, className }: Props) {

    return (
        <td className={className}>
            <p>{value}</p>
        </td>
    );
}