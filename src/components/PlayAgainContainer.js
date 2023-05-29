import React from "react";
import PlayAgainButton from "./PlayAgainButton";

export default function PlayAgainContainer({ startNewGame }) {
    return (
        <div className="play-again-container">
            <PlayAgainButton startNewGame={startNewGame}/>
        </div>
    )
}