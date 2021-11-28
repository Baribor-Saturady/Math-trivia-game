import {useRef,useEffect} from 'react';

import './progressBar.css';

 const  ProgressBar =({setTimer})=> {

    const timerRef = useRef();

    useEffect(()=>{
        setTimer(timerRef);
    });

    return (
        <div className='progressBar'>
            <div ref={timerRef} className='indicator'></div>
            <div className='blob' id='blob'></div>
        </div>

    );
}

export default ProgressBar;