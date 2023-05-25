import React from "react";
import ModalContent from "./ModalContent";
import Info from "./Info";
import Menu from "./Menu";
import Win from "./Win";

export default function Modal({ 
    modalContent, 
    showModal, 
    setShowModal, 
    solution, 
    startNewGame }) {

    function handleClose() {
        setShowModal(false);
    }
    
    return (
        <>
            {modalContent && 
                <ModalContent onClose={handleClose}
                              showModal={showModal} >
                    {modalContent === 'info' && <Info onClose={handleClose} />} 
                    {modalContent === 'menu' && <Menu />}
                    {modalContent === 'win' && 
                        <Win onClose={handleClose} 
                             startNewGame={startNewGame}
                             solution={solution} />}
                </ModalContent>
            }
        </>
    )
}