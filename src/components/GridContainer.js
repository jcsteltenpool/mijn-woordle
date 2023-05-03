import React from "react";

function Tile({ isEvaluated }) {
    return (
        <div className="game-tile">
            <div data-state="empty" data-visible={!isEvaluated}>M</div>
            <div data-state="correct" data-visible={isEvaluated}>K</div>
        </div>
    )
}

function Row({ isEvaluated }) {
    return (
        <div className="game-grid-row">
            {Array.from({ length: 5 }, (tile, index) => (
                <Tile key={index} isEvaluated={isEvaluated} />
            ))}
        </div>
    )
}

function Grid({ isEvaluated }) {
    return (
        <div className="game-grid-wrapper">
            <div className="game-grid">
                {Array.from({ length: 6}, (row, index) => (
                    <Row key={index} isEvaluated={isEvaluated} />
                ))}
            </div>
        </div>
    )
}


export default function GridContainer({ isEvaluated }) {
    return <Grid isEvaluated={isEvaluated}/>
}