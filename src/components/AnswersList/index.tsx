import { FC, useEffect, useMemo } from "react";
import { Flex, Radio } from "antd";
import AnswerOption from "@/components/AnswerOption";
import $answersStore, { changeCurrentSelected } from "@/stores/answers";
import { useUnit } from "effector-react";

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

  const answersStore = useUnit($answersStore);
  const changeSelected = useUnit(changeCurrentSelected);

  useEffect(() => {
    changeSelected(null);
  }, [question, changeSelected]);

  return (
    <Radio.Group
      className="answers-list"
      value={answersStore.currentSelected?.value}
      onChange={e => {
        changeSelected(answerOptions.find(item => item.value === e.target.value) ?? null);
      }}
    >
      <Flex gap="middle" vertical>
        {answerOptions.map((ans, i) => (
          <AnswerOption option={ans} prefix={alphabet[i]} key={uuidv4()} />
        ))}
      </Flex>
    </Radio.Group>
  );
};
