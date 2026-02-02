//image
// src/components/shared/Avatar.js
import React from 'react';

const Avatar = ({ src, alt, size = 120 }) => {
  return (
    <img
      src={src}
      alt={alt}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '15px',
        objectFit: 'cover',
        border: '2px solid #007bff',
        marginBottom: '10px'
      }}
    />
  );
};

export default Avatar;
