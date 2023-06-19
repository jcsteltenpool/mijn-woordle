import React from "react";
import ModalContent from "./modalContent/ModalContent";
import Info from "./modalContent/Info";
import Menu from "./modalContent/Menu";
import Result from "./modalContent/Result";
import Reset from "./modalContent/ResetStats";
import Privacy from "./modalContent/Privacy";
import Disclaimer from "./modalContent/Disclaimer";
import Suggestion from "./modalContent/Suggestion";
import ThanksMessage from "./modalContent/ThanksMessage";
import Donate from "./modalContent/Donate";

export default function Modal(props) {
    const { 
        modalContent,
        setModalContent,
        showModal, 
        setShowModal,
        settings,
        handleToggle, 
        guess,
        solution,
        inProgress,
        isWon,
        currentWin, 
        startNewGame,
        clearStats } = props;

    const handleClose = () => {
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
            
            {modalContent === 'suggestion' &&
                <Suggestion onClose={handleClose}
                            setModalContent={setModalContent}
                            guess={guess}/>}

            {modalContent === 'thanks' && 
                <ThanksMessage onClose={handleClose}/>}

            {modalContent === 'privacy' &&
                <Privacy setModalContent={setModalContent}/>}

            {modalContent === 'disclaimer' && <Disclaimer />}
            {modalContent === 'donate' && <Donate />}

        </ModalContent>
        
    )
}