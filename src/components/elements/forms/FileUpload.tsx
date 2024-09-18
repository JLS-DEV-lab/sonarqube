import Papa from "papaparse";
import { LOGGER, processRows } from "@/utils";
import { BinaryTreeContext, CSVRowData } from "@/types";
import { useOutletContext } from "react-router-dom";

interface Props {
  /** Internal name of the file upload field. Used to reference input fields. */
  id: string;
  /** The displayed heading of the file upload field */
  title: string;
  /** Disable interaction with the file upload field. False by default. */
  disabled?: boolean;
  /** Small text to inform users about the file upload field. */
  helptext?: string;
  /** Marks the file upload field with an aterisk. */
  required?: boolean;
}

const FileUpload = ({
  id,
  title,
  disabled = false,
  helptext,
  required = false,
}: Readonly<Props>) => {
  const { setBinaryTree } = useOutletContext<BinaryTreeContext>();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true, //empty lines will be skipped
        complete: (result) => {
          const parsedData: CSVRowData[] = result.data as CSVRowData[];
          const newTree = processRows(parsedData, file.name);
          // update the global context object, should it be removed and used as a prop instead?
          setBinaryTree(newTree);

        },
        error: (error) => {
          LOGGER.error(error);
        },
      });
    }
  };

  return (
    <div className="flex flex-col">
      <input type="file" id={id} required={required} disabled={disabled} onChange={handleChange} />
      <label htmlFor={id} className="text-red-900">
        {title} {required && "*"}
      </label>
      {helptext && (
        <small id={`${id}-helptext`} className="text-red-500 font-thin">
          {helptext}
        </small>
      )}
    </div>
  );
};

export default FileUpload;
