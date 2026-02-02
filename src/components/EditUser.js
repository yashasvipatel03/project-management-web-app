import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditUser = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', age: '', location: '', image: '' });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem(username));
    if (userData) {
      setForm({
        email: userData.email || '',
        age: userData.age || '',
        location: userData.location || '',
        image: userData.image || ''
      });
    }
  }, [username]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    const userData = JSON.parse(localStorage.getItem(username));
    const updated = { ...userData, ...form };
    localStorage.setItem(username, JSON.stringify(updated));
    alert('User updated');
    navigate('/admin');
  };

  return (
    <div>
      <h2>Edit User: {username}</h2>
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
      <input name="age" value={form.age} onChange={handleChange} placeholder="Age" />
      <input name="location" value={form.location} onChange={handleChange} placeholder="Location" />
      <button style={{width:"300px"}} onClick={handleSave}>Save Changes</button>
    </div>
  );
};

export default EditUser;
