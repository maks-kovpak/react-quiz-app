import { createEffect, createEvent, createStore } from "effector";
import type { IQuestion } from "../api/questions";
import QuestionsAPI from "../api/questions";

export interface IQuizStore {
  questions: IQuestion[];
  currentIndex: number;
}

export const goToNextQuestion = createEvent<number>();

export const fetchQuestionsFx = createEffect(
  async (params: Partial<IQuizOptions>): Promise<IQuestion[]> => {
    return await QuestionsAPI.get(params);
  }
);

const $store = createStore<IQuizStore>({ questions: [], currentIndex: 0 })
  .on(fetchQuestionsFx.doneData, (state, fetchedQuestions) => ({
    ...state,
    questions: fetchedQuestions
  }))
  .on(goToNextQuestion, state => ({
    ...state,
    currentIndex: Math.min(
      Math.max(0, state.currentIndex + 1),
      state.questions.length
    )
  }));

export default $store;
