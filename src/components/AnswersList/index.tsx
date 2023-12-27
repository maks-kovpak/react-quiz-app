import { FC, useMemo } from "react";
import { Radio, Space } from "antd";
import AnswerOption from "@/components/AnswerOption";

import { v4 as uuidv4 } from "uuid";
import { shuffle } from "lodash";
import type { IQuestion } from "@/api/questions";

const alphabet = "ABCDEF";

export const AnswersList: FC<{ question: IQuestion }> = ({ question }) => {
  const answerOptions = useMemo(() => {
    const shuffledAnswers = shuffle([
      question.correct_answer,
      ...question.incorrect_answers
    ]);

    return shuffledAnswers.reduce<IAnswerOption[]>(
      (accumulator, item, index) => {
        return [...accumulator, { value: index, label: item }];
      },
      []
    );
  }, [question]);

  return (
    <Radio.Group>
      <Space direction="vertical">
        {answerOptions.map((ans, i) => (
          <AnswerOption option={ans} prefix={alphabet[i]} key={uuidv4()} />
        ))}
      </Space>
    </Radio.Group>
  );
};
