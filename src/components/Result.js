import React from "react";
import Stats from "./Stats";
import PlayAgainButton from "./PlayAgainButton";

export default function Result({ 
    solution, isWon, startNewGame, onClose, currentWin, setModalContent, inProgress }) {
    return (
        <div className="prompt">
            <div className="prompt-panel">
                { inProgress
                    ? <>
                        <h2>Raad Het Woord</h2>
                        <p>Je hebt het huidige woord nog niet geraden.</p>
                      </>
                    : <>
                        { isWon 
                            ? <h2>Goed gedaan!</h2>
                            : <h2>Jammer!</h2>
                        }
                        <p>Het woord was: <span className="correct-word">{solution}</span></p>
                      </>
                }

                <Stats solution={solution}
                       currentWin={currentWin} />

                <div className="prompt-button-container">
                    <button className="button prompt-button secondary-button"
                            onClick={onClose}>
                        {inProgress ? "Verder spelen" : "Afsluiten"}
                    </button>
                    {!inProgress && <PlayAgainButton startNewGame={startNewGame}/>}  
                </div>

                <p className="modal-footer-text">Statistieken
                    <span> </span> 
                    <button className="linklike-button"
                            onClick={() => setModalContent('reset')}>
                        resetten
                    </button>
                    .
                </p>
            </div>
        </div>
    )
}