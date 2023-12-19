import React from "react";

export default function DonationButton({setModalContent}) {
    return (
        <div className="modal-footer-text">
            <button className="linklike-button"
                    onClick={() => setModalContent('donate')}>
                <strong>❤️️ Raad Het Woord? Doe een kleine donatie.</strong>
            </button>
        </div>
    )
}