import * as React from "react";
import CookieConsent, {getCookieConsentValue, Cookies} from "react-cookie-consent";
import { initGA } from "../util/ga-utils.ts";
import PlayAgainButton from "./PlayAgainButton";

export default function Info({ onClose, startNewGame, inProgress, setModalContent }) {
    const handleAcceptCookie = () => {
        if (process.env.REACT_APP_GOOGLE_ANALYTICS_ID) {
            initGA(process.env.REACT_APP_GOOGLE_ANALYTICS_ID);
        }
    };

    const handleDeclineCookie = () => {
        Cookies.remove("_ga");
        Cookies.remove("_gat");
        Cookies.remove("_gid");
    }

    React.useEffect(() => {
        const isConsent = getCookieConsentValue();
        if (isConsent === "true") {
            handleAcceptCookie();
        }
    }, []);
    
    return (
        <div className="content-modal">
            <div className="content-modal-panel-wrapper">
                <div className="content-modal-panel info">
                    <h2>Raad Het Woord</h2>
                    <p>Raad het woord in 6 keer. Na elke poging geven de gekleurde letters aan hoe dichtbij je was.</p>
                    <p className="info-paragraph"><span className="square" data-status="correct"></span> Goede letter op de goede plek </p>
                    <p className="info-paragraph"><span className="square" data-status="present"></span> Goede letter op de verkeerde plek </p>
                    <p className="info-paragraph"><span className="square" data-status="absent"></span> Verkeerde letter</p>
                    <p>Je kunt Raad Het Woord onbeperkt spelen!</p>
                    
                    <div className="prompt-button-container">
                        {inProgress
                            ? <button className="button primary-button"
                                    onClick={onClose}>
                                Speel Raad Het Woord
                            </button>
                            : <PlayAgainButton startNewGame={startNewGame}/>
                        }
                    </div>
                    <CookieConsent 
                        enableDeclineButton
                        onAccept={handleAcceptCookie}
                        onDecline={handleDeclineCookie}
                        disableStyles={true}
                        buttonText="Accepteren"
                        declineButtonText="Afwijzen"
                        ariaAcceptLabel="Accepteer cookies"
                        ariaDeclineLabel="Wijs cookies af"
                        containerClasses= "cookie-alert-container"
                        buttonWrapperClasses="prompt-button-container"
                        buttonClasses="button primary-button prompt-button"
                        declineButtonClasses="button secondary-button prompt-button"> 
                        <h3>Cookiemelding</h3>
                        <p>Deze website plaatst analytische cookies om het gebruik van de site te meten. Deze cookies leggen geen persoonsgegevens vast. Lees voor meer informatie de 
                            <span> </span> 
                            <button className="linklike-button"
                                onClick={() => setModalContent('privacy')}>
                            privacy- en cookieverklaring
                            </button>.
                        </p>
                    </CookieConsent>
                    <div className="modal-footer-text flex">
                        <button className="linklike-button"
                                onClick={() => setModalContent('privacy')}>
                            Privacy- en cookieverklaring
                        </button>
                    </div>
                    <div className="modal-footer-text">
                        <button className="linklike-button"
                                onClick={() => setModalContent('disclaimer')}>
                            Disclaimer
                        </button>
                    </div>    
                </div>
            </div>
        </div>
    )
} 