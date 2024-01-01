import { FC, useEffect, useMemo, useState } from "react";
import { Flex, Radio } from "antd";
import AnswerOption from "@/components/AnswerOption";

import { v4 as uuidv4 } from "uuid";
import { shuffle } from "lodash";
import type { IQuestion } from "@/api/questions";

import "./index.less";

const alphabet = "ABCDEF";

export const AnswersList: FC<{ question: IQuestion }> = ({ question }) => {
  const answerOptions = useMemo(() => {
    const shuffledAnswers = shuffle([question.correct_answer, ...question.incorrect_answers]);

    return shuffledAnswers.reduce<IAnswerOption[]>((accumulator, item, index) => {
      return [...accumulator, { value: index, label: item }];
    }, []);
  }, [question]);

  const [currentValue, setCurrentValue] = useState<IAnswerOption["value"] | null>(null);

  useEffect(() => {
    setCurrentValue(null);
  }, [question]);

  return (
    <Radio.Group
      className="answers-list"
      value={currentValue}
      onChange={e => setCurrentValue(e.target.value)}
    >
      <Flex gap="middle" vertical>
        {answerOptions.map((ans, i) => (
          <AnswerOption option={ans} prefix={alphabet[i]} key={uuidv4()} />
        ))}
      </Flex>
    </Radio.Group>
  );
};
