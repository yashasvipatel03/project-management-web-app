import React, { useContext, useState } from 'react';
// import { AuthContext } from '../context/AuthContext';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import InputField from './Shared/InputField';
import ErrorText from './Shared/ErrorText';
import FormWrapper from './Shared/FormWrapper';
import CustomButton from './Shared/CustomButton';
import LocationModal from './profile/LocationModal';

//using redux
const EditProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [form, setForm] = useState(user);
  const [errors, setErrors] = useState({});
  const [showLocationModal, setShowLocationModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setForm(prev => ({ ...prev, image: reader.result }));
    };

    if (file) reader.readAsDataURL(file);
  };

  const handleUpdate = () => {
    localStorage.setItem(form.username, JSON.stringify(form));
    dispatch(updateUser(form));
    alert('Profile updated');
    navigate('/profile');
  };

  return (
    <FormWrapper>
      <h2>Edit Profile</h2>
      {/* <InputField type="file" accept="image/*" onChange={handleImageChange} /> */}
      <InputField name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <InputField name="age" placeholder="Age" value={form.age} onChange={handleChange} />

 <input
        name="location"
        placeholder="Select Location"
        value={form.location}
        readOnly
        onClick={() => setShowLocationModal(true)}
        style={{
          padding: '10px',
          borderRadius: '6px',
          border: '1px solid #ccc',
          width: '100%',
          fontSize: '16px',
          marginTop: '10px',
          cursor: 'pointer'
        }}
      />
      <ErrorText error={errors.location} />

      {showLocationModal && (
        <LocationModal
          onSelect={(loc) => {
            setForm(prev => ({ ...prev, location: loc }));
            setShowLocationModal(false);
          }}
          onClose={() => setShowLocationModal(false)}
        />
      )}

      <CustomButton text="Save" onClick={handleUpdate} />
    </FormWrapper>
  );
};

export default EditProfile;
