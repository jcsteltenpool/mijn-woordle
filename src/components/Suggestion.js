import * as React from "react";

export default function Suggestion({ guess, onClose, setModalContent }) {
    const [disabled, setDisabled] = React.useState(false);
    

    const handleSubmit = event => {
        event.preventDefault();
        setDisabled(true);

        const myForm = event.target;
        const formData = new FormData(myForm);
        
        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString(),
          })
            .then(() => {
                setTimeout(() => {
                    setModalContent('thanks') 
                }, 1500)
            })
            .catch((error) => alert(error));
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
                    <form onSubmit={handleSubmit}>
                        <input type="hidden" name="form-name" value="suggestion" />
                        <input type="hidden" name="word" value={guess} />
                        <button className="button prompt-button primary-button"
                                type="submit"
                                disabled={disabled}>
                                Ja
                        </button>
                    </form>
                </div>   
            </div>
        </div>
    )
}
