// src/components/profile/ProfileDetails.js
import React, { useState } from 'react';
import Avatar from '../Shared/Avatar';
import CustomButton from '../Shared/CustomButton';
import ProfileItem from './ProfileItem';
import LocationModal from './LocationModal';
import { useSelector, useDispatch } from 'react-redux';
import { logout, updateUser } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import ProjectList from '../project/ProjectList';
import CreateProject from '../project/CreateProject';



const ProfileDetails = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();


const handleDeleteAccount = () => {
  const confirmDelete = window.confirm("Are you sure you want to delete your account?");
  if (!confirmDelete) return;

  // Remove user data from localStorage
  localStorage.removeItem(user.username);

  // Remove username from allUsers list
  const allUsers = JSON.parse(localStorage.getItem('allUsers')) || [];
  const updatedUsers = allUsers.filter(username => username !== user.username);
  localStorage.setItem('allUsers', JSON.stringify(updatedUsers));

  // Save deleted usernames (optional)
  const deleted = JSON.parse(localStorage.getItem('deletedUsers')) || [];
  if (!deleted.includes(user.username)) {
    deleted.push(user.username);
    localStorage.setItem('deletedUsers', JSON.stringify(deleted));
  }

  dispatch(logout());      // clear Redux auth state
  navigate('/');           // go to home page
};


const handleViewAll = () => {
  navigate('/all');
};


//timesheet
const logTimeForToday = (username, time) => {
  const data = JSON.parse(localStorage.getItem('timesheet')) || {};
  const today = new Date().toISOString().split('T')[0];

  if (!data[username]) data[username] = {};
  data[username][today] = time;

  localStorage.setItem('timesheet', JSON.stringify(data));
};
const [time, setTime] = useState('');


  return (
    <div>
      <h2>User Profile</h2>
      <Avatar src={user.image} alt="User" />

      <ProfileItem label="Username" value={user.username} />
      <ProfileItem label="Email" value={user.email} />
      <ProfileItem label="Age" value={user.age} />
      <ProfileItem label="Location" value={user.location || 'Not set'} />

<hr />
<h3 style={{ marginTop: '30px' }}>Your Projects</h3>
<button style={{marginBottom:"50px"}} onClick={() => navigate("/projects")}>View Projects</button>

<button onClick={handleViewAll} style={{ width:"250px", padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', marginTop: '20px',marginBottom:"50px" }}>
View All Projects 
</button>

{/* timesheet button */}
<button onClick={() => navigate('/timesheet')}>View Timesheet</button>


{/* <ProjectList /> */}


      <CustomButton onClick={() => dispatch(logout())} text="Logout" />

      <div style={{ display: 'flex', flexDirection: "row", gap: '5px', padding: '10px', marginTop: '10px' }}>
        <CustomButton text="Edit Profile" width="160px" onClick={() => navigate('/edit-profile')} />
        <CustomButton text="Change Password" width="160px" onClick={() => navigate('/change-password')} />
      </div>
      {/* <CustomButton onClick={handleDeleteAccount} text="Delete My Account" width="330px"
      backgroundColor="red" color="white" marginTop="10px"
/> */}
<button onClick={handleDeleteAccount} style={{text:"Delete My Account", width:"330px",
      backgroundColor:"red", color:"white", marginTop:"10px"}}>Delete My Account</button>


{/* agar alag thi profile ma change location nu button rakhavu hoy to */}
      {/* <CustomButton text="Change Location" width="200px" marginTop="20px" onClick={() => setShowModal(true)} />


            {showModal && (
        <LocationModal
          onSelect={handleLocationSelect}
          onClose={() => setShowModal(false)}
        />
      )} */}

    </div>
  );
};

export default ProfileDetails;











