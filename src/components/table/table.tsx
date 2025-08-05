import type { ReactNode } from 'react';
import './table.css';

/**
 * 
 * @returns 
 */
export function Table({ children }: Props) {


    return (
        <>
            <table>
                <tbody>
                    {children}
                </tbody>
            </table>
            <p>Total Price</p>
        </>
    )
}

export interface Props {
    children: ReactNode | ReactNode[];
}
