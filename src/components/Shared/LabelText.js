// src/components/shared/LabelText.js
//input-lable mate

import React from 'react';

const LabelText = ({ label, value }) => {
  return (
    <p>
      <strong>{label}: </strong>{value}
    </p>
  );
};

export default LabelText;
