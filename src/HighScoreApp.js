import "bulma/css/bulma.min.css";
import { useEffect, useState } from "react";

export default function HighScoreApp() {
  const [name, setName] = useState("");
  const [totalPoints, settotalPoints] = useState(0);
  const [clicks, setclicks] = useState(0);
  const [leaders, setLeaders] = useState();

  useEffect(() => {
    const getLeadersData = () => {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
      fetch("./data.json", requestOptions)
        .then(function (response) {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(function (data) {
          const leaders = sortLeadersTable(data.leaders);
          setLeaders(leaders.length > 10 ? leaders.slice(0, 10) : leaders);
        });
    };
    getLeadersData();
  }, []);

  function handlePlayClick() {
    if (clicks === 10) {
      alert("No more clicks available, please submit current score");
      return;
    }
    let points = calculateScore();
    let isNegative = Math.sign(points) === -1;

    isNegative
      ? settotalPoints(totalPoints - Math.abs(points))
      : settotalPoints(totalPoints + points);

    setclicks(clicks + 1);
    settotalPoints(totalPoints + points);
  }

  function calculateScore() {
    const min = -100;
    const max = 100;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function handleSubmit(e) {
    if (name === "") {
      alert("Please enter your name to submit your score");
      return;
    }

    checkIfHighScore();
    saveScore();
    e.preventDefault();
  }

  function checkIfHighScore() {
    if (totalPoints > leaders[leaders.length - 1].totalPoints) {
      let leaderTable = [...leaders];
      let existsInTable = leaderTable.find((el, index) => el.name === name);

      if (existsInTable && existsInTable.totalPoints < totalPoints) {
        leaderTable.splice(leaderTable.indexOf(existsInTable), 1);
      }

      let data = { name, totalPoints, clicks };
      leaderTable.push(data);
      setLeaders(sortLeadersTable(leaderTable));
    }
  }

  function sortLeadersTable(data) {
    const result = data.sort(function (a, b) {
      return b.totalPoints - a.totalPoints;
    });

    return result.length > 10 ? result.slice(0, 10) : result;
  }

  const saveScore = () => {
    const data = { name, totalPoints, clicks };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    fetch("https://jsonplaceholder.typicode.com/posts", requestOptions)
      .then(function (response) {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(function (res) {
        setName("");
        setclicks(0);
        settotalPoints(0);
      });
  };

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
                className="input is-info"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="column">
              <input
                className="button is-fullwidth is-info"
                type="submit"
                value="Play"
                data-testid="play-button"
                onClick={handlePlayClick}
              />
            </div>
          </div>
          <div className="column">
            <p data-testid="clicks">Number of clicks: {clicks}</p>
            <progress
              className="progress mt-2 is-info"
              value={clicks}
              max="10"
            ></progress>
          </div>
          <div className="column">
            <p>Current player: {name}</p>
            <p className="current-score">Current score: {totalPoints}</p>
          </div>
          <div className="column">
            <input
              className="button is-fullwidth is-info"
              type="submit"
              value="Send it!"
              data-testid="submit"
              onClick={handleSubmit}
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
                {leaders &&
                  leaders.length > 0 &&
                  leaders.map((item, i) => {
                    return (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.totalPoints}</td>
                        <td>{item.clicks}</td>
                        <td>{Math.round(item.totalPoints / item.clicks)}</td>
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
