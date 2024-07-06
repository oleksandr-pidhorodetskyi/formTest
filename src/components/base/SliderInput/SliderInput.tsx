import React, { useEffect } from "react";
import "./SliderInput.css"; // Import custom CSS file
import valueContainerIcon from "../../../assets/icons/valueContainer.svg";

interface SliderInputProps {
  minValue: number;
  maxValue: number;
  name: string;
  value: number;
  setValue: (name: string, value: number) => void;
  label: string;
}

const SliderInput: React.FC<SliderInputProps> = ({
  minValue,
  maxValue,
  name,
  value,
  setValue,
  label,
}) => {
  const valuePercentage =
    ((Number(value) - minValue) / (maxValue - minValue)) * 100;

  const calculateValuePosition = () => {
    if (valuePercentage < 30) {
      return valuePercentage + 1.5;
    }
    if (valuePercentage > 68) {
      return valuePercentage - 0.7;
    }
    return valuePercentage;
  };

  useEffect(() => {
    const slider = document.getElementById(name);
    if (slider) {
      slider.style.setProperty("--value", `${valuePercentage}%`);
    }
  }, [value, minValue, maxValue, name, valuePercentage]);

  return (
    <div>
      <label htmlFor={name} className="text-base text-darkBlue">
        {label}
      </label>
      <div className="relative pt-6 mb-8">
        <input
          id={name}
          type="range"
          name={name}
          value={value}
          onChange={(e) => setValue(name, +e.target.value)}
          min={minValue}
          max={maxValue}
          className={`slider w-full h-1 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple`}
        />
        <div className="absolute left-0 right-0 top-2 flex justify-between"></div>
        <span className="absolute left-0  top-2 text-sm text-gray-500">
          {minValue}
        </span>
        <span className="absolute  right-0 top-2 text-sm text-gray-500">
          {maxValue}
        </span>
        <div
          className="absolute -bottom-8 transform -translate-x-1/2"
          style={{
            left: `${calculateValuePosition()}%`,
          }}>
          <div className="relative block w-[37px]">
            <img src={valueContainerIcon} alt="value container" />
            <span className="text-xs text-purple absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {value}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderInput;
