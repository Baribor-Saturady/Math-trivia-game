import { useEffect, useState } from 'react';
import './leaderBoard.css';


export default function LeaderBoard() {

  const [topPlayers, setTopPlayers] = useState(null)

  useEffect(() => {
    fetch("https://math-trivia-backend.herokuapp.com/api/scores/")
      .then(resp => resp.json())
      .then(setTopPlayers)
      .catch(() => { });
  }, []);

  return (
    <div className='leader-board'>
      <h4>Leader Board</h4>
      <ol>
        {
          topPlayers && topPlayers.map((x, index) => <li key={index}>{x.user} ({x.score})</li>)
        }
      </ol>
    </div>
  );
}