import React from "react";

export default function ResetText({ setModalContent }) {
    return (
        <p className="stats-reset-text">Statistieken 
            <button className="stats-reset-button"
                    onClick={() => setModalContent('reset')}>
                resetten
            </button>
            .
        </p>
    )
}