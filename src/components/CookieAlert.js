import * as React from "react";
import CookieConsent, {getCookieConsentValue, Cookies} from "react-cookie-consent";
import { initGA } from "../util/ga-utils.ts";

export default function CookieAlert({ setModalContent }) {

    const handleAcceptCookie = () => {
        initGA("G-12MS71069J");
        // if (process.env.REACT_APP_GOOGLE_ANALYTICS_ID) {
        //     initGA(process.env.REACT_APP_GOOGLE_ANALYTICS_ID);
        // }
      };
    
      const handleDeclineCookie = () => {
          Cookies.remove("_ga");
        //   Cookies.remove("_gat");
        //   Cookies.remove("_gid");
      }
    
      React.useEffect(() => {
          const isConsent = getCookieConsentValue();
          if (isConsent === "true") {
              handleAcceptCookie();
          }
      }, []);
    
    
    return (
        <CookieConsent 
            enableDeclineButton
            onAccept={handleAcceptCookie}
            onDecline={handleDeclineCookie}
            disableStyles={true}
            buttonText="Accepteren"
            declineButtonText="Afwijzen"
            ariaAcceptLabel="Accepteer cookies"
            ariaDeclineLabel="Wijs cookies af"
            containerClasses="cookie-alert-container"
            contentClasses="cookie-alert"
            buttonWrapperClasses="prompt-button-container"
            buttonClasses="button primary-button prompt-button"
            declineButtonClasses="button secondary-button prompt-button"> 
            {/* <>
            <h3>Cookiemelding</h3>
            <p>Deze website plaatst analytische cookies om het gebruik van de site te meten. Deze cookies leggen geen persoonsgegevens vast.
                Lees voor meer informatie de 
                <span> </span> 
                <button className="linklike-button"
                    onClick={() => setModalContent('privacy')}>
                privacy- en cookieverklaring
                </button>.
            </p>
            </> */}
            Raadhetwoord.nl plaats analytische cookies om het gebruik van de site te meten. Met deze cookies worden geen persoonsgegevens verzameld.
            Lees voor meer informatie de 
                <span> </span> 
                <button className="linklike-button"
                    onClick={() => setModalContent('privacy')}>
                privacy- en cookieverklaring
                </button>.
        </CookieConsent>
    )
}