import React, { useContext, useState } from 'react';
// import { AuthContext } from '../context/AuthContext';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import InputField from './Shared/InputField';
import ErrorText from './Shared/ErrorText';
import FormWrapper from './Shared/FormWrapper';
import CustomButton from './Shared/CustomButton';

//using redux
const ChangePassword = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const navigate = useNavigate();

  const handleChange = () => {
    if (oldPass !== user.password) {
      alert('Old password is incorrect');
      return;
    }

    const updated = { ...user, password: newPass };
    localStorage.setItem(updated.username, JSON.stringify(updated));
    dispatch(login(updated));
    alert('Password changed');
    navigate('/profile');
  };

  return (
    <FormWrapper>
      <h2>Change Password</h2>
      <InputField type="password" placeholder="Old Password" onChange={(e) => setOldPass(e.target.value)} />
      <InputField type="password" placeholder="New Password" onChange={(e) => setNewPass(e.target.value)} />
      <CustomButton text="Change" onClick={handleChange} />
    </FormWrapper>
  );
};

export default ChangePassword;
