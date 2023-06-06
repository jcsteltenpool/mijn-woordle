import * as React from 'react';
import { checkSVG } from '../util/checkSVG';
import { closeSVG } from '../util/closeSVG';

export default function Setting({ title, id, buttonEvent, toggled, toggleButton }) {

    return (
        <div className="settings-menu-button">
            <p className="settings-title">{title}</p>
            <button className={`button ${toggled ? "primary-button toggled" : "secondary-button"}`}
                    onClick={() => toggleButton(id, buttonEvent)}
                    aria-label={title}
                    type="button">
                <span className="svg-icon">
                    {toggled ? checkSVG : closeSVG}
                </span>
                <span className="label">
                    {toggled ? "AAN" : "UIT"}
                </span>
            </button>
        </div>   
    )
}