import { useMemo } from "react";
import { Radio, Space } from "antd";
import { useUnit } from "effector-react";
import $quizStore, { goToNextQuestion } from "../stores/quiz";
import he from "he";
import { shuffle } from "lodash";
import { v4 as uuidv4 } from "uuid";
import { Typography, Button } from "antd";

type AnswerOptions = Array<{ value: number; label: string }>;

const Question = () => {
  const [quiz, nextQuestion] = useUnit([$quizStore, goToNextQuestion]);

  const currentQuestion = useMemo(() => {
    return quiz.questions[quiz.currentIndex];
  }, [quiz.currentIndex]);

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
    <main>
      <Typography.Title level={2}>
        {he.decode(currentQuestion.question)}
      </Typography.Title>

      <Radio.Group>
        <Space direction="vertical">
          {answerOptions.map(ans => (
            <Radio value={ans.value} key={uuidv4()}>
              {ans.label}
            </Radio>
          ))}
        </Space>
      </Radio.Group>

      <Button onClick={nextQuestion}>Next</Button>
    </main>
  );
};

export default Question;
