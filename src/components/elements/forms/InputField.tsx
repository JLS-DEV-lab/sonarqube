// Custom input field design with validity checks

import { HTMLInputTypeAttribute, useState } from "react";
import { Message, ValidationRule } from "react-hook-form";

interface Props {
  /* Internal name of the input field. Used to reference element */
  name: string;
  /* Displayed heading of the input field */
  title: string;
  /* Disable interaction with the input field. The default value is false */
  disabled?: boolean;
  /* Type of Input field. Default input type is 'text' E.g. button | radio button */
  inputType?: HTMLInputTypeAttribute;
  /* If no value is provided, the field will be empty */
  value?: string | number | boolean;
  /* Displays a placeholder text inside input fields */
  placeholder?: string;
  /* Small text to inform users about the expected input value. Text will be multiple lines if its too long */
  helptext?: string;
  /* Marks a input field with an aterisk */
  required?: Message | ValidationRule<boolean>;
  /* onChange handler function for updation a input value */
  onChange?: (key: string, value: string) => void;
}

const InputField = ({
  name,
  title,
  disabled = false,
  inputType = "text",
  value = "",
  placeholder,
  helptext,
  required,
  onChange,
}: Readonly<Props>) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    if (onChange) {
      onChange(name, newValue);
    }
  };

  return (
    <div className="flex flex-col mb-4">
      <div className="flex items-center">
        <label htmlFor={name} className="font-medium w-1/3 pr-2">
          {title}
          {required && <span className="text-red-900">*</span>}
        </label>
        <input
          className="border rounded p-2 w-full"
          type={inputType}
          id={name}
          value={inputValue.toString()}
          placeholder={placeholder}
          aria-required={required ? "true" : "false"}
          disabled={disabled}
          onChange={handleChange}
        />
      </div>
      {helptext && (
        <small id={`${name}-helptext`} className="text-red-500 font-thin">
          {helptext}
        </small>
      )}
    </div>
  );
};

export default InputField;
