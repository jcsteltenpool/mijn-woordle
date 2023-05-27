import React from "react";

export default function PlayAgainButton({ startNewGame }) {
    return (
        <button className="button prompt-button primary-button"
                type="reset"
                onClick={() => startNewGame()}>
                Speel nog een keer
        </button>
    )
}