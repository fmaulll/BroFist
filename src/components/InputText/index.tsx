import React, { FC } from "react";
import "./styles.scss";

interface Props {
  value: string | number | undefined;
  label: string;
  type: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputText: FC<Props> = ({
  value,
  label,
  onChange,
  placeholder,
  type,
}) => {
  return (
    <>
      {label ? <label htmlFor={label}>{label}</label> : null}
      <input
        value={value}
        id={label}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
    </>
  );
};

export default InputText;
