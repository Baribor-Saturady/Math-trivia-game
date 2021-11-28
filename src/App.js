import { useState, useRef, useEffect } from "react";
import "./App.css";

import TriviaContext from "./context";
import { Outlet } from "react-router";
import { Dialog } from "./utils/dialogUtil";

const welomeMessage = () => {
  return (
    <div>
      <p>Hi Dear! <br /> Welcome to this mini-version of <b>Math Trivia</b>.</p>
      <p>If you encounter any bug do well to contact the developers.</p>
      <p>Goto the links at the bottom.</p>
    </div>
  )
}

function App() {
  const score = useRef(0);
  const [isDialog, setIsDialog] = useState(true);
  const [user, setUser] = useState('');
  const dialogContent = useRef(['Welcome to Math Trivia', welomeMessage()]);
  const appRef = useRef(null);

  const dialogDismiss =()=>{
    appRef.current.style.filter = 'blur(0px)';
    appRef.current.style.pointerEvents = 'all';
    setIsDialog(false);
  }

  useEffect(()=>{
      appRef.current.style.filter = 'blur(3px)';
      appRef.current.style.pointerEvents = 'none';
    
  },[]);

  return (

    <TriviaContext.Provider value={{ score, isDialog, setIsDialog, user, setUser, dialogDismiss}}>
      <div style={{position:'relative'}}>
        <div ref={appRef} className="App">

          <Outlet />
          <footer>
            <p>&copy; <a href='http://github.com/extheoisah'>Theophilus</a> &amp; <a href='https://linkedin.com/in/baribor-saturday'>Baribor</a>, 2021.</p>
          </footer>

        </div>
        {
          isDialog && <Dialog content={dialogContent.current} />
        }
      </div>

    </TriviaContext.Provider>


  );
}

export default App;
