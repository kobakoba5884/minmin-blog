import React from "react";

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

export const InputField: React.FC<InputFieldProps> = ({
  className = "",
  ...props
}) => {
  return (
    <>
      <input
        {...props}
        type="text"
        className={`shadow-md border py-2 px-3 rounded-lg focus:outline-none w-full ${className}`}
      />
    </>
  );
};
