import React from "react";

export default function Privacy({ setModalContent }) {
    return (
        <div className="content-modal">
            <div className="content-modal-panel-wrapper">
                <div className="content-modal-panel">
                    <h2>Privacystatement</h2>
                    <p>Voor de beste gebruikservaring bewaart Mijn Woordle jouw statistieken in de lokale opslag van de browser waarin je Mijn Woordle speelt. </p>
                    <p>Mijn Woordle plaats geen cookies op jouw apparaat. Ook voor andere doeleinden maakt Mijn Woordle  geen gebruik van cookies.   
                    </p>
                    <p>Als je dat wilt kun op elk moment jouw statistieken 
                        <span> </span>
                        <button className="linklike-button"
                                onClick={() => setModalContent('reset')}>
                            resetten
                        </button>.
                    </p>                           
                </div>
            </div>
        </div>
    )
}