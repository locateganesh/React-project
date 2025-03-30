import { useRef, useState } from "react";
import Dialog from './Dialog.jsx';

export default function Timer({title, time}) {
    const timer = useRef();
    const dialog = useRef();
    // const [timerExpired, setTimerExpired] = useState(false);
    // const [timerStarted, setTimerStarted] = useState(false);

    const [timeRemaining, setTimeRemaining] = useState(time * 1000);

    /*
    const handleStart = () => {
        setTimerStarted(true);
        timer.current = setTimeout(() => {
            setTimerExpired(true);
            // dialog.current && dialog.current.showModal(); // existing dialog modal event
            dialog.current && dialog.current.open(); // existing dialog modal event
        }, time * 1000);
    }
    */

    const timerIsActive = timeRemaining > 0 && timeRemaining < (time * 1000);

    if (timeRemaining <= 0) {
        clearInterval(timer.current);
        dialog.current.open();
    }

    const hendleReset = () => {
        setTimeRemaining(time * 1000);
    }

    const handleStart = () => {
        timer.current = setInterval(() => {
            setTimeRemaining(prevRemainingTime => prevRemainingTime - 10);
        }, 10);
    }


    const handleStop = () => {
        dialog.current.open();
        clearInterval(timer.current);
    }
    return <>
        <Dialog ref={dialog} targetTime={time} remainingTime={timeRemaining} onReset={hendleReset} />
        <section className="challenge">
            <h2>{title}</h2>
            {timerIsActive && <p>You Lost!</p>}
            <p className="challenge-time">
                {time} second{time > 1 ? 's' : ''}
            </p>
            <p>
                <button onClick={timerIsActive ? handleStop : handleStart}>{timerIsActive ? 'Stop' : 'Start'} Challenge</button>
            </p>
            <p className={timerIsActive ? 'active' : undefined}>
                {timerIsActive ? 'Time is running...' : 'Timer Inactive'}
            </p>
        </section>
    </>
}