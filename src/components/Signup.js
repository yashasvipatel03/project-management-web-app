import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import defaultImg from '../image.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import InputField from './Shared/InputField';
import ErrorText from './Shared/ErrorText';
import FormWrapper from './Shared/FormWrapper';
import CustomButton from './Shared/CustomButton';
import LocationModal from './profile/LocationModal';
import { useDispatch } from 'react-redux';
import { setAllUsers } from '../store/authSlice';




const Signup = () => {
  const [form, setForm] = useState({ image: '', username: '', password: '', email: '', age: '', location: '' });
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
//image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setForm(prev => ({ ...prev, image: reader.result }));
    };

    if (file) {
      reader.readAsDataURL(file); // convert to base64
    }
  };



    const validate = () => {
    const newErrors = {};
    if (!form.username) newErrors.username = 'Username is required';
    if (!form.password) newErrors.password = 'Password is required';
    if (!form.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email format';
    if (!form.age) newErrors.age = 'Age is required';
    else if (isNaN(form.age) || form.age < 13 || form.age > 120) newErrors.age = 'Age must be between 13 and 120';
    if (!form.location) newErrors.location = 'Location is required';


    return newErrors;
  };



// first username check karase ke bija koinu che ke nai
const handleSignup = () => {
        const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
  const existing = localStorage.getItem(form.username);
  if (existing) {
    alert('Username already taken. Try another one.');
    return;
  }
localStorage.setItem(form.username, JSON.stringify(form));

const allUsers = JSON.parse(localStorage.getItem('allUsers')) || [];
allUsers.push(form.username);
localStorage.setItem('allUsers', JSON.stringify(allUsers));
dispatch(setAllUsers(allUsers));

  alert('Signup successful');
  navigate('/login');
};

  return (
    <FormWrapper>
       <h2>Signup</h2>
      <div style={{ position: 'relative', width: '120px', height: '120px', marginBottom: '20px' }}>
  <label htmlFor="imageInput" style={{ cursor: 'pointer', width: '120px', height: '120px' }}>
    <img
      src={form.image || defaultImg}
      alt="Preview"
      style={{
        width: '118px',
        height: '118px',
        borderRadius: '15px',
        objectFit: 'cover',
        border: '2px solid black',
      }}
    />
{!form.image &&(
        <div style={{
        padding: "0px",
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      borderRadius: '15px',
      width: '120px',
      height: '120px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '12px',
    }}> 
    <FontAwesomeIcon icon={faCamera} size="2x" />
    {/* <FontAwesomeIcon icon={faSquarePlus} size="2x" /> */}

    </div>
)}
  </label>
  <input
    id="imageInput"
    type="file"
    accept="image/*"
    onChange={handleImageChange}
    style={{ display: 'none' }}
  />
</div>


      <input name="username" placeholder="Username" onChange={handleChange} />
      {/* {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>} */}
      <ErrorText error={errors.username} />

      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      {/* {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>} */}
      <ErrorText error={errors.password} />

      <input name="email" placeholder="Email" onChange={handleChange} />
      {/* {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>} */}
      <ErrorText error={errors.email} />

      <input name="age" placeholder="Age" onChange={handleChange} />
      {/* {errors.age && <p style={{ color: 'red' }}>{errors.age}</p>} */}
      <ErrorText error={errors.age} />

      <input
  name="location"
  placeholder="Select Location"
  value={form.location}
  readOnly
  onClick={() => setShowLocationModal(true)}
  style={{ cursor: 'pointer' }}
/>
{errors.location && <p style={{ color: 'red' }}>{errors.location}</p>}

{showLocationModal && (
  <LocationModal
    onClose={() => setShowLocationModal(false)}
    onSelect={(loc) => {
      setForm(prev => ({ ...prev, location: loc }));
      setShowLocationModal(false);
    }}
  />
)}



      <CustomButton text="SignUp" onClick={handleSignup} />
    </FormWrapper>
  );
};

export default Signup;
