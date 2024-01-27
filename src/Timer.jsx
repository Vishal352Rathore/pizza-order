import React, { useState, useEffect, useRef } from 'react';

function Timer({ onTimerComplete }) {
    const [timer, setTimer] = useState(0);
    const timeInterval = useRef(null);

    const formatTime = (timer) => {
        const minutes = Math.floor(timer / 60000).toString().padStart(1, "0");
        const seconds = Math.floor((timer / 1000) % 60).toString().padStart(2, "0");
        return { minutes, seconds };
    };

    const { minutes, seconds } = formatTime(timer);


        console.log('onTimerComplete:', typeof onTimerComplete, onTimerComplete);
        if (typeof onTimerComplete === 'function') {
            onTimerComplete(formatTime(timer).minutes);
        }
 

    useEffect(() => {
        startTimer();
        return stopTimer;
    }, []);

    const startTimer = () => {
        timeInterval.current = setInterval(() => {
            setTimer((prev) => prev + 1000);
        }, 1000);
    };

    const stopTimer = () => {
        clearInterval(timeInterval.current);
    };

    return (
        <div>

            <p>{`${minutes}:${seconds}`}</p>

        </div>
    );
}



export default Timer;

