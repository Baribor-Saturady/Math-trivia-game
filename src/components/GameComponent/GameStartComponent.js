import React, { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import CorrectButton from "../Buttons/CorrectButton";
import WrongButton from "../Buttons/WrongButton";
import QuestionComponent from "./QuestionComponent";
import ScoreComponent from "./ScoreComponent";
import TriviaContext from "../../context";
import './gameStart.css';
import ProgressBar from "../ProgressBar";
import { getQuestion } from "../../utils/questionUtils";
import { dialogState } from "../../utils/dialogUtil";
import { updateScore } from "../../utils/generalUtil";

let time = 100;
let count = 0;

export const GameStartComponent = () => {
  const { score, user, showDialog, dismissDialog, dialogContent, authenticated, currentHighScore } = useContext(TriviaContext);
  const navigate = useNavigate();
  const animId = useRef(null);
  const question = useRef(getQuestion())
  let timerRef;
  let scoreRef;

  const incrementTime = (amt) => {

    time += amt;
    if (time > 100) time = 100;
    timerRef.current.style.width = `${time}%`;
  }

  const decrementTime = (amt) => {

    time -= amt;
    if (time <= 0) {
      endGame();
      return;
    }
    timerRef.current.style.width = `${time}%`;

  }

  let questionState;
  const getQuestionState = (s) => {
    questionState = s;
  }



  const answerHandler = (buttonValue) => {
    if (buttonValue === question.current[2]) {
      incrementTime(10);
      score.current++;
      scoreRef(score.current);
    } else {
      decrementTime(10);
    }

    question.current = getQuestion();
    questionState(question.current);

  };

  const play = () => {

    count++;

    if (count% 5 === 0) {
      count = 0;
      decrementTime(1);
    }


    if (time === 0) {
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


  const handleResponse = (response) => {

    if(authenticated.current===true){
      
      if(score.current > currentHighScore.current){
        let response = updateScore(score.current, user.current);
        response.then(data=>{
          if(data.status===200){
            currentHighScore.current= score.current;
            dismissDialog();
            navigate('/end');
          }else{
            console.log('error updating')
          }
        });
    
      }
      else{
        dismissDialog();
        navigate('/end');
      }
      return;
    }
    dismissDialog();
    switch (response.status) {
      case 404:
      case 200:
        dialogContent.current = {
          ...dialogState[response.status===404?"startOpen":"startExistingUser"], closeListener: () => {
            navigate('/end');
          },
          argument: user.current,
        };
        showDialog();
        break;
      default:
    }
  }


  useEffect(() => {
    question.current = getQuestion();
    questionState(question.current);
    score.current = 0;
    count = 0
    time = 100;
    play();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const endGame = () => {
    cancelAnimationFrame(animId.current);
    dialogContent.current = dialogState['loading']
    setTimeout(showDialog,10);

    fetch(`https://math-trivia-backend.herokuapp.com/api/scores/${user.current}/`)
      .then(handleResponse)
      .catch(() => {
        console.log('error');
      });
  };




  return (
    <>
      <div className="game-start">
        <ScoreComponent scoreRef={setScoreRef} />
        <QuestionComponent state={getQuestionState} />
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


