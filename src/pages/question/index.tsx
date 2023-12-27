import { useMemo } from "react";
import { Radio, Space, Typography } from "antd";

import { useUnit } from "effector-react";
import $quizStore from "@/stores/quiz";

import Footer from "@/components/Footer";
import AnswerOption from "@/components/AnswerOption";

import he from "he";
import { shuffle } from "lodash";
import { v4 as uuidv4 } from "uuid";

const alphabet = "ABCDEF";

const Question = () => {
  const quiz = useUnit($quizStore);

  const currentQuestion = useMemo(() => {
    return quiz.questions[quiz.currentIndex];
  }, [quiz]);

  const answerOptions = useMemo(() => {
    const shuffledAnswers = shuffle([
      currentQuestion.correct_answer,
      ...currentQuestion.incorrect_answers
    ]);

    return shuffledAnswers.reduce<IAnswerOption[]>(
      (accumulator, item, index) => {
        return [...accumulator, { value: index, label: item }];
      },
      []
    );
  }, [currentQuestion]);

  return (
    <>
      <main>
        <Typography.Title level={2}>
          {he.decode(currentQuestion.question)}
        </Typography.Title>

        <Radio.Group>
          <Space direction="vertical">
            {answerOptions.map((ans, i) => (
              <AnswerOption option={ans} prefix={alphabet[i]} key={uuidv4()} />
            ))}
          </Space>
        </Radio.Group>
      </main>
      <Footer />
    </>
  );
};

export default Question;
