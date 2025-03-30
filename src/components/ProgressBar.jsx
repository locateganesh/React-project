import { useEffect, useState } from "react";


export default function ProgressBar({ timer }) {
    const [remainingTime, setRemainingTime] = useState(timer);
    
    useEffect(() => {
        const intrevalTime = 20; 
        const interval = setInterval(()=>{
            console.log('Interval');
            setRemainingTime(prevTime => prevTime - intrevalTime);
        }, intrevalTime);

        return () => {
            console.log('Clear clearInterval');
            clearInterval(interval);
        }
    }, []);
    return <progress value={remainingTime} max={timer} />
}