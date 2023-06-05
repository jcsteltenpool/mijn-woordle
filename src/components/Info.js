import React from "react";
import PlayAgainButton from "./PlayAgainButton";

export default function Info({ onClose, startNewGame, inProgress, setModalContent }) {
    return (
        <div className="content-modal">
            <div className="content-modal-panel-wrapper">
                <div className="content-modal-panel">
                    <h2>Raad Het Woord</h2>
                    <p>Raad het woord in 6 keer. Na elke poging geven de gekleurde letters aan hoe dichtbij je was.</p>
                    <p className="info-paragraph"><span className="spacer">🟩</span> Goede letter op de goede plek </p>
                    <p className="info-paragraph"><span className="spacer">🟨</span> Goede letter op de verkeerde plek </p>
                    <p><span className="spacer">⬛</span> Verkeerde letter</p>
                    <p>Je kunt Raad Het Woord onbeperkt spelen!</p>
                    
                    <div className="prompt-button-container">
                        {inProgress
                            ? <button className="button primary-button"
                                    onClick={onClose}>
                                Speel Raad Het Woord
                            </button>
                            : <PlayAgainButton startNewGame={startNewGame}/>
                        }
                    </div>
                    <div className="modal-footer-text">
                        <button className="linklike-button"
                                onClick={() => setModalContent('privacy')}>
                            Privacystatement
                        </button>
                    </div>    
                </div>
            </div>
        </div>
    )
} 