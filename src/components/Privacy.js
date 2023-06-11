import React from "react";
import {extLinkSVG} from "../util/extlinkSVG";

export default function Privacy({ setModalContent }) {
    return (
        <div className="content-modal">
            <div className="content-modal-panel-wrapper">
                <div className="content-modal-panel privacy">
                    <h2>Privacyverklaring</h2>
                    <p>Deze privacyverklaring gaat over de gegevens die Raad Het Woord verwerkt. Raad Het Woord is gemaakt en wordt onderhouden door <a href="https://jooststeltenpool.nl" target="_blank" rel="noreferrer">Joost Steltenpool<span className="svg-icon link-icon" aria-label="externe link">{extLinkSVG}</span></a>.</p>
                    
                    <h3>Persoonsgegevens</h3>
                    <p>Raad Het Woord verzamelt geen persoonsgegevens van zijn gebruikers</p>
                    <p>Bezoekt je een andere website via een link op Raad Het Woord? Dan is Raad Het Woord niet meer verantwoordelijk voor de eventuele verwerking van je persoonsgegevens door deze andere website. Deel je gegevens met een andere website die je bezoekt? Dan wordt aangeraden om de privacyverklaring van die website te lezen.</p>
                    <br/>
                    
                    <h2>Cookiebeleid</h2>
                    <p>Raad Het Woord maakt gebruik van analytische cookies en van local storage.</p>
                    
                    <h3>Analytische cookies</h3>
                    <p>Raad Het Woord maakt gebruik van Google Universal Analytics om te analyseren hoe de website wordt gebruikt. Zo verzamelt Raad Het Woord bijvoorbeeld gegevens over het aantal gebruikers dat de website bezoekt en vanuit welke pagina ze zijn doorgestuurd naar Raad Het Woord. De gegevens die hierbij worden verzameld bevatten geen persoonsgegevens en zijn op geen enkele wijze te herleiden naar individuele gebruikers. Je IP-adres wordt nooit meegestuurd naar Google Analytics.</p>
                    <p>Voor het verzamelen van gegevens in Google Universal Analytics plaatst Raad Het Woord javascript tracking code op de website die informatie naar servers van Google verstuurt, o.a. in de Verenigde Staten. De maker van Raad Het Woord heeft een verwerkersovereenkomst afgesloten met Google voor het gebruik van Google Analytics. Daarnaast is Google aangesloten bij het <a href="https://www.privacyshield.gov/welcome" target="_blank" rel="noreferrer">EU-US Privacy Shield<span className="svg-icon link-icon" aria-label="externe link">{extLinkSVG}</span></a>. Lees het <a href="https://policies.google.com/privacy?hl=nl" target="_blank" rel="noreferrer">Privacybeleid van Google<span className="svg-icon link-icon" aria-label="externe link">{extLinkSVG}</span></a> voor meer informatie. Als je niet opgenomen wenst te worden in onze Google Analytics statistieken kun je gebruik maken van de <a href="https://support.google.com/analytics/answer/181881?hl=nl" target="_blank" rel="noreferrer">Google Analytics Opt-out Browser Add-on<span className="svg-icon link-icon" aria-label="externe link">{extLinkSVG}</span></a>.</p>
                    <h4>Uitschakelen</h4>
                    <p>Het is mogelijk om cookies te blokkeren of om geen toestemming te geven voor het gebruik van cookies. De wijze waarop je dit kunt doen is afhankelijk van je browser. <a href="https://veiliginternetten.nl/thema/privacy/instructiefilmpjes-cookies-beheren/" target="_blank" rel="noreferrer">Bekijk hoe je cookies zelf beheert<span className="svg-icon link-icon" aria-label="externe link">{extLinkSVG}</span></a> in een instructiefilmpje van Veiliginternetten.nl.</p>
                    
                    <h3>Local storage</h3>
                    <p>Raad Het Woord gebruikt HTML5 Local Storage om jouw statistieken op te slaan. Local storage werkt ongeveer hetzelfde als cookies maar het is veiliger. Bij local storage bepaal je zelf hoelang de browser de opgeslagen gegevens bewaart. Dit hangt af van je browser en hoe vaak jij je browser-geschiedenis wist.</p>
                    <p>Op Raad Het Woord zelf kun je ook op elk moment jouw statistieken 
                        <span> </span>
                        <button className="linklike-button"
                                tabIndex={0}
                                aria-label="Statistieken resetten"
                                onClick={() => setModalContent('reset')}>
                            resetten
                        </button>.
                    </p>                           
                </div>
            </div>
        </div>
    )
}