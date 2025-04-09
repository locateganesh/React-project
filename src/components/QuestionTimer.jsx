import { useEffect, useState } from "react";


export default function QuestionTimer({timeout, onTimeout, mode}) {
    const [remaingTime, setRemainingTime] = useState(timeout);

    useEffect(()=> {
        console.log('Timeout');
        const timer = setTimeout(onTimeout, timeout);

        return () => {
            clearTimeout(timer);
        }
    }, [onTimeout, timeout])

    useEffect(()=> {
        const intervalTime = 50;
        const interval = setInterval(() => {
            console.log('Interval');
            setRemainingTime(prevTime => prevTime - intervalTime);
        }, intervalTime);

        return () => {
            clearInterval(interval);
        }

    },[])

    return <progress id="question-time" max={timeout} value={remaingTime} className={mode} />
}