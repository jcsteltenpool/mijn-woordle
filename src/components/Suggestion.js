import * as React from "react";

export default function Suggestion({ guess, onClose, setModalContent }) {
    const [disabled, setDisabled] = React.useState(false);
    // Mockup function TODO
    function postSuggestion(guess) {
        setDisabled(true);
        setTimeout(() => {
            setModalContent('thanks');
        },2000);
    };
    
    return (
        <div className="prompt">
            <div className="prompt-panel">
                <h2>Suggestie</h2>
                <p>Wil je het woord "{guess}" aangeven als suggestie voor de woordenlijst?</p>
                <div className="prompt-button-container">
                    <button className="button prompt-button secondary-button"
                            disabled={disabled}
                            onClick={onClose}>
                        Nee
                    </button>
                    <button className="button prompt-button primary-button"
                            type="submit"
                            disabled={disabled}
                            onClick={postSuggestion}>
                            Ja
                    </button>
                </div>   
            </div>
        </div>
    )
}