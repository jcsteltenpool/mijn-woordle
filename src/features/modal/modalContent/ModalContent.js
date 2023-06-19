import * as React from "react";
import { closeSVG } from "../../../util/closeSVG";

export default function ModalContent(props) {
    const { onClose, showModal, modalContent, children } = props;
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
                        aria-label="Dit dialoogscherm sluiten"
                        className="button outline close-button">
                    <span className="svg-icon">
                        {closeSVG}
                    </span>
                </button>
            </div>
        </div>
    )
}