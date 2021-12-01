import { useEffect, useState } from 'react';

const QuestionComponent = ({ state }) => {
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

    const [question, setQuestion] = useState([]);

    useEffect(() => state(setQuestion), []);

    return (
        <div style={style}>
            <p>{question[0]}</p>
            <p>=</p>
            <p>{question[1]}</p>
        </div>
    );
};

export default QuestionComponent;