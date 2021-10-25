import 'bulma/css/bulma.min.css';
import { useEffect, useState } from 'react';
import LeaderTable from './LeaderTable.js';

export default function HighScoreApp() {
  const [name, setName] = useState('');
  const [totalPoints, setTotalPoints] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const getLeadersData = () => {
      const requestOptions = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };
      fetch('./data.json', requestOptions)
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
      alert('No more clicks available, please submit current score');
      return;
    }
    const points = calculateScore();
    const isNegative = Math.sign(points) === -1;

    isNegative
      ? setTotalPoints(totalPoints - Math.abs(points))
      : setTotalPoints(totalPoints + points);

    setClicks(clicks + 1);
    setTotalPoints(totalPoints + points);
  }

  function calculateScore() {
    const min = -100;
    const max = 100;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function handleSubmit(e) {
    if (name === '') {
      alert('Please enter your name to submit your score');
      return;
    }

    checkIfHighScore();
    saveScore();
    e.preventDefault();
  }

  function checkIfHighScore() {
    if (totalPoints > leaders[leaders.length - 1].totalPoints) {
      const leaderTable = [...leaders];
      const existsInTable = leaderTable.find((el, index) => el.name === name);

      if (existsInTable && existsInTable.totalPoints < totalPoints) {
        leaderTable.splice(leaderTable.indexOf(existsInTable), 1);
      }

      const data = { name, totalPoints, clicks };
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
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
    // using https://jsonplaceholder.typicode.com/ in order to mock a post request
    fetch('https://jsonplaceholder.typicode.com/posts', requestOptions)
      .then(function (response) {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(function (res) {
        setName('');
        setClicks(0);
        setTotalPoints(0);
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
              <button
                className="button is-fullwidth is-info"
                value="Play"
                onClick={handlePlayClick}
              >
                Play
              </button>
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
            <button
              className="button is-fullwidth is-info"
              onClick={handleSubmit}
            >
              Send it!
            </button>
          </div>
          <div className="column">
            <h3 className="title is-3">Leader Table</h3>
            <LeaderTable leaders={leaders} />
          </div>
        </div>
        <div className="column"></div>
      </div>
    </div>
  );
}
