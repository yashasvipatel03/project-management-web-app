// src/components/shared/ErrorText.js
import React from 'react';

const ErrorText = ({ error }) => {
  if (!error) return null;

  return (
    <p style={{ color: 'red', fontSize: '14px', marginTop: '-10px' }}>
      {error}
    </p>
  );
};

export default ErrorText;
