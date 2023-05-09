import React, {useState, useEffect} from "react";

function Tile({ value, result, visible }) {
    const [input, setInput] = useState("empty");

    useEffect(() => {
        if (value === ''){
            setInput("empty");
        } else {
            setInput("tbd");
        }
    }, [value]);

    return (
        <div className="game-tile">
            <div data-status={input} data-visible={!visible}>{value}</div>
            <div data-status={result} data-visible={visible}>{value}</div>
        </div>
    )
}

function Row({ tiles, results, visible }) {
    const rowTiles = tiles.map((tile, i) =>
        <Tile key={i}
              value={tile}
              result={results[i]}
              visible={visible[i]} />
    );

    return (
        <div className="game-grid-row">
            {rowTiles}
        </div>
    )
}

export default function GridContainer({ rows, results, visible }) {
    const gridRows = rows.map((row, i) => 
        <Row key={i}
             tiles={row}
             results={results[i]}
             visible={visible[i]} />
    );

    return (
        <div className="game-grid-wrapper">
            <div className="game-grid">
                {gridRows}
            </div>
        </div>
    )
}