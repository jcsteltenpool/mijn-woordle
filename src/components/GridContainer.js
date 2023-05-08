import React, {useState, useEffect} from "react";

function Tile({ value, isEvaluated }) {
    const [status, setStatus] = useState("empty")

    useEffect(() => {
        if (value === null){
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

function Row({ guess, isEvaluated }) {
    return (
        <div className="game-grid-row">
            {Array.from({ length: 5}, (tile, index) => (
                <Tile key={index}
                      value={guess[index]}
                      isEvaluated={isEvaluated} />  
            ))}
        </div>
    )
}

export default function Grid({ guess, isEvaluated }) {
    return (
        <div className="game-grid-wrapper">
            <div className="game-grid">
                {Array.from({ length: 6}, (row, index) => (
                    <Row key={index}
                         guess={guess}
                         isEvaluated={isEvaluated} />
                ))}
            </div>
        </div>
    )
}

// export default function GridContainer({ keyValue, isEvaluated }) {
//     return (
//         <div className="game-grid-wrapper">
//             <div className="game-grid">
//                 {Array.from({ length: 6}, (row, index) => (
//                     <div key={index} className="game-grid-row">
//                         {Array.from({ length: 5 }, (tile, index) => (
//                             <div key={index} className="game-tile">
//                                 <div data-state="empty" data-visible={!isEvaluated}>{keyValue}</div>
//                                 <div data-state="correct" data-visible={isEvaluated}>{keyValue}</div>
//                             </div>
//                         ))}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
// }