import React from "react";
import PlayAgainButton from "./PlayAgainButton";

export default function Info({ onClose, startNewGame, showKeyboard }) {
    return (
        <div className="content-modal">
            <div className="content-modal-panel-wrapper">
                <div className="content-modal-panel">
                    <h2>Mijn Woordle</h2>
                    <p>Raad het woord in 6 keer. Na elke poging geven de gekleurde letters aan hoe dichtbij je was.</p>
                    <p> 🟩 Goede letter op de goede plek 
                        <br/>
                        🟨 Goede letter op de verkeerde plek
                        <br/>
                        ⬛ Verkeerde letter
                    </p>
                    <p>Je kunt Mijn Woordle onbeperkt spelen!</p>
                    {showKeyboard
                        ? <button className="button primary-button"
                                  onClick={onClose}>
                            Speel Mijn Woordle
                          </button>
                        : <PlayAgainButton startNewGame={startNewGame}/>
                    }
                    
                </div>
            </div>
        </div>
    )
} 