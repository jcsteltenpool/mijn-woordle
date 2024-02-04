import * as React from "react";

export default function Suggestion(props) {
    const { guess, onClose, setModalContent } = props;
    const [disabled, setDisabled] = React.useState(false);
    
    const handleSubmit = async (e) => {

        e.preventDefault();
        setDisabled(true)
        
        const { word } = e.target.elements;
        let details = {
            word: word.value
        }
         
        // let response = await fetch("http://localhost:4000/suggestion", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json;charset=utf-8",
        //     },
        //     body: JSON.stringify(details),
        // })
        // let result = await response.json();
        // if (result === "success") {
        //     setModalContent('thanks')
        // } 
        fetch("http://localhost:4000/suggestion", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(details),
        }).then(() => {
            setTimeout(() => {
                setModalContent('thanks');
            }, 1000)
        }).catch((error) => alert(error));
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
