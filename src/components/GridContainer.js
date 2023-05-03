import React from "react";

function Tile({ flip = false }) {
    return (
        <div className="game-tile">
            {!flip 
            ? <div data-state="empty">M</div>
            : <div data-state="correct">K</div>
            }
        </div>
    )
}

function Row({ flip }) {
    return (
        <div className="game-grid-row">
            {Array.from({ length: 5 }, (tile, index) => (
                <Tile key={index} />
            ))}
        </div>
    )
}

function Grid({ flip }) {
    return (
        <div className="game-grid-wrapper">
            <div className="game-grid">
                {Array.from({ length: 6}, (row, index) => (
                    <Row key={index} flip={flip}/>
                ))}
            </div>
        </div>
    )
}


export default function GridContainer() {
    return <Grid />
}