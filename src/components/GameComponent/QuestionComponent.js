import React from "react";

const QuestionComponent = ({ question }) => {
    const style = {
        backgroundColor: "rgba(255, 255, 255, 0.13)",
        color: "white",
        fontFamily: "Lobster",
        fontSize: "2.85rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "400px",
        height: "200px",
        marginTop: "1rem",
        padding: ".5rem 1rem",
        borderRadius: "4px",
    };

    const [quest, answer] = question;

    return (
        <div style={style}>
            <p>{quest}</p>
            <p>=</p>
            <p>{answer}</p>
        </div>
        );
};

export default QuestionComponent;