import { FaSyncAlt } from 'react-icons/fa';
import { useContext } from 'react';
import { useNavigate } from 'react-router';
import TriviaContext from '../../context';

const RetryButton = () => {
    const {score} = useContext(TriviaContext);
    const navigate = useNavigate();

    return (
        <span onClick={() => {
            score.current = 0;
            navigate('/start');
        }}>
            <FaSyncAlt style={{ color: "3EDA73", fontSize: "38px", cursor: "pointer" }} />
        </span>

    );
}

export default RetryButton;