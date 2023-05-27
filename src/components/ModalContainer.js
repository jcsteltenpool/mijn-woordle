import React from "react";
import ModalContent from "./ModalContent";
import Info from "./Info";
import Menu from "./Menu";
import Result from "./Result";

export default function Modal({ 
    modalContent,
    showKeyboard, 
    showModal, 
    setShowModal, 
    solution,
    isWon, 
    startNewGame }) {

    function handleClose() {
        setShowModal(false);
    }

    return (
        <>
            <ModalContent onClose={handleClose}
                          showModal={showModal} >
                {modalContent === 'info' && 
                    <Info onClose={handleClose} 
                          showKeyboard={showKeyboard}
                          startNewGame={startNewGame} />} 
                {modalContent === 'menu' && <Menu />}
                {modalContent === 'result' && 
                    <Result onClose={handleClose} 
                            startNewGame={startNewGame}
                            isWon={isWon}
                            solution={solution} />}
            </ModalContent>
        </>
    )
}