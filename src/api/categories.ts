import axios from "axios";

export interface ICategory {
  id: number;
  name: string;
}

export default class CategoriesAPI {
  public static readonly API_URL = "https://opentdb.com/api_category.php";

  public static async get(): Promise<ICategory[]> {
    const response = await axios.get<{ trivia_categories: ICategory[] }>(
      CategoriesAPI.API_URL
    );

    return response.data.trivia_categories;
  }
}
