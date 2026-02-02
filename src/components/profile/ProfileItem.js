// src/components/profile/ProfileItem.js
import React from 'react';
import LabelText from '../Shared/LabelText';

const ProfileItem = ({ label, value }) => {
  return (
    <div style={{ marginBottom: '8px', padding: "0px" }}>
      <LabelText label={label} value={value} />
    </div>
  );
};

export default ProfileItem;
