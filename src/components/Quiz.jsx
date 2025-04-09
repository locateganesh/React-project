import { useCallback, useRef, useState } from "react";

import QUESTIONS from "../questions";

import Question from "./Question";
import Summary from "./Summary";

export default function Quiz() {
  // const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  

  const activeQuestionIndex = userAnswers.length;
  const isQuestionCompleted = activeQuestionIndex === QUESTIONS.length;

  const handleSelectedAnswer = useCallback(
    (selectedAnswer) => {
    //   setAnswerState("anwered");
      setUserAnswers((prevAnswer) => {
        return [...prevAnswer, selectedAnswer];
      });
    },
    []
  );

  const handleSkipAnswer = useCallback(() => {
    handleSelectedAnswer(null);
  }, [handleSelectedAnswer]);

  if (isQuestionCompleted) {
    return <Summary userAnswers={userAnswers} />
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        onSelectAnswer={handleSelectedAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
