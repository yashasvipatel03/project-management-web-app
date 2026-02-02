// src/components/UserDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';
import Avatar from './Shared/Avatar';
import LabelText from './Shared/LabelText';

const UserDetail = () => {
  const { username } = useParams();
  const user = JSON.parse(localStorage.getItem(username));

  if (!user) return <p>User not found</p>;

  return (
    <div>
      <h2>User Details</h2>
      <Avatar src={user.image} alt={user.username} />
      <LabelText label="Username" value={user.username} />
      <LabelText label="Email" value={user.email} />
      <LabelText label="Age" value={user.age} />
      <LabelText label="Location" value={user.location} />
    </div>
  );
};

export default UserDetail;
