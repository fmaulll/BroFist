import React, { FC } from "react";
import "./styles.scss"

interface Props {
  label: string;
  type: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputText: FC<Props> = ({ label, onChange, placeholder, type }) => {
  return (
    <>
      {label ? <label htmlFor={label}>{label}</label> : null}
      <input
        id={label}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
    </>
  );
};

export default InputText;
