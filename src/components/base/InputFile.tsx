import React, { useRef, useState } from "react";
import DeleteIcon from "../icons/DeleteIcon";

interface InputFileProps {
  label: string;
  name: string;
  value: File | null;
  setValue: (value: File | null) => void;
}

const InputFile: React.FC<InputFileProps> = ({
  label,
  name,
  value,
  setValue,
}) => {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!value && e.target.files && e.target.files[0]) {
      setValue(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (!value && e.dataTransfer.files && e.dataTransfer.files[0]) {
      setValue(e.dataTransfer.files[0]);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("leave");

    setDragActive(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("over");
    if (value) {
      setDragActive(false);
    } else {
      setDragActive(true);
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const removeFile = () => {
    setValue(null);
  };

  const openFileExplorer = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.click();
    }
  };

  return (
    <div>
      <label htmlFor={name} className="block mb-2 text-base text-darkBlue">
        {label}
      </label>
      <div
        className={`${
          dragActive ? "bg-blue-400" : "bg-white"
        } p-4 w-full rounded-lg h-24 text-center flex flex-col items-center justify-center`}
        onDragEnter={handleDragEnter}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}>
        <input
          id={name}
          name={name}
          className="hidden"
          ref={inputRef}
          type="file"
          multiple={false}
          onChange={handleChange}
          accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
        />

        {!value ? (
          <p className="text-base text-gray">
            <span
              className="text-purple cursor-pointer border-b-[1px] border-purple"
              onClick={openFileExplorer}>
              <u className="no-underline">Upload a file</u>
            </span>{" "}
            or drag and drop here
          </p>
        ) : (
          <div className="text-darkBlue font-medium text-base flex items-center gap-x-1 p-3">
            <span>{value.name}</span>
            <DeleteIcon
              className="fill-darkBlue hover:fill-red cursor-pointer"
              onClick={() => removeFile()}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default InputFile;
