import React from "react";
import DefaultErrorIcon from "../../assets/icons/error-icon.svg";
import { ErrorType } from "../../types/App.types";

interface InputProps {
  label?: string;
  errorIcon?: React.ReactNode;
  errorMessage?: ErrorType;
  value: string;
  setValue: (name: string, value: string) => void;
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
        onChange={(e) => setValue(name, e.target.value.trim())}
        type="text"
        className={`border text-base leading-[none] font-medium rounded-lg text-darkBlue block w-full px-4 py-3 outline-none focus:border-2 ${
          errorMessage?.message
            ? "bg-lightRed border-2 border-red focus:ring-red focus:border-red"
            : "bg-white border-pink focus:ring-purple  focus:border-purple"
        }`}
      />
      {errorMessage?.message ? (
        <div className="mt-2 flex gap-x-2">
          {errorIcon ? (
            errorIcon
          ) : (
            <img src={DefaultErrorIcon} alt="default error icon" />
          )}
          <div>
            <p className="text-sm text-darkBlue">{errorMessage.message}</p>
            {errorMessage.example ? (
              <p className="text-sm text-darkBlue">
                Example: {errorMessage.example}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Input;
