// Custom input field design with validity checks
import { HTMLInputTypeAttribute, useState } from "react";
import { Message, ValidationRule } from "react-hook-form";
import Papa from "papaparse";
import { LOGGER } from "@/utils";

// validated input value field types
type InputValueType = string | number | boolean;

interface Props {
  /* Internal name of the input field. Used to reference input fields. */
  name: string;
  /* Displayed heading of the input field */
  title: string;
  /* Disable interaction with the input field. The default value is false */
  disabled?: boolean;
  /* Type of Input field. Default input type is 'text' E.g. button | radio button */
  inputType: HTMLInputTypeAttribute;
  /* If no value is provided, the field will be empty */
  value?: InputValueType;
  /* Displays a placeholder text inside input fields */
  placeholder?: string;
  /* Small text to inform users about the expected input value. Text will be multiple lines if its too long */
  helptext?: string;
  /* Marks a input field with an aterisk */
  required?: Message | ValidationRule<boolean>;
  /* onChange handler function for updation a input value */
  onChange?: (key: string, value: InputValueType) => void;
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
  const [inputValue, setInputValue] = useState<InputValueType>(value);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    //case: text input, textarea or number changes
    if (
      inputType === "text" ||
      inputType === "textarea"
    ) {
      const newValue = event.target.value;
      setInputValue(newValue);
      if (onChange) {
        onChange(name, newValue);
      }
    }
    // case: csv file upload => parse the file and save it in the binary tree context object
    else if (
      event.target instanceof HTMLInputElement &&
      event.target.type === "file"
    ) {
      const file = event.target.files?.[0];
      if (file) {
        Papa.parse(file, {
          header: true,
          complete: (result) => {
            const parsedData = result.data;
            //const newTree = processRows(parsedData);
            //setBinaryTree(newTree);
          },
          error: (error) => {
            LOGGER.error("Error parsing CSV file", error);
          },
        });
      }
    } else {
      LOGGER.error("Input type action is not suported");
    }
  };

  return (
    <div className="flex flex-col mb-4">
      <div className="flex items-center">
        <label htmlFor={name} className="font-medium w-1/3 pr-2">
          {title} {required && <span className="text-red-900">*</span>}
        </label>
        {inputType === "textarea" ? (
          <textarea
            className="border rounded p-2 w-full"
            id={name}
            value={inputValue.toString()}
            placeholder={placeholder}
            aria-required={required ? "true" : "false"}
            disabled={disabled}
            onChange={handleChange}
          />
        ) : (
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
        )}
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
