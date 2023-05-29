import React, { useState } from "react";

export default function Reset({ onClose, clearStats }) {
    const [showMessage, setShowMessage] = useState(false);
    
    function resetStats() {
        clearStats();
        setShowMessage(true);
    }

    return (
        <div className="content-modal">
            <div className="content-modal-panel-wrapper">
                <div className="content-modal-panel">
                    <h2>Weet je het zeker?</h2>
                    <p>Het resetten van je statistieken kan niet worden teruggedraaid.</p>
                    <div className="prompt-button-container">
                        <button className="button prompt-button secondary-button"
                                onClick={onClose}>
                            Annuleren
                        </button>
                        <button className="button prompt-button primary-button"
                                type="reset"
                                onClick={() => resetStats()}>
                                Statistieken resetten
                        </button>
                        <p className="stats-reset-text succes">Je statistieken zijn succesvol verwijderd</p>
                    </div>   
                </div>
            </div>
        </div>
    )
}
