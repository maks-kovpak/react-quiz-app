import { CheckboxRef, Radio, Space } from "antd";
import he from "he";
import { forwardRef } from "react";
import "./index.less";
import { RadioButtonProps } from "antd/es/radio/radioButton";

type AnswerOptionProps = {
  option: IAnswerOption;
  prefix: string;
};

const AnswerOption = forwardRef<CheckboxRef, AnswerOptionProps & RadioButtonProps>(
  ({ option, prefix, ...props }, ref) => {
    return (
      <Radio.Button value={option.value} className="answer-option" ref={ref} {...props}>
        <Space direction="horizontal">
          <div className="answer-option-prefix">{prefix}</div>
          <span>{he.decode(option.label)}</span>
        </Space>
      </Radio.Button>
    );
  }
);

export default AnswerOption;
