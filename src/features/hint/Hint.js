import * as React from "react";

export default function Hint({ hint, showHint, setModalContent }) {
    const hintSVG = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="lightbulb"><path d="M27.176 16.156c.142-.38.26-.772.362-1.166.018-.068.04-.132.056-.2.09-.37.154-.748.208-1.128.012-.088.034-.176.044-.264.054-.462.084-.928.084-1.398 0-6.616-5.384-12-12-12s-12 5.384-12 12c0 .47.03.936.086 1.396.01.09.03.176.042.264.054.38.118.758.208 1.128.016.068.038.134.056.2.102.394.22.786.362 1.166.014.036.03.072.042.108.158.41.334.812.536 1.202l.024.044c.21.404.442.796.698 1.176.008.012.016.022.022.034.25.37.522.724.812 1.066l.07.082c.264.306.55.596.846.876.066.062.128.124.196.184.088.078.166.166.258.242.054.046.12.076.18.114.198.164.386.336.596.488.084.06.136.118.208.178 1.38 1.146.706 2.052 2.242 2.052h9.032c1.534 0 .862-.906 2.244-2.052.072-.06.124-.116.208-.178.21-.152.398-.324.596-.488.058-.04.124-.068.18-.114.09-.076.17-.164.258-.242.066-.06.13-.124.196-.184.296-.28.58-.57.846-.876l.07-.082c.29-.342.562-.696.812-1.066.008-.012.016-.022.022-.034.254-.378.486-.77.696-1.174l.024-.044c.202-.39.378-.792.536-1.202.012-.038.028-.072.042-.108zM23 12.094a1 1 0 0 1-1-1C22 8.046 19.25 6 17 6a1 1 0 0 1 0-2c3.438 0 7 2.532 7 7.094a1 1 0 0 1-1 1zM15.808 30h-4.394l3.606 1.844a2.001 2.001 0 0 0 1.812.006L20.49 30h-4.682zM22 27a1 1 0 0 0-1-1H11a1 1 0 0 0 0 2h10a1 1 0 0 0 1-1z"></path></svg>
    const [messageClasses, setMessageClasses] = React.useState("hint-message show-hint");

    React.useEffect(() => {
        if (!showHint && hint) {
            setMessageClasses("hint-message hide");
        } else {
            setMessageClasses("hint-message show-hint");
        }
    }, [showHint, hint]);

    return (
        <div className="hint">
            {hint && 
                <p className={messageClasses}>
                    <span className="svg-icon">
                        {hintSVG}
                    </span> 
                    {hint}
                    {hint==="Dit woord staat niet in de lijst." &&
                    <button className="suggestion-button"
                             onClick={() => setModalContent('suggestion')}>
                        Niet mee eens?
                    </button>}
                </p>
            }
        </div>
    )
}
