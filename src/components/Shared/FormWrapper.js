// src/components/shared/FormWrapper.js
import React from 'react';

const FormWrapper = ({ children }) => {
  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      {children}
    </div>
  );
};

export default FormWrapper;
