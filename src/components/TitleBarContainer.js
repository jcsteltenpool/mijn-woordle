import React from "react";

export default function TitleBar({ setHint, setModalContent }) {
    const helpSVG = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="help"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-4h2v2h-2zm1.61-9.96c-2.06-.3-3.88.97-4.43 2.79-.18.58.26 1.17.87 1.17h.2c.41 0 .74-.29.88-.67.32-.89 1.27-1.5 2.3-1.28.95.2 1.65 1.13 1.57 2.1-.1 1.34-1.62 1.63-2.45 2.88 0 .01-.01.01-.01.02-.01.02-.02.03-.03.05-.09.15-.18.32-.25.5-.01.03-.03.05-.04.08-.01.02-.01.04-.02.07-.12.34-.2.75-.2 1.25h2c0-.42.11-.77.28-1.07.02-.03.03-.06.05-.09.08-.14.18-.27.28-.39.01-.01.02-.03.03-.04.1-.12.21-.23.33-.34.96-.91 2.26-1.65 1.99-3.56-.24-1.74-1.61-3.21-3.35-3.47z"></path></svg>    
    const menuSVG = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="menu"><path d="M3 6a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zm0 6a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zm1 5a1 1 0 1 0 0 2h16a1 1 0 1 0 0-2H4z"></path></svg>

    function handleClick(content) {
        setHint('');
        setModalContent(content);
    }

    return (
        <div className="title-bar-wrapper">
            <div className="title-bar">
                <div className="slot left">
                    <button className="button secondary-button"
                            onClick={() => handleClick('info')} 
                            aria-label="Hoe werkt het?"
                            tabIndex={0} 
                            type="button">
                        <span className="svg-icon">
                            {helpSVG}
                        </span>
                        <span className="label">Uitleg</span>
                    </button>
                </div>
                <h1>Raad Het Woord</h1>
                <div className="slot right">
                    <button className="button secondary-button"
                            onClick={() => handleClick('menu')} 
                            aria-label="Menu"
                            tabIndex="0"
                            type="button">
                        <span className="svg-icon">
                                {menuSVG}
                        </span>
                        <span className="label">Menu</span>
                    </button>
                </div>
            </div>
        </div>
    )
}