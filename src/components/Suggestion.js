import * as React from "react";

const encode = (data) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
  }

export default function Suggestion({ guess, onClose, setModalContent }) {
    // const [suggestion] = React.useState(guess);
    const [disabled, setDisabled] = React.useState(false);
    
    // function postSuggestion() {
    //     setDisabled(true);
    //     setTimeout(() => {
    //         setModalContent('thanks');
    //     },2000);
    // };

    function handleSubmit(e) {
        setDisabled(true);
        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode({ "form-name": "suggestion", "word": `${guess}`})
        })
        .then(() => setModalContent('thanks'))
        .catch(error => alert(error));

        e.preventDefault();
    };

    // const handleSubmit = event => {
    //     event.preventDefault();

    //     const myForm = event.target;
    //     const formData = new FormData(myForm);


    // }


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
                        <input type="text" name="word" value={guess} />
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
