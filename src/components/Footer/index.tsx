import { Progress, Button } from "antd";
import { useUnit } from "effector-react";
import $quizStore, { goToNextQuestion } from "@/stores/quiz";
import "./index.less";

const Footer = () => {
  const quiz = useUnit($quizStore);
  const nextQuestion = useUnit(goToNextQuestion);

  return (
    <footer>
      <div className="footer-inner">
        <Progress percent={(quiz.currentIndex / quiz.questions.length) * 100} />

        <Button type="primary" onClick={nextQuestion}>
          Continue
        </Button>
      </div>
    </footer>
  );
};

export default Footer;
