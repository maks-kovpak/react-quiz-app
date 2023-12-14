import { createEffect, createEvent, createStore } from "effector";
import QuestionsAPI, { type IQuestion } from "../api/questions";
import { clamp } from "lodash";

export interface IQuizStore {
  questions: IQuestion[];
  currentIndex: number;
}

export const goToNextQuestion = createEvent();
export const goToPrevQuestion = createEvent();
export const resetQuiz = createEvent();

export const fetchQuestionsFx = createEffect(
  async (params: Partial<IQuizOptions>): Promise<IQuestion[]> => {
    return await QuestionsAPI.get(params);
  }
);

const $quizStore = createStore<IQuizStore>({ questions: [], currentIndex: 0 })
  .on(fetchQuestionsFx.doneData, (state, fetchedQuestions) => ({
    ...state,
    questions: fetchedQuestions
  }))
  .on(goToNextQuestion, state => ({
    ...state,
    currentIndex: clamp(state.currentIndex + 1, 0, state.questions.length)
  }))
  .on(goToPrevQuestion, state => ({
    ...state,
    currentIndex: clamp(state.currentIndex - 1, 0, state.questions.length)
  }))
  .reset(resetQuiz);

export default $quizStore;
