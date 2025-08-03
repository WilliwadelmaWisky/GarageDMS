import { Body } from './body';
import { Head } from './head';
import './table.css';

/**
 * 
 * @returns 
 */
export default function Table() {


    return (
        <>
            <table>
                <thead>
                    <Head elements={["title", "i. time", "c. time", "amount", "price", "discount %", "collected"]}/>
                </thead>
                <tbody>
                    <Body 
                        number={1}
                        type='job'
                        seller='CODE'
                        elements={[ 
                            { value: "Job 1: Oil Change", isEditable: false, type: "text"},
                            { value: "", isEditable: false, type: "number"},
                            { value: "", isEditable: false, type: "number"},
                            { value: "", isEditable: true, type: "number"},
                            { value: "", isEditable: true, type: "number"},
                            { value: "", isEditable: true, type: "number"},
                            { value: "", isEditable: false, type: "date"}
                        ]}
                    />
                    <Body 
                        number={2}
                        type='work'
                        seller='CODE'
                        elements={[ 
                            { value: "Scheduled Service", isEditable: false, type: "text"},
                            { value: "1.00", isEditable: false, type: "number"},
                            { value: "0.00", isEditable: false, type: "number"},
                            { value: "1.00", isEditable: true, type: "number"},
                            { value: "100", isEditable: true, type: "number"},
                            { value: "0.00", isEditable: true, type: "number"},
                            { value: "", isEditable: false, type: "date"}
                        ]}
                    />
                    <Body 
                        number={3}
                        type='work'
                        seller='CODE'
                        elements={[ 
                            { value: "1234567, SHELF 1, Oil Filter", isEditable: false, type: "text"},
                            { value: "", isEditable: false, type: "number"},
                            { value: "", isEditable: false, type: "number"},
                            { value: "1.00", isEditable: true, type: "number"},
                            { value: "20.50", isEditable: true, type: "number"},
                            { value: "0.00", isEditable: true, type: "number"},
                            { value: "2.8.2025", isEditable: false, type: "date"}
                        ]}
                    />
                </tbody>
            </table>
            <p>Total Price</p>
        </>
    )
}