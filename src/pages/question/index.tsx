import { useMemo } from "react";
import { Radio, Space } from "antd";
import { useUnit } from "effector-react";
import $quizStore from "@/stores/quiz";
import he from "he";
import { shuffle } from "lodash";
import { v4 as uuidv4 } from "uuid";
import { Typography } from "antd";
import Footer from "@/components/Footer";

type AnswerOptions = Array<{ value: number; label: string }>;

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

    return shuffledAnswers.reduce<AnswerOptions>((accumulator, item, index) => {
      return [...accumulator, { value: index, label: item }];
    }, []);
  }, [currentQuestion]);

  return (
    <>
      <main>
        <Typography.Title level={2}>
          {he.decode(currentQuestion.question)}
        </Typography.Title>

        <Radio.Group>
          <Space direction="vertical">
            {answerOptions.map(ans => (
              <Radio value={ans.value} key={uuidv4()}>
                {he.decode(ans.label)}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </main>
      <Footer />
    </>
  );
};

export default Question;
