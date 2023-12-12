import { Flex, InputNumber, Select, Typography, Radio } from "antd";
import type { DefaultOptionType } from "antd/es/select";
import type { RadioChangeEvent } from "antd";
import { useCallback, useEffect, useState } from "react";
import CategoriesAPI from "../api/categories";

const difficultyOptions = [
  {
    value: "",
    label: "Any Difficulty"
  },
  {
    value: "easy",
    label: "Easy"
  },
  {
    value: "medium",
    label: "Medium"
  },
  {
    value: "hard",
    label: "Hard"
  }
];

interface ICurrentOptions {
  amount: number;
  category: number | null;
  difficulty: "easy" | "medium" | "hard" | null;
  type: "multiple" | "boolean" | null;
}

const Main = () => {
  const [categories, setCategories] = useState<DefaultOptionType[]>([]);
  const [currentOptions, setCurrentOptions] = useState<ICurrentOptions>({
    amount: 10,
    category: null,
    difficulty: null,
    type: null
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await CategoriesAPI.get();
      setCategories([
        { value: "", label: "Any Category" },
        ...data.map(item => ({ value: item.id, label: item.name }))
      ]);
    };

    fetchCategories();
  }, []);

  const changeAmount = useCallback((value: number | null) => {
    setCurrentOptions({ ...currentOptions, amount: value! });
  }, []);

  const changeDifficulty = useCallback((e: RadioChangeEvent) => {
    setCurrentOptions({ ...currentOptions, difficulty: e.target.value });
  }, []);

  return (
    <main>
      <Flex vertical={true} gap="10px">
        <Typography.Title>Welcome to the Quiz App!</Typography.Title>

        <InputNumber
          size="large"
          style={{ width: "100%" }}
          defaultValue={currentOptions.amount}
          onChange={changeAmount}
          min={10}
          max={50}
        ></InputNumber>

        <Select defaultValue="" options={categories} size="large" />

        <Radio.Group
          size="large"
          options={difficultyOptions}
          value={currentOptions.difficulty ?? ""}
          onChange={changeDifficulty}
          optionType="button"
        />
      </Flex>
    </main>
  );
};

export default Main;
