import React from "react";
import { KEYBOARD_KEYS } from "../util/keyboard_keys";

export default function Keyboard({ onKeyboardClick }) {
    const backspaceSVG = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="backspace"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M22 3H7c-.69 0-1.23.35-1.59.88L.37 11.45c-.22.34-.22.77 0 1.11l5.04 7.56c.36.52.9.88 1.59.88h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3.7 13.3c-.39.39-1.02.39-1.41 0L14 13.41l-2.89 2.89c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41L12.59 12 9.7 9.11c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L14 10.59l2.89-2.89c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41L15.41 12l2.89 2.89c.38.38.38 1.02 0 1.41z"></path></svg>

    const keyboardKeys = KEYBOARD_KEYS.map(keyboardKey =>
        <button key={keyboardKey} 
                className={`${keyboardKey === 'Enter' && "keyboard-key-enter"} keyboard-key`}
                onClick={() => onKeyboardClick(keyboardKey)}>
            <span className="keyboard-key-bg"></span>
            <span className="keyboard-key-content">
                {keyboardKey === 'Backspace'
                    ? backspaceSVG
                    : keyboardKey}
            </span>
        </button>
    );

    return (
        <div className="keyboard-wrapper">
            <section className="keyboard">
                {keyboardKeys}        
            </section>
        </div>
    )
}