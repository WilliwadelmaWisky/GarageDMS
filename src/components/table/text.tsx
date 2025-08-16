/**
 * 
 */
interface Props {
    value: string
}

/**
 * 
 * @param props 
 * @returns 
 */
export default function Text({ value }: Props) {

    return (
        <td>
            {value}
        </td>
    );
}