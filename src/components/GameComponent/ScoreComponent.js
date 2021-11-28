import {useRef, useEffect, useContext} from 'react';
import TriviaContext from '../../context';



const ScoreComponent = ({ scoreRef }) => {
  const divStyles = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    width: "fit-content",
    fontFamily: "Lobster",
  };

  const ref = useRef();
  const {score} = useContext(TriviaContext);

  useEffect(()=>scoreRef(ref));

  return (
    <div style={divStyles}>
      <h2
        style={{
          color: "#3EDA73",
          fontWeight: "400",
        }}
      >
        Score
      </h2>
      <p
        style={{
          color: "#fff",
          fontSize: "1.5rem",
        }}

        ref={ref}
      >
        {score.current}
      </p>
    </div>
  );
};

export default ScoreComponent;
