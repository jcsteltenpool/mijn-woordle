import React from "react";
import { extLinkSVG } from "../../../util/extlinkSVG";

export default function Disclaimer({setModalContent}) {
    return (
        <div className="content-modal">
            <div className="content-modal-panel-wrapper">
                <div className="content-modal-panel privacy">
                    <h2>Disclaimer</h2>
                    <p>Raad Het Woord is gemaakt en wordt onderhouden door <a href="https://jooststeltenpool.nl" target="_blank" rel="noreferrer">Joost Steltenpool<span className="svg-icon link-icon" aria-label="externe link">{extLinkSVG}</span></a>.</p>
                    <p> Voor de vormgeving van Raad Het Woord heeft Joost Steltenpool zich gebaseerd op de vormgeving van Het Woord, het soortgelijke spel van De Volkskrant op <a href="https://volkskrant.nl/puzzels/" target="_blank" rel="noreferrer">volkskrant.nl<span className="svg-icon link-icon" aria-label="externe link">{extLinkSVG}</span></a>. Joost Steltenpool ontleent geen rechten aan deze vormgeving en is of was op geen enkele wijze betrokken bij of verantwoordelijk voor Het Woord van De Volkskrant.</p>
                    <p>Daarnaast heeft Joost Steltenpool voor de technische werking van Raad Het Woord inspiratie opgedaan bij zowel Het Woord van De Volkskrant als bij Woordle Onbeperkt op <a href="https://woordle.org/" target="_blank" rel="noreferrer">woordle.org<span className="svg-icon link-icon" aria-label="externe link">{extLinkSVG}</span></a>. Joost Steltenpool heeft de achterliggende technologische structuur en de code van Raad Het Woord echter volledig zelf geschreven.</p>
                </div>
            </div>
        </div>
    )
}