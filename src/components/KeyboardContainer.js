import React from "react";
import { KEYBOARD_KEYS } from "../util/keyboard_keys";


export default function Keyboard() {
    const keyboardKeys = KEYBOARD_KEYS.map(keyboardKey =>
        <button key={keyboardKey.id} className={`${keyboardKey.id === 'enter' && "keyboard-key-enter"} keyboard-key`}>
            <span className="keyboard-key-bg"></span>
            <span className="keyboard-key-content">{keyboardKey.value}</span>
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