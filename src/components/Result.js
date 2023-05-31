import React from "react";
import Stats from "./Stats";
import PlayAgainButton from "./PlayAgainButton";
import ResetText from "./ResetText";

export default function Result({ 
    solution, isWon, startNewGame, onClose, currentWin, setModalContent }) {
    return (
        <div className="prompt">
            <div className="prompt-panel">
                { isWon 
                    ? <h2>Goed gedaan!</h2>
                    : <h2>Jammer!</h2>
                }
                <p>Het woord was: <span className="correct-word">{solution}</span></p>

                <Stats solution={solution}
                       currentWin={currentWin} />

                <div className="prompt-button-container">
                    <button className="button prompt-button secondary-button"
                            onClick={onClose}>
                        Afsluiten
                    </button>
                    <PlayAgainButton startNewGame={startNewGame}/>
                </div>
                <ResetText setModalContent={setModalContent}/>
            </div>
        </div>
    )
}