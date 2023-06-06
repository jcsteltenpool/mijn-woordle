import React from "react";

export default function ThanksMessage({ onClose }) {
    return (
        <div className="prompt">
            <div className="prompt-panel">
                <h2>Bedankt</h2>
                <p>Je suggestie is verstuurd.</p>
                <div className="prompt-button-container">
                    <button className="button prompt-button primary-button"
                            onClick={onClose}>
                            Ok
                    </button>
                </div>   
            </div>
        </div>
    )
}