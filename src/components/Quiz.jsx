import { useCallback, useRef, useState } from "react";

import QUESTIONS from '../questions';
import quizComplete from '../assets/quiz-complete.png'
import QuestionTimer from './QuestionTimer.jsx';

export default function Quiz() {
    const shuffledAnswered = useRef();
    // const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [answerState, setAnswerState] = useState('');

    const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1;
    const isQuestionCompleted = activeQuestionIndex === QUESTIONS.length;

    const handleSelectedAnswer = useCallback((selectedAnswer) => {
        setAnswerState('anwered');
        setUserAnswers(prevAnswer => {
            return [...prevAnswer, selectedAnswer];
        });

        setTimeout(() => {
            if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
                setAnswerState('correct');
            } else {
                setAnswerState('wrong');
            }

            setTimeout(() => {
                setAnswerState('');
            },2000);
        },1000)

    }, [activeQuestionIndex]);

    const handleSkipAnswer = useCallback(() => {
        handleSelectedAnswer(null);
    }, [handleSelectedAnswer]);

    if (isQuestionCompleted) {
        return (
            <div id="summary">
                <img src={quizComplete} alt="Trophy Icon" />
                <h2>Quiz Completed</h2>
            </div>
        )
    } 

    if (!shuffledAnswered.current) {
        shuffledAnswered.current = [...QUESTIONS[activeQuestionIndex].answers];
        shuffledAnswered.current.sort(() => Math.random() - 0.5);
    }

    return (
        <div id="quiz">
            <div id="question">
                <QuestionTimer key={activeQuestionIndex} timeout={10 * 1000} onTimeout={handleSkipAnswer} />
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {shuffledAnswered.current.map(answer => {
                        const isSelected = userAnswers[userAnswers.length - 1] === answer;
                        let cssClass = '';
                        if (cssClass === 'answered' && isSelected) {
                            cssClass = 'selected';
                        }
                        if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
                            cssClass = answerState;
                        }
                        return (
                            <li key={answer}>
                                <button className={cssClass} onClick={() => handleSelectedAnswer(answer)}>{answer}</button>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}
