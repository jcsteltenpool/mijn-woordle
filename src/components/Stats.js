import React from "react";

export default function Stats({ solution, currentWin }) {
    const totalGames = JSON.parse(localStorage.getItem('totalGames'));
    const gamesWon = JSON.parse(localStorage.getItem('gamesWon'));
    const currentStreak = JSON.parse(localStorage.getItem('streak'));
    const maxStreak = JSON.parse(localStorage.getItem('maxStreak'));
    const stats = JSON.parse(localStorage.getItem('stats'))

    const winPercentage = Math.round((100 / totalGames) * gamesWon);

    const statsSum = stats.reduce((a, c) => a + c);
    
    let percentageArray=[];
    stats.forEach(stat => {
        percentageArray.push(((100 / statsSum) * stat).toFixed(2)); 
    });

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
                        {stats.map((stat, i) => {
                            return (
                                <div className="stats-distribution-row"
                                     key={i + 1}>
                                    <p className="index-column">{i + 1}</p>
                                    <div className="bar-column">
                                        <span className={`${i === currentWin ? "current" : ""} bar`}
                                              style={{ width: `${percentageArray[i]}%`}}  >
                                            {stat}
                                        </span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </section>
            </div>
        </div>
    )
}