import * as React from "react";

export default function Reset({ onClose, clearStats }) {
    const dangerSVG = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" id="danger"><path fill="" fillRule="evenodd" d="M24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4ZM24 6C14.0589 6 6 14.0589 6 24C6 33.9411 14.0589 42 24 42C33.9411 42 42 33.9411 42 24C42 14.0589 33.9411 6 24 6Z" clipRule="evenodd"></path><path fill="" d="M26 13C26 11.8954 25.1046 11 24 11 22.8954 11 22 11.8954 22 13L22 27C22 28.1046 22.8954 29 24 29 25.1046 29 26 28.1046 26 27L26 13zM24 33C25.1046 33 26 33.8954 26 35 26 36.1046 25.1046 37 24 37 22.8954 37 22 36.1046 22 35 22 33.8954 22.8954 33 24 33z"></path></svg>
    const [showMessage, setShowMessage] = React.useState(false);
    const [disabled, setDisabled] = React.useState(false);
    
    function resetStats() {
        clearStats();
        setShowMessage(true);
        setDisabled(true);
    }

    return (
        <div className="content-modal">
            <div className="content-modal-panel-wrapper">
                <div className="content-modal-panel">
                    <h2>Weet je het zeker?</h2>
                    <div className="danger reset-warning">
                        <span className="svg-icon">
                            {dangerSVG}
                        </span>
                        <p>Het resetten van je statistieken kan niet worden teruggedraaid.</p>
                    </div>
                    <div className="prompt-button-container">
                        <button className="button prompt-button secondary-button"
                                disabled={disabled}
                                onClick={onClose}>
                            Annuleren
                        </button>
                        <button className="button prompt-button primary-button"
                                type="reset"
                                disabled={disabled}
                                onClick={() => resetStats()}>
                                Statistieken resetten
                        </button>
                        {showMessage && 
                            <p className="modal-footer-text succes">✔ Je statistieken zijn succesvol verwijderd.</p>
                        }
                    </div>   
                </div>
            </div>
        </div>
    )
}
