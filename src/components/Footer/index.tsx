import { useCallback } from "react";
import { Progress, Button } from "antd";
import { useUnit } from "effector-react";
import $quizStore, { goToNextQuestion } from "@/stores/quiz";
import $answersStore, { addCorrectAnswer } from "@/stores/answers";

import "./index.less";

const Footer = () => {
  const quiz = useUnit($quizStore);
  const nextQuestion = useUnit(goToNextQuestion);

  const answersStore = useUnit($answersStore);
  const increaseCorrectAnswers = useUnit(addCorrectAnswer);

  const handleClick = useCallback(() => {
    if (answersStore.currentSelected?.label === quiz.questions[quiz.currentIndex].correct_answer) {
      increaseCorrectAnswers();
    }

    nextQuestion();
  }, [answersStore, increaseCorrectAnswers, quiz, nextQuestion]);

  return (
    <footer>
      <div className="footer-inner">
        <Progress
          percent={Math.round((quiz.currentIndex / quiz.questions.length) * 100)}
          size={[300, 16]}
        />

        <Button type="primary" onClick={handleClick}>
          Continue
        </Button>
      </div>
    </footer>
  );
};

export default Footer;
