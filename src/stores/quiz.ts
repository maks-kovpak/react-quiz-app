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

const data = localStorage.getItem("__quiz");

const $quizStore = createStore<IQuizStore>(
  data ? JSON.parse(data) : { questions: [], currentIndex: 0 }
);

$quizStore.on(fetchQuestionsFx.doneData, (_, fetchedQuestions) => ({
  currentIndex: 0,
  questions: fetchedQuestions
}));

$quizStore.on(goToNextQuestion, state => ({
  ...state,
  currentIndex: clamp(state.currentIndex + 1, 0, state.questions.length)
}));

$quizStore.on(goToPrevQuestion, state => ({
  ...state,
  currentIndex: clamp(state.currentIndex - 1, 0, state.questions.length)
}));

$quizStore.reset(resetQuiz);

export default $quizStore;
