import React from "react";
import Stats from "./Stats";
import PlayAgainButton from "./PlayAgainButton";

export default function Result({ solution, isWon, startNewGame, onClose }) {
    return (
        <div className="prompt">
            <div className="prompt-panel">
                { isWon 
                    ? <h2>Goed gedaan!</h2>
                    : <h2>Jammer!</h2>
                }
                
                <Stats solution={solution} />

                <div className="prompt-button-container">
                    <button className="button prompt-button secondary-button"
                            onClick={onClose}>
                        Afsluiten
                    </button>
                    <PlayAgainButton startNewGame={startNewGame}/>
                </div>
                <p className="stats-reset-text">Statistieken <a href="#">verwijderen</a>.</p>
            </div>
        </div>
    )
}