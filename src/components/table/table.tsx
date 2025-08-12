import type { ReactNode } from 'react';
import './table.css';

/**
 * 
 * @returns 
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

export interface Props {
    children: ReactNode | ReactNode[];
}
