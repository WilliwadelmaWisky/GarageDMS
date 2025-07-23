import type { ReactNode } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

type EventKey = string;

interface TabGroupArgs {
    defaultEventKey: EventKey,
    tabs: TabData[]
}

interface TabData {
    eventKey: EventKey,
    title: string,
    content: ReactNode
}

/**
 * 
 * @returns 
 */
export default function TabGroup({ defaultEventKey, tabs }: TabGroupArgs) {
    return (
        <Tabs
            defaultActiveKey={defaultEventKey}
            className="mb-3 mt-5"
        >
            {tabs.map((tab, index) => (
                <Tab key={index} 
                     eventKey={tab.eventKey} 
                     title={tab.title}
                >
                    {tab.content}
                </Tab>
            ))}
        </Tabs>
    )
}