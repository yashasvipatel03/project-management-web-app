// src/components/shared/CustomButton.js
//buttons mate

import React from 'react';

const CustomButton = ({ onClick, text, width = "120px" }) => {
  return (
    <button onClick={onClick} style={{ width }}>
      {text}
    </button>
  );
};

export default CustomButton;
