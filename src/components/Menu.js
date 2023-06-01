import React from "react";
import Setting from "./Setting";

export default function Menu({ setModalContent, handleToggle, settings }) {
    const statsSVG = <svg viewBox="0 0 100 100"><path fill="" d="M 7 25 h 16 c 0 0 5 0 5 5 v 64 c 0 0 0 5 -5 5 h -16 c 0 0 -5 0 -5 -5 v -64 c 0 0 0 -5 5 -5 m 35 -24 h 16 c 0 0 5 0 5 5 v 88 c 0 0 0 5 -5 5 h -16 c 0 0 -5 0 -5 -5 v -88 c 0 0 0 -5 5 -5 m 35 45 h 16 c 0 0 5 0 5 5 v 43 c 0 0 0 5 -5 5 h -16 c 0 0 -5 0 -5 -5 v -43 c 0 0 0 -5 5 -5"></path></svg>

    const settingsItems = settings.map(setting => 
        <Setting key={setting.id}
                 id={setting.id}
                 title={setting.title}
                 toggled={setting.toggled}
                 toggleButton={handleToggle}
                 buttonEvent={setting.event}/>    
    );

    return (
        <div className="prompt">
            <div className="prompt-panel">
                <div className="settings">
                    <h2>Menu</h2>
                    <button className="button secondary-button full-width"
                            onClick={() => setModalContent('result')}
                            aria-label="Bekijk statistieken"
                            type="button">
                        <span className="svg-icon">
                            {statsSVG}
                        </span>
                        <span className="label">Statistieken</span>
                    </button>
                </div>
                <div className="settings">
                    {settingsItems}
                </div>
            </div>
        </div>
    )
} 