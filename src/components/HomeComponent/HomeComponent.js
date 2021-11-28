import React, { useEffect, useRef, useContext } from "react";
import {useNavigate} from 'react-router-dom';
import { FaExclamationCircle, FaPlay } from "react-icons/fa";
import TriviaContext from "../../context";

import './HomeComponent.css';

const HomeComponent = () => {
  const navigate = useNavigate();
  const user = useRef(null);
  const error = useRef(null);
  const logo = useRef(null);
  const {setUser} = useContext(TriviaContext)

  const handleClick = () => {
    
    if (!user.current.value) {
      error.current.style.display='block';
      return;
    }
    setUser(user.current.value);
    navigate('/start')
  }
  

  useEffect(() => {
    logo.current.style.left = '0px';
  }, [])


  return (
    <div className='container'>
      <main>
        <p ref={logo} className='logo'>Math Trivia</p>

        <div className="input-layout">
          <input ref={user} type="text" name="" id="username" placeholder="Enter player name" maxLength={40} />
          <div ref={error} className="error"><FaExclamationCircle color='var(--red)'/><p>Please enter name</p></div>
        </div>

          <div className='play-layout' onClick={handleClick}>
            <p>Play</p>
            <p><FaPlay color='var(--green)' /></p>
          </div>
        

      </main>

    </div>
  );
};

export default HomeComponent;
