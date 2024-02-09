import { useState, useRef, useEffect } from "react";
import ResultModal from "./ResulModal";

export default function TimerChallenge({ title, targetTime }) {
    const timer = useRef();
    const dialog = useRef();
    const [timerExpired, setTimerExpired] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

    useEffect(() => {
        if (timeRemaining <= 0) {
            clearInterval(timer.current);
            setTimerExpired(true);
            dialog.current.showModal();
        }
    }, [timeRemaining]);

    function handleReset() {
        setTimeRemaining(targetTime * 1000);
    }

    function handleStart() {
        timer.current = setInterval(() => {
            setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10);
        }, 10);
    }

    function handleStop() {
        setTimerExpired(true);
        dialog.current.showModal();
        clearInterval(timer.current);
    }

    return (
        <>
            <ResultModal ref={dialog} targetTime={targetTime} remainingTime={timeRemaining} onReset={handleReset} />
            <section className="challenge">
                <h2>{title}</h2>
                {timerExpired ? <p>you lost</p> : <p>you won</p>}
                <p className="challenge-time">
                    {targetTime} second {targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={timerIsActive ? handleStop : handleStart}>
                        {timerIsActive ? "stop" : "start"} challenge
                    </button>
                </p>
                <p className={timerIsActive ? 'active' : undefined}>
                    {timerIsActive ? "time is running" : 'start timer'}
                </p>
            </section>
        </>
    )
}
