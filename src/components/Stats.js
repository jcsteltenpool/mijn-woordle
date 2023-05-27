import React from "react";

export default function Stats({ solution }) {
    const totalGames = JSON.parse(localStorage.getItem('totalGames'));
    const gamesWon = JSON.parse(localStorage.getItem('gamesWon'));
    const currentStreak = JSON.parse(localStorage.getItem('streak'));
    const maxStreak = JSON.parse(localStorage.getItem('maxStreak'));
    const statsArray = JSON.parse(localStorage.getItem('stats'))

    const winPercentage = Math.round((100 / totalGames) * gamesWon);

    console.log(statsArray);

    return (
        <div className="stats">
            <p>Het woord was: <span className="correct-word">{solution}</span></p>
            <div >
                <section>
                    <h3>Statistieken</h3>
                    <div className="stats-table">
                        <p className="stats-table-item">
                            <span>{totalGames}</span> Gespeeld
                        </p>
                        <p className="stats-table-item">
                            <span>{winPercentage}%</span> Win %
                        </p>
                        <p className="stats-table-item">
                            <span>{currentStreak}</span> Huidige reeks
                        </p>
                        <p className="stats-table-item">
                            <span>{maxStreak}</span> Max reeks
                        </p>
                    </div>
                </section>
                <section>
                    <h3>Verdeling</h3>
                    <div className="stats-distribution">
                        <div className="stats-distribution-row">
                            <p className="index-column">1</p>
                            <div className="bar-column">
                                <span className="bar"
                                      style={{ width: "0%"}}  >
                                    0
                                </span>
                            </div>
                        </div>

                        <div className="stats-distribution-row">
                            <p className="index-column">2</p>
                            <div className="bar-column">
                                <span className="bar"
                                      style={{ width: "3.7%"}}  >
                                    4
                                </span>
                            </div>
                        </div>

                        <div className="stats-distribution-row">
                            <p className="index-column">3</p>
                            <div className="bar-column">
                                <span className="bar"
                                      style={{ width: "20%"}}  >
                                    16
                                </span>
                            </div>
                        </div>

                        <div className="stats-distribution-row">
                            <p className="index-column">4</p>
                            <div className="bar-column">
                                <span className="bar current"
                                      style={{ width: "40%"}}  >
                                    37
                                </span>
                            </div>
                        </div>

                        <div className="stats-distribution-row">
                            <p className="index-column">5</p>
                            <div className="bar-column">
                                <span className="bar"
                                      style={{ width: "30%"}}  >
                                    31
                                </span>
                            </div>
                        </div>

                        <div className="stats-distribution-row">
                            <p className="index-column">6</p>
                            <div className="bar-column">
                                <span className="bar"
                                      style={{ width: "20%"}}  >
                                    19
                                </span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}