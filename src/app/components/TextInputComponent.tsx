import { Input, List } from "antd";
import { ChangeEventHandler } from "react";

interface ITextInputComponent {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  filtered: string[];
  placeholder: string;
}

const TextInputComponent = ({
  value,
  onChange,
  filtered,
  placeholder,
}: ITextInputComponent) => {
  return (
    <>
      <Input
        placeholder={placeholder}
        autoComplete="off"
        value={value}
        onChange={onChange}
      />
      {filtered.length > 0 && (
        <List
          className="absolute top-full left-0 right-0 z-10 bg-white border border-gray-300 rounded-lg max-h-40 overflow-y-auto mt-1 drop-shadow-xl"
          bordered
          dataSource={filtered}
          renderItem={(item, index) => (
            <List.Item
              className="cursor-pointer hover:bg-gray-100 duration-300 ease-in-out"
              key={index}
              onClick={() => {
                onChange({
                  target: {
                    value: item,
                  },
                } as React.ChangeEvent<HTMLInputElement>);
              }}
            >
              {item}
            </List.Item>
          )}
        />
      )}
    </>
  );
};

export default TextInputComponent;
