import { useState } from "react";
import QuestionTimer from './QuestionTimer.jsx';
import Answers from "./Answers.jsx";
import QUESTION from "../questions.js";

export default function Question({index, onSelectAnswer, onSkipAnswer}) {
    const [answer, setAnswer] = useState({
        selectedAnswer: '',
        isCorrect: null
    });

    let timer = 5 * 1000;
    
    if (answer.selectedAnswer) {
        timer = 1000;
    }

    if (answer.isCorrect !== null) {
        timer = 2000;
    }

    const handleSelectAnswer = (answer) => {
        setAnswer({
            selectedAnswer: answer,
            isCorrect: null
        });

        setTimeout(()=> {
            setAnswer(prevState => {
                return {
                    ...prevState,
                    isCorrect: QUESTION[index].answers[0]
                }
            });
            setTimeout(()=>{
                onSelectAnswer(answer);
            },2000);
        },1000);
    }

    let answerState = '';
    if (answer.selectedAnswer && answer.isCorrect !== null) {
        answerState = answer.isCorrect ? 'correct' : 'wrong';
    } else if (answer.selectedAnswer) {
        answerState = 'answered';
    }

    return (
        <div id="question">
            <QuestionTimer 
                key={timer}
                timeout={timer} 
                onTimeout={answer.selectedAnswer === '' ? onSkipAnswer : null} 
                mode={answerState}
            />
            <h2>{QUESTION[index].text}</h2>
            <Answers 
                answers={QUESTION[index].answers} 
                selecteAnswer={answer.selectedAnswer} 
                answerState={answerState} 
                onSelect={handleSelectAnswer}
            />
        </div>
    )
}