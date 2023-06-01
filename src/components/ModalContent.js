import * as React from "react";

export default function ModalContent({ onClose, showModal, modalContent, children }) {
    const closeSVG = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="close"><path d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"></path></svg>

    const [backdrop, setBackdrop] = React.useState("modal-backdrop cover-parent show-backdrop");
    const [modal, setModal] = React.useState("modal show-modal");
    
    React.useEffect(() => {
        if (!showModal && modalContent) {
            setBackdrop("modal-backdrop cover-parent hide");
            setModal("modal hide-modal");
        } else {
            setBackdrop("modal-backdrop cover-parent show-backdrop");
            setModal("modal show-modal");
        }
    }, [showModal, modalContent]);

    return (
        <div className="modal-wrapper cover-parent">
            <div className={backdrop}
                 onClick={onClose}></div>
            <div className={modal}>
                {children}
                <button onClick={onClose}
                        className="button outline close-button">
                    <span className="svg-icon">
                        {closeSVG}
                    </span>
                </button>
            </div>
        </div>
    )
}