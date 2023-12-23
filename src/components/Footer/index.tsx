import { Progress, Button } from "antd";
import { useUnit } from "effector-react";
import { goToNextQuestion } from "@/stores/quiz";
import "./index.less";

const Footer = () => {
  const nextQuestion = useUnit(goToNextQuestion);

  return (
    <footer>
      <div className="footer-inner">
        <Progress percent={30} style={{ maxWidth: "300px" }} />
        <Button type="primary" onClick={nextQuestion}>
          Continue
        </Button>
      </div>
    </footer>
  );
};

export default Footer;
