import * as React from 'react';

export default function Setting({ title, id, buttonEvent, toggled, toggleButton }) {
    const closeSVG = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="close"><path d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"></path></svg>
    const checkSVG = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" id="check"><polyline fill="none" stroke="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" points="216 72.005 104 184 48 128.005"></polyline></svg>

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