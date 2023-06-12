import * as React from "react";
import { checkSVG } from "../util/checkSVG";

export default function Reset({ onClose, clearStats }) {
    const [isReset, setIsReset] = React.useState(false);
    const dangerSVG = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" id="danger"><path fill="" fillRule="evenodd" d="M24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4ZM24 6C14.0589 6 6 14.0589 6 24C6 33.9411 14.0589 42 24 42C33.9411 42 42 33.9411 42 24C42 14.0589 33.9411 6 24 6Z" clipRule="evenodd"></path><path fill="" d="M26 13C26 11.8954 25.1046 11 24 11 22.8954 11 22 11.8954 22 13L22 27C22 28.1046 22.8954 29 24 29 25.1046 29 26 28.1046 26 27L26 13zM24 33C25.1046 33 26 33.8954 26 35 26 36.1046 25.1046 37 24 37 22.8954 37 22 36.1046 22 35 22 33.8954 22.8954 33 24 33z"></path></svg>
    const totalGames = JSON.parse(localStorage.getItem('totalGames'));
    let noStats = (parseInt(totalGames) === 0);
    
    const handleClick = () => {
        clearStats();
        setIsReset(true);
    }

    return (
        <div className="content-modal">
            <div className="content-modal-panel-wrapper">
                <div className="content-modal-panel">
                    {noStats 
                        ? <>
                            <h2>Statistieken resetten</h2>
                            <p>Er zijn op dit moment geen statistieken om te resetten.</p>
                            <div className="prompt-button-container">
                                <button className="button prompt-button primary-button"
                                        onClick={onClose}>
                                    Ok
                                </button>
                            </div>   
                          </>
                        : <>
                            <h2>Weet je het zeker?</h2>
                            <div className="danger reset-warning">
                                <span className="svg-icon">
                                    {dangerSVG}
                                </span>
                                <p>Het resetten van je statistieken kan niet worden teruggedraaid.</p>
                            </div>
                            <div className="prompt-button-container">
                                <button className="button prompt-button secondary-button"
                                        disabled={isReset}
                                        onClick={onClose}>
                                    Annuleren
                                </button>
                                <button className="button prompt-button primary-button danger-button"
                                        type="reset"
                                        disabled={isReset}
                                        onClick={handleClick}>
                                    Statistieken resetten
                                </button>
                                {isReset &&
                                    <div className="modal-footer-text flex succes">
                                        <span className="svg-icon">
                                            {checkSVG}
                                        </span>
                                        <p>Je statistieken zijn succesvol verwijderd.</p>
                                    </div>
                                }
                            </div>   
                          </>
                    }
                    
                </div>
            </div>
        </div>
    )
}
