import React from "react";

export default function Suggestion() {
    return (
        <div className="content-modal">
            <div className="content-modal-panel-wrapper">
                <div className="content-modal-panel">
                    <h2>Weet je het zeker?</h2>
                    <div className="danger reset-warning">
                        
                        <p>Het resetten van je statistieken kan niet worden teruggedraaid.</p>
                    </div>
                    <div className="prompt-button-container">
                        <button className="button prompt-button secondary-button"
                                >
                            Annuleren
                        </button>
                        <button className="button prompt-button primary-button danger-button"
                                type="reset"
                                >
                                Statistieken resetten
                        </button>
                    </div>   
                </div>
            </div>
        </div>
    )
}