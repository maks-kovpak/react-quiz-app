import { Flex, InputNumber, Select, Typography, Radio, Button } from "antd";
import type { DefaultOptionType } from "antd/es/select";
import { useEffect, useState } from "react";
import CategoriesAPI from "../api/categories";
import { fetchQuestionsFx } from "../stores/quiz";
import { useNavigate } from "react-router-dom";

type RadioGroupOptions = React.ComponentProps<typeof Radio.Group>["options"];

const difficultyOptions: RadioGroupOptions = [
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

const typeOptions: RadioGroupOptions = [
  {
    value: "",
    label: "Any Type"
  },
  {
    value: "multiple",
    label: "Multiple Choice"
  },
  {
    value: "boolean",
    label: "True / False"
  }
];

const Main = () => {
  const [categories, setCategories] = useState<DefaultOptionType[]>([]);
  const [currentOptions, setCurrentOptions] = useState<IQuizOptions>({
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

  const navigate = useNavigate();

  return (
    <main>
      <Flex vertical={true} gap="10px">
        <Typography.Title>Welcome to the Quiz App!</Typography.Title>

        <InputNumber
          style={{ width: "100%" }}
          defaultValue={currentOptions.amount}
          onChange={value => {
            setCurrentOptions({ ...currentOptions, amount: value! });
          }}
          min={10}
          max={50}
        ></InputNumber>

        <Select
          defaultValue=""
          options={categories}
          onChange={value => {
            setCurrentOptions({ ...currentOptions, category: parseInt(value) });
          }}
        />

        <Radio.Group
          options={difficultyOptions}
          value={currentOptions.difficulty ?? ""}
          onChange={e => {
            setCurrentOptions({
              ...currentOptions,
              difficulty: e.target.value
            });
          }}
          optionType="button"
        />

        <Radio.Group
          options={typeOptions}
          value={currentOptions.type ?? ""}
          onChange={e => {
            setCurrentOptions({
              ...currentOptions,
              type: e.target.value
            });
          }}
          optionType="button"
        />

        <Button
          type="primary"
          onClick={async () => {
            await fetchQuestionsFx(currentOptions);
            navigate("/question");
          }}
        >
          Go to the quiz
        </Button>
      </Flex>
    </main>
  );
};

export default Main;
