import { useRef } from "react";

export default function Answers({answers, selecteAnswer, answerState, onSelect}) {
    const shuffledAnswered = useRef();

    if (!shuffledAnswered.current) {
        shuffledAnswered.current = [...answers];
        shuffledAnswered.current.sort(() => Math.random() - 0.5);
    }
    return (
        <ul id="answers">
            {shuffledAnswered.current.map(answer => {
                const isSelected = selecteAnswer === answer;
                let cssClass = '';
                if (cssClass === 'answered' && isSelected) {
                    cssClass = 'selected';
                }
                if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
                    cssClass = answerState;
                }
                return (
                    <li key={answer}>
                        <button className={cssClass} onClick={() => onSelect(answer)} disabled={answerState !== ''}>{answer}</button>
                    </li>
                )
            })}
        </ul>
    )
}  