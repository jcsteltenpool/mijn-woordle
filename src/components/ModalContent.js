import React from "react";

export default function ModalContent({ onClose, showModal, children }) {
    const closeSVG = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="close"><path d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"></path></svg>

    return (
        <div className="modal-wrapper cover-parent">
            <div className={`${showModal ? "show-backdrop" : "hide"} modal-backdrop cover-parent`}
                 onClick={onClose}></div>
            <div className={`${showModal ? "show-modal" : "hide-modal"} modal`}>
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

// export default function ModalContent({ onClose, showModal, children }) {
//     const closeSVG = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="close"><path d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"></path></svg>
//     let backDropClasses = useRef("modal-backdrop cover-parent show-backdrop");
//     let modalClasses = useRef("modal show-modal");
    
//     useEffect(() => {
//         if (!showModal) {
//             const timeoutId = setTimeout(() => {
//                 backDropClasses.current = "modal-backdrop cover-parent hide";
//                 modalClasses.current = "modal hide-modal";
//               }, 3);
//               return () => {clearTimeout(timeoutId)};
//         }
//     }, [showModal]);

//     return (
//         <div className="modal-wrapper cover-parent">
//             <div className={backDropClasses.current}
//                  onClick={onClose}></div>
//             <div className={modalClasses.current}>
//                 {children}
//                 <button onClick={onClose}
//                         className="button outline close-button">
//                     <span className="svg-icon">
//                         {closeSVG}
//                     </span>
//                 </button>
//             </div>
//         </div>
//     )
// }