import React from "react";
import DefaultErrorIcon from "../../assets/icons/error-icon.svg";

interface InputProps {
  label?: string;
  errorIcon?: React.ReactNode;
  errorMessage?: string;
  value: string;
  setValue: (value: string) => void;
  name: string;
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  errorMessage,
  value,
  setValue,
  errorIcon,
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-base text-darkBlue capitalize">
        {label}
      </label>
      <input
        id={name}
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        className={`border text-base leading-[none] font-medium rounded-lg text-darkBlue block w-full px-4 py-3 outline-none focus:border-2 ${
          errorMessage
            ? "bg-lightRed border-2 border-red focus:ring-red focus:border-red"
            : "bg-white border-pink focus:ring-purple  focus:border-purple"
        }`}
      />
      {errorMessage ? (
        <div className="mt-2 flex gap-x-2">
          {errorIcon ? (
            errorIcon
          ) : (
            <img src={DefaultErrorIcon} alt="default error icon" />
          )}
          <p className="text-sm text-darkBlue">{errorMessage}</p>
        </div>
      ) : null}
    </div>
  );
};

export default Input;
