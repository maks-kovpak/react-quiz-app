import axios from "axios";

export interface IQuestion {
  type: QuizType;
  difficulty: QuizDifficulty;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export default class QuestionsAPI {
  public static readonly API_URL = "https://opentdb.com/api.php";

  private static generateUrl(options: Partial<IQuizOptions>): string {
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(options)) {
      if (value) {
        params.append(key, value.toString());
      }
    }

    return QuestionsAPI.API_URL + "?" + params;
  }

  public static async get(
    options?: Partial<IQuizOptions>
  ): Promise<IQuestion[]> {
    const response = await axios.get<{ results: IQuestion[] }>(
      QuestionsAPI.generateUrl(options ?? { amount: 10 })
    );

    return response.data.results;
  }
}
