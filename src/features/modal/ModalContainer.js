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
import DonationButton from "../components/DonationButton";

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
            
            {modalContent === 'info' &&  (
                <>
                    <Info onClose={handleClose}
                        setModalContent={setModalContent} 
                        inProgress={inProgress}
                        startNewGame={startNewGame} />
                    <DonationButton setModalContent={setModalContent}/>
                </>
            )} 
            
            {modalContent === 'menu' && (
                <>
                    <Menu setModalContent={setModalContent} 
                        settings={settings}
                        handleToggle={handleToggle} />
                    <DonationButton setModalContent={setModalContent}/>
                </>
            )
                }
            
            {modalContent === 'result' && (
                <>
                    <Result onClose={handleClose} 
                        startNewGame={startNewGame}
                        inProgress={inProgress}
                        isWon={isWon}
                        currentWin={currentWin}
                        solution={solution}
                        setModalContent={setModalContent} />
                    <DonationButton setModalContent={setModalContent}/>   
                </>
            )}    

            {modalContent === 'reset' && 
                <Reset onClose={handleClose}
                       clearStats={clearStats} />}
            
            {modalContent === 'suggestion' &&
                <Suggestion onClose={handleClose}
                            setModalContent={setModalContent}
                            guess={guess}/>}

            {modalContent === 'thanks' && (
                <>
                    <ThanksMessage onClose={handleClose}/>
                    <DonationButton setModalContent={setModalContent}/>   
                </>
            )}

            {modalContent === 'privacy' && (
                <>
                    <Privacy setModalContent={setModalContent}/>
                    <DonationButton setModalContent={setModalContent}/>                          
                </>
            )}

            {modalContent === 'disclaimer' && (
                <>
                    <Disclaimer setModalContent={setModalContent}/>
                    <DonationButton setModalContent={setModalContent}/>
                </>
            )}

            {modalContent === 'donate' && <Donate />}
        </ModalContent>
        
    )
}