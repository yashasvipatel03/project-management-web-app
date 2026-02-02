// src/components/shared/InputField.js
import React from 'react';

const InputField = ({ name, type = "text", placeholder, value, onChange }) => {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default InputField;
