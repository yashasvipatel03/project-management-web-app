
import React from 'react';

const locations = [
  "Gujarat", "Kerala", "Punjab", "Rajasthan",
  "Maharashtra", "Karnataka", "Odisha", "Assam",
  "Bihar", "Tamil Nadu","Himachal pradesh"
];

const modalStyle = {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '95%',
  maxWidth: '350px',
  backgroundColor: '#fff',
  padding: '20px',
  boxSizing: 'border-box',
  boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
  zIndex: 1000,
};

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.4)',
  zIndex: 999
};

const LocationModal = ({ onClose, onSelect }) => {
  return (
    <>
      <div style={overlayStyle} onClick={onClose} />
      <div style={modalStyle}>
        <h3 style={{ margin: 0, marginBottom: '15px' }}>Select Location</h3>

        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {locations.map(loc => (
            <li key={loc} style={{ marginBottom: '8px' }}>
              <button
                onClick={() => onSelect(loc)}
                style={{
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  width: '300px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                {loc}
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={onClose}
          style={{
            marginTop: '10px',
            backgroundColor: 'gray',
            color: 'white',
            padding: '10px 12px',
            borderRadius: '6px',
            width: '100%',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default LocationModal;
