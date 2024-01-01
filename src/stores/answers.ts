import { createEvent, createStore } from "effector";

export interface IAnswersStore {
  count: number;
  currentSelected: IAnswerOption | null;
}

export const addCorrectAnswer = createEvent();
export const changeCurrentSelected = createEvent<IAnswersStore["currentSelected"]>();

const $answersStore = createStore<IAnswersStore>({ count: 0, currentSelected: null });

$answersStore.on(addCorrectAnswer, state => ({
  ...state,
  count: state.count + 1
}));

$answersStore.on(changeCurrentSelected, (state, selected) => ({
  ...state,
  currentSelected: selected
}));

export default $answersStore;
