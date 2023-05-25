import React from "react";

export default function Stats({ solution }) {
    return (
        <div className="stats">
            <p>Het woord was: <span className="correct-word">{solution}</span></p>
            <div >
                <section>
                    <h3>Statistieken</h3>
                    <div className="stats-table">
                        
                    </div>
                </section>
                <section>
                    <h3>Verdeling</h3>
                    <div className="stats-distribution"></div>
                </section>
            </div>
        </div>
    )
}