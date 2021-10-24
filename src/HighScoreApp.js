import "bulma/css/bulma.min.css";
import { useState } from "react";
import { leaderTableData } from "./data";

export default function HighScoreApp() {
  const [name, setName] = useState("");
  const [currentScore, setCurrentScore] = useState(0);
  const [numberofClicks, setNumberofClicks] = useState(0);
  const [leaderTable, updateLeaderTable] = useState(leaderTableData);

  function handlePlayClick() {
    if (numberofClicks === 10) {
      alert("No more clicks available, please submit current score");
      return;
    }
    let points = calculateScore();
    let isNegative = Math.sign(points) === -1;

    isNegative
      ? setCurrentScore(currentScore - Math.abs(points))
      : setCurrentScore(currentScore + points);

    setNumberofClicks(numberofClicks + 1);
    setCurrentScore(currentScore + points);
  }

  function calculateScore() {
    const min = -100;
    const max = 100;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <div>
      <div className="columns">
        <div className="column is-full  has-text-centered mt-5">
          <h1 className="title is-1">High Score App</h1>
          <h2 className="subtitle">Enter your name and click play to begin</h2>
        </div>
      </div>
      <div className="columns is-centered">
        <div className="column"></div>
        <div className="column">
          <div className="columns">
            <div className="column">
              <input
                className="input"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="column">
              <input
                className="button is-fullwidth"
                type="submit"
                value="Play"
                onClick={handlePlayClick}
              />
            </div>
          </div>
          <div className="column">
            <p>Number of clicks: {numberofClicks}</p>
            <progress
              className="progress mt-2 is-info"
              value={numberofClicks}
              max="10"
            >
              15%
            </progress>
          </div>
          <div className="column">
            <p>Current player: {name}</p>
            <p>Current score: {currentScore}</p>
          </div>
          <div className="column">
            <input
              className="button is-fullwidth"
              type="submit"
              value="Send it!"
            />
          </div>
          <div className="column">
            <h3 className="title is-3">Leader board</h3>
            <table className="table is-striped">
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Name</th>
                  <th>Score</th>
                  <th>Number of clicks</th>
                  <th>Avg points per click</th>
                </tr>
                {leaderTable.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.totalPoints}</td>
                      <td>{item.clicks}</td>
                      <td>72</td>
                    </tr>
                  );
                })}
              </thead>
            </table>
          </div>
        </div>
        <div className="column"></div>
      </div>
    </div>
  );
}
