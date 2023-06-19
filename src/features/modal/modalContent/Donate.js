import React from "react";
import { extLinkSVG } from "../../../util/extlinkSVG";

export default function Donate() {
    return (
        <div className="content-modal">
            <div className="content-modal-panel-wrapper">
                <div className="content-modal-panel privacy">
                    <h2>Doe een donatie</h2>
                    <p>Raad Het Woord is gemaakt en wordt onderhouden door <a href="https://jooststeltenpool.nl" target="_blank" rel="noreferrer">Joost Steltenpool<span className="svg-icon link-icon" aria-label="externe link">{extLinkSVG}</span></a>.</p>
                    
                    <p>Het spel is onbeperkt gratis te spelen, maar het kost wel tijd en geld om online te houden.<br/>Als je blij wordt van het spelen van Raad Het Woord, doneer dan wat je kan missen om Joost Steltenpool te laten weten dat je zijn werk waardeert.</p>
                    <p>Hij is je er zeer dankbaar voor!</p>
                    <a href="https://donate.stripe.com/6oE02ueg9grWa1G3cc" target="_blank" rel="noreferrer">
                        <button className="button primary-button">
                            Doneren
                        </button>
                    </a>
                </div>
            </div>
        </div>
    )
}