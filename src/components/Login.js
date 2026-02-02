import React, { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
import InputField from './Shared/InputField';
import ErrorText from './Shared/ErrorText';
import FormWrapper from './Shared/FormWrapper';
import CustomButton from './Shared/CustomButton';


//using redux
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

//   }
const handleLogin = () => {
  // Step 1: Check if user is deleted
  const deleted = JSON.parse(localStorage.getItem('deletedUsers')) || [];
  if (deleted.includes(username)) {
    alert('Admin deleted this account.');
    return;
  }

  // Step 2: Your original logic (unchanged)
  const user = JSON.parse(localStorage.getItem(username));
  if (user && user.password === password) {
    dispatch(login(user));
    if (user.username === "admin") {
      navigate('/admin');
    } else {
      navigate('/profile');
    }
  } else {
    alert('Invalid credentials');
  }
};


  return (
    <FormWrapper>
      <h2>Login</h2>
      <InputField placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <InputField type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <CustomButton text="Login" onClick={handleLogin} />
    </FormWrapper>
  );
};

export default Login;
