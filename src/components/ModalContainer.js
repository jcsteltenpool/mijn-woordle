import React from "react";
import ModalContent from "./ModalContent";
import Info from "./Info";
import Menu from "./Menu";
import Result from "./Result";
import Reset from "./ResetStats";
import Privacy from "./Privacy";

export default function Modal({ 
    modalContent,
    setModalContent,
    showKeyboard, 
    showModal, 
    setShowModal,
    settings,
    handleToggle, 
    solution,
    inProgress,
    isWon,
    currentWin, 
    startNewGame,
    clearStats }) {

    function handleClose() {
        setShowModal(false);
    }

    return (
        <ModalContent onClose={handleClose}
                        modalContent={modalContent}
                        showModal={showModal} >
            
            {modalContent === 'info' && 
                <Info onClose={handleClose}
                        setModalContent={setModalContent} 
                        inProgress={inProgress}
                        startNewGame={startNewGame} />} 
            
            {modalContent === 'menu' && 
                <Menu setModalContent={setModalContent} 
                        settings={settings}
                        handleToggle={handleToggle} />}
            
            {modalContent === 'result' && 
                <Result onClose={handleClose} 
                        startNewGame={startNewGame}
                        inProgress={inProgress}
                        isWon={isWon}
                        currentWin={currentWin}
                        solution={solution}
                        setModalContent={setModalContent} />}
            
            {modalContent === 'reset' && 
                <Reset onClose={handleClose}
                        clearStats={clearStats} />}

            {modalContent === 'privacy' &&
                <Privacy setModalContent={setModalContent}/>}
        
        </ModalContent>
        
    )
}