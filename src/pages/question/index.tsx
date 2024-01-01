import { useMemo } from "react";
import { Typography } from "antd";
import he from "he";

import { useUnit } from "effector-react";
import $quizStore from "@/stores/quiz";

import { AnswersList } from "@/components/AnswersList";
import Footer from "@/components/Footer";
import { useBeforeUnload } from "react-router-dom";

const Question = () => {
  const quiz = useUnit($quizStore);

  const currentQuestion = useMemo(() => {
    return quiz.questions[quiz.currentIndex];
  }, [quiz]);

  useBeforeUnload(() => localStorage.setItem("__quiz", JSON.stringify(quiz)));

  return (
    <>
      <main>
        <Typography.Title level={2}>{he.decode(currentQuestion.question)}</Typography.Title>
        <AnswersList question={currentQuestion} />
      </main>
      <Footer />
    </>
  );
};

export default Question;
