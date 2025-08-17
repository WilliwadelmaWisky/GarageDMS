import type { ReactNode } from 'react';
import './table.css';

/**
 * 
 */
interface Props {
    children: ReactNode | ReactNode[];
}

/**
 * @param props ...
 */
export default function TableElement({ children }: Props) {


    return (
        <table>
            <tbody>
                {children}
            </tbody>
        </table>
    )
}
