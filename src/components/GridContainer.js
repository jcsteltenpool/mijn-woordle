import React from "react";

function Tile({ value, result, visible }) {
    return (
        <div className="game-tile">
            <div data-status={value === '' ? "empty" : "tbd"} 
                 data-visible={!visible}>
                    {value}
            </div>
            <div data-status={result} 
                 data-visible={visible}>
                    {value}
            </div>
        </div>
    )
}

export default function Grid({ grid }) {
    const gridRows = grid.map((tile, i) => 
        <Tile key={i}
              value={tile.value}
              result={tile.result}
              visible={tile.visible}
        />
    );

    return (
        <div className="game-grid-wrapper">
            <div className="game-grid">
                {gridRows}
            </div>
        </div>
    )
}