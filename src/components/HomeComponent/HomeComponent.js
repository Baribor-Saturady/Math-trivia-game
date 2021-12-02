/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FaExclamationCircle, FaPlay } from "react-icons/fa";
import TriviaContext from "../../context";
import './HomeComponent.css';
import { dialogState } from "../../utils/dialogUtil";
import ScoreComponent from "../GameComponent/ScoreComponent";


const HomeComponent = () => {
  const navigate = useNavigate();
  const username = useRef(null);
  const error = useRef(null);
  const logo = useRef(null);
  const [dummyState, setDummyState] = useState(null);
  const { user, initialEntry, action, dialogContent, authenticated, score } = useContext(TriviaContext)

  const handleClick = () => {

    if (authenticated.current === true) {
      navigate('/start');
      return;
    }


    let name = username.current.value;
    if (!name) {
      error.current.style.display = 'block';
      return;
    }
    let format = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~0-9]/;
    if (format.test(name.trim())) {
      error.current.style.display = 'block';
      error.current.lastChild.innerText = "Username cannot contain numbers, spaces or special characters";
      return;
    }
    user.current = name;
    navigate('/start')
  }


  const logout = () => {
    authenticated.current = false;
    setDummyState(true);
  }

  useEffect(() => {
    logo.current.style.left = '0px';
    score.current = 0;
    if (initialEntry.current) {
      action.current = {
        type: 'dialog',
        attr: true
      }
      dialogContent.current = dialogState['home'];
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <div className='container'>
      <main>
        <p ref={logo} className='logo'>Math Trivia</p>

        {
          authenticated.current === true ?

            <div>
              <div className='button bg-success' style={{ color: 'var(--white)', cursor: 'pointer' }} onClick={logout}>Log Out</div>
            </div>


            :

            <div className="input-container">
              <div className="input-layout">
                <input ref={username} type="text" name="" id="username" placeholder="Enter player name" maxLength={40} onChange={() => error.current.style.display = 'none'} />
              </div>
              <div ref={error} className="error"><FaExclamationCircle color='var(--red)' /><p>Please enter name</p></div>
            </div>

        }

        <div className='play-layout' onClick={handleClick}>
          <p>Play</p>
          <p><FaPlay color='var(--green)' /></p>
        </div>


      </main>

    </div>
  );
};

export default HomeComponent;
