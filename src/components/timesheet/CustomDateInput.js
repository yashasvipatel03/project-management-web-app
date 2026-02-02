import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

//This defines a custom button-like input for the date picker
const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
  <button
    className="custom-date-btn"
    onClick={onClick}
    ref={ref}
    style={{
      padding: '10px 14px',
      fontSize: '16px',
      border: '1px solid #ccc',
      borderRadius: '6px',
      backgroundColor: '#f8f8f8',
      color:'black',
      cursor: 'pointer',
    }}
  >
    {value || "Select date"}
  </button>
));
export default CustomInput;
