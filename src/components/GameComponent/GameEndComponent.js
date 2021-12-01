import React, { useContext } from "react";
import TriviaContext from "../../context";
import ProgressBar from "../ProgressBar";
import LeaderBoard from "./LeaderBoard";
import ScoreComponent from "./ScoreComponent";
import './gameEnd.css';
import { Link } from "react-router-dom";
import RetryButton from "../Buttons/RetryButton";


const GameEndComponent = () => {
  const { score } = useContext(TriviaContext);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
      <ScoreComponent scoreRef={()=>{}} />
      <div className='score-board'>
        <h3>Total score:</h3>
        <p>{score.current}</p>
      </div>
      <ProgressBar setTimer={() => { }} />
      <div className='leader-board-layout'>
        <LeaderBoard />
        <RetryButton/>
      </div>
      <Link to='/'>
        <button>
          Home
        </button>
      </Link>
    </div>
  );
};

export default GameEndComponent;
