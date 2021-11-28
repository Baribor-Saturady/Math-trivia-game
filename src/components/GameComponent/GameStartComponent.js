import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import CorrectButton from "../Buttons/CorrectButton";
import WrongButton from "../Buttons/WrongButton";
import QuestionComponent from "./QuestionComponent";
import ScoreComponent from "./ScoreComponent";
import TriviaContext from "../../context";
import './gameStart.css';
import ProgressBar from "../ProgressBar";
import { getQuestion } from "../../utils/questionUtils";


export const GameStartComponent = () => {
  const { score, user } = useContext(TriviaContext);
  const [question, setQuestion] = useState(getQuestion());
  const navigate = useNavigate();
  const time = useRef(100);
  const count = useRef(0);
  const animId = useRef(null);
  let timerRef;
  let scoreRef;


  const incrementTime = (amt) => {

    time.current += amt;
    if (time.current > 100) time.current = 100;
    timerRef.current.style.width = `${time.current}%`;
  }

  const decrementTime = (amt) => {

    time.current -= amt;
    if (time.current <= 0) {
      navigate('/end');
      return;
    }
    timerRef.current.style.width = `${time.current}%`;

  }

  const answerHandler = (buttonValue) => {
    if (buttonValue === question[2]) {
      incrementTime(10);
      score.current++;
      scoreRef.current.innerText = score.current;
      setQuestion(getQuestion());
    } else {
      decrementTime(10);
      setQuestion(getQuestion());
    }
  };

  const play = () => {

    count.current++;

    if (count.current % 5 === 0) {
      count.current = 0;
      decrementTime(1);
    }


    if (time.current === 0) {
      cancelAnimationFrame(animId.current);
      return;
    }

    animId.current = requestAnimationFrame(play);
  }

  const setTimer = (r) => {
    timerRef = r;
  }

  const setScoreRef = (r) => {
    scoreRef = r;
  }

  useEffect(() => {
    score.current = 0;
    play();
    
    document.body.addEventListener('keydown', (event)=>
                                     {
            const key = event.key;
            switch (key) {
                case "ArrowLeft":
                    answerHandler(true);
                    break;
                case "ArrowRight":
                    answerHandler(false);
                    break;
                default:
            }
            
        });

    return () => {
      cancelAnimationFrame(animId.current);
      fetch("https://math-trivia-backend.herokuapp.com/api/scores/", {

        // Adding method type
        method: "POST",

        // Adding body or contents to send
        body: JSON.stringify({
          score: score.current,
          user: user
        }),

        // Adding headers to the request
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
        .catch(() => { });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="game-start">
        <ScoreComponent scoreRef={setScoreRef} />
        <QuestionComponent question={question} />
        <ProgressBar setTimer={setTimer} />
        <div className="btn">
          <CorrectButton answerHandler={answerHandler} />
          <WrongButton answerHandler={answerHandler} />
        </div>
      </div>

    </>
  );
};

export default GameStartComponent;


