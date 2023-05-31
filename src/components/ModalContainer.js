import React from "react";
import ModalContent from "./ModalContent";
import Info from "./Info";
import Menu from "./Menu";
import Result from "./Result";
import Stats from "./Stats";
import Reset from "./ResetStats";
import ResetText from "./ResetText";

export default function Modal({ 
    modalContent,
    setModalContent,
    showKeyboard, 
    showModal, 
    setShowModal,
    settings,
    handleToggle, 
    solution,
    isWon,
    currentWin, 
    startNewGame,
    clearStats }) {

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
                {modalContent === 'menu' && 
                    <Menu setModalContent={setModalContent} 
                          settings={settings}
                          handleToggle={handleToggle}/>}
                {modalContent === 'stats' &&
                    <>
                        <Stats />
                        <ResetText setModalContent={setModalContent}/>
                    </>
                }
                {modalContent === 'result' && 
                    <Result onClose={handleClose} 
                            startNewGame={startNewGame}
                            isWon={isWon}
                            currentWin={currentWin}
                            solution={solution}
                            setModalContent={setModalContent} 
                    />
                }
                {modalContent === 'reset' && 
                    <Reset onClose={handleClose}
                           clearStats={clearStats}
                    />
                }
            </ModalContent>
        </>
    )
}