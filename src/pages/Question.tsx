import { useUnit } from "effector-react";
import { useMemo } from "react";
import $quizStore, { goToNextQuestion } from "../stores/quiz";

const Question = () => {
  const [quiz, nextQuestion] = useUnit([$quizStore, goToNextQuestion]);

  const currentQuestion = useMemo(() => {
    return quiz.questions[quiz.currentIndex];
  }, [quiz.currentIndex]);

  return (
    <div>
      {JSON.stringify(currentQuestion)}
      <button onClick={nextQuestion}>Next</button>
    </div>
  );
};

export default Question;
