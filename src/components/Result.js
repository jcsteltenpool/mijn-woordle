import React from "react";
import Stats from "./Stats";
import PlayAgainButton from "./PlayAgainButton";

export default function Result(props) {
    const { solution, isWon, startNewGame, onClose, currentWin, setModalContent, inProgress } = props;
    const totalGames = JSON.parse(localStorage.getItem('totalGames'));
    let disabled = (parseInt(totalGames) === 0);
    
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
                            : <>
                                <h2>Helaas</h2>
                                <p>Je hebt het woord niet geraden.</p>
                              </>
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

                <p className={`modal-footer-text ${disabled ? "disabled" : ""}`}>Statistieken
                    <span> </span> 
                    <button className="linklike-button"
                            aria-label="Statistieken resetten"
                            disabled={disabled}
                            onClick={() => setModalContent('reset')}>
                        resetten
                    </button>
                    .
                </p>
            </div>
        </div>
    )
}