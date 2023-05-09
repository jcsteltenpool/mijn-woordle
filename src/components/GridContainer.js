import React, {useState, useEffect} from "react";

function Tile({ value, isEvaluated }) {
    const [status, setStatus] = useState("empty");

    useEffect(() => {
        if (value === ''){
            setStatus("empty");
        } else {
            setStatus("tbd")
        }
    }, [value]);

    return (
        <div className="game-tile">
            <div data-status={status} data-visible={!isEvaluated}>{value}</div>
            <div data-status="correct" data-visible={isEvaluated}>{value}</div>
        </div>
    )
}

function Row({ tiles, isEvaluated }) {
    const rowTiles = tiles.map((tile, i) =>
        <Tile key={i}
              value={tile}
              isEvaluated={isEvaluated} />
    );

    return (
        <div className="game-grid-row">
            {rowTiles}
        </div>
    )
}

export default function GridContainer({ rows, isEvaluated }) {
    const gridRows = rows.map((row, i) => 
        <Row key={i}
             tiles={row}
             isEvaluated={isEvaluated} />
    );

    return (
        <div className="game-grid-wrapper">
            <div className="game-grid">
                {gridRows}
            </div>
        </div>
    )
}