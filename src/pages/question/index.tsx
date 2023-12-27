import { useMemo } from "react";
import { Typography } from "antd";
import he from "he";

import { useUnit } from "effector-react";
import $quizStore from "@/stores/quiz";

import { AnswersList } from "@/components/AnswersList";
import Footer from "@/components/Footer";

const Question = () => {
  const quiz = useUnit($quizStore);

  const currentQuestion = useMemo(() => {
    return quiz.questions[quiz.currentIndex];
  }, [quiz]);

  return (
    <>
      <main>
        <Typography.Title level={2}>
          {he.decode(currentQuestion.question)}
        </Typography.Title>

        <AnswersList question={currentQuestion} />
      </main>
      <Footer />
    </>
  );
};

export default Question;
