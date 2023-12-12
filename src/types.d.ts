type QuizDifficulty = "easy" | "medium" | "hard";
type QuizType = "multiple" | "boolean";

interface IQuizOptions {
  amount: number;
  category: number | null;
  difficulty: QuizDifficulty | null;
  type: QuizType | null;
}
