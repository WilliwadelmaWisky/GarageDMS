import { useEffect } from "react";


/**
 * 
 */
export interface KeyEvent {
    altKey: boolean;
    ctrlKey: boolean;
    shiftKey: boolean;
    key: string;
}


export function useKeyboard(func: (e: KeyEvent) => void) {

    useEffect(() => {

        /**
         * 
         * @param e 
         */
        function onKeyPressed(e: KeyboardEvent) {

            // Ignore key presses that come from input fields for example
            if (e.target !== window.document.body) {
                return;
            }

            func({
                altKey: e.altKey,
                ctrlKey: e.ctrlKey,
                shiftKey: e.shiftKey,
                key: e.key
            });
        }

        window.addEventListener("keypress", onKeyPressed);
        return () => window.removeEventListener("keypress", onKeyPressed);
    }, []);
}