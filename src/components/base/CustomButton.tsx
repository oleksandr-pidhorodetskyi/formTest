import React from "react";

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  customStyles?: "";
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  customStyles = "",
  ...rest
}) => {
  return (
    <button
      className={`w-full capitalize text-lg text-white font-medium px-16 rounded py-4 bg-purple hover:bg-darkPurple disabled:bg-pink ${customStyles}`}
      {...rest}>
      {children}
    </button>
  );
};

export default CustomButton;
