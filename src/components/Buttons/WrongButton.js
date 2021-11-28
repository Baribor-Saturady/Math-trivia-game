import React from "react";
import { FaTimesCircle } from "react-icons/fa";

const WrongButton = ({answerHandler}) => {
  return (
    <div className='button' onClick={()=>answerHandler(false)}>
      <FaTimesCircle
        style={{ color: "FC2E2E", fontSize: "60px", cursor: "pointer" }}
      />
    </div>
  );
};

export default WrongButton;
