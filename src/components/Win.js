import React from "react";
import Stats from "./Stats";

export default function Win({ solution, startNewGame, onClose }) {
    return (
        <div className="prompt">
            <div className="prompt-panel">
                <h2>Goed gedaan!</h2>
                <Stats solution={solution} />
                <div className="prompt-button-container">
                    <button className="button prompt-button secondary-button"
                            onClick={onClose}>
                        Afsluiten
                    </button>
                    <button className="button prompt-button primary-button"
                            type="reset"
                            onClick={() => startNewGame()}>
                        Speel nog een keer
                    </button>
                </div>
                <p className="stats-reset-text">Statistieken <a href="#">verwijderen</a>.</p>
            </div>
        </div>
    )
}