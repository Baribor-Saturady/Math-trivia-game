import { useContext } from 'react';
import TriviaContext from '../context';
import './dialog.css';

export const Dialog = ({content})=>{
    const {dialogDismiss} = useContext(TriviaContext);

    const [title, message] = content;
    return(
        <div className='dialogContainer'>
            <h5>{title}</h5>
            <div className='body'>
                {message}
            </div>
            <div className='closeBtn' onClick={dialogDismiss}>Close</div>
        </div>
    );
}