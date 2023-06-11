import * as React from "react";
import PlayAgainButton from "./PlayAgainButton";

export default function Info({ onClose, startNewGame, inProgress, setModalContent }) {
    return (
        <div className="content-modal">
            <div className="content-modal-panel-wrapper">
                <div className="content-modal-panel info">
                    <h2>Raad Het Woord</h2>
                    <p>Raad het woord in 6 keer. Na elke poging geven de gekleurde letters aan hoe dichtbij je was.</p>
                    <p className="info-paragraph"><span className="square" data-status="correct"></span> Goede letter op de goede plek </p>
                    <p className="info-paragraph"><span className="square" data-status="present"></span> Goede letter op de verkeerde plek </p>
                    <p className="info-paragraph"><span className="square" data-status="absent"></span> Verkeerde letter</p>
                    <p><strong>Je kunt Raad Het Woord onbeperkt spelen!</strong></p>
                    <p className="tip"><b>Tip: </b>zet Raad Het Woord op je begin&shy;scherm voor de beste gebruiks&shy;ervaring. </p>
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
                            Privacy- en cookieverklaring
                        </button>
                    </div>
                    <div className="modal-footer-text">
                        <button className="linklike-button"
                                onClick={() => setModalContent('disclaimer')}>
                            Disclaimer
                        </button>
                    </div>    
                </div>
            </div>
        </div>
    )
} 