import React from "react";
import ModalContent from "./ModalContent";
import Info from "./Info";
import Menu from "./Menu";

export default function Modal({ modalContent, showModal, setShowModal }) {
    return (
        <>
            {modalContent && 
                <ModalContent onClose={() => setShowModal(false)}
                              showModal={showModal} >
                    {modalContent === 'info' && <Info />} 
                    {modalContent === 'menu' && <Menu />}
                </ModalContent>
            }
        </>
    )
}