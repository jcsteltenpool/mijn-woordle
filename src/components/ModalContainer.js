import React from "react";
import ModalContent from "./ModalContent";
import Info from "./Info";
import Menu from "./Menu";
import Result from "./Result";
import Reset from "./ResetStats";
import Privacy from "./Privacy";
import Disclaimer from "./Disclaimer";
import Suggestion from "./Suggestion";
import ThanksMessage from "./ThanksMessage";
import Donate from "./Donate";

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