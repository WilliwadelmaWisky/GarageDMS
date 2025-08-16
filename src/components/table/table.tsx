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
export function Table({ children }: Props) {


    return (
        <>
            <input type='text' placeholder='Search...'/>
            <button>Search</button>
            <table>
                <tbody>
                    {children}
                </tbody>
            </table>
        </>
    )
}
