import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const CorrectButton = ({ answerHandler }) => {
  return (
    <div onClick={()=>answerHandler(true)} className='button'>
      <FaCheckCircle
        style={{ color: "3EDA73", fontSize: "60px", cursor: "pointer" }}
      />
    </div>
  );
};

export default CorrectButton;
