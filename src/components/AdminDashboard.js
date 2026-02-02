
// src/components/AdminDashboard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState(() => {
    const allUsernames = JSON.parse(localStorage.getItem('allUsers')) || [];
    return allUsernames.map(username => {
      const userData = JSON.parse(localStorage.getItem(username));
      return userData ? userData : null;
    }).filter(Boolean);
  });

  const handleEdit = (username) => {
    navigate(`/admin/edit/${username}`);
  };

  const handleDelete = (username) => {
    const updatedUsers = users.filter(u => u.username !== username);
    setUsers(updatedUsers);
    localStorage.setItem('allUsers', JSON.stringify(updatedUsers.map(u => u.username)));
    localStorage.removeItem(username);

    const deleted = JSON.parse(localStorage.getItem('deletedUsers')) || [];
    if (!deleted.includes(username)) {
      deleted.push(username);
      localStorage.setItem('deletedUsers', JSON.stringify(deleted));
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>All Registered Users</h2>
      <table style={{ minWidth: '100%', width:'800px', borderCollapse: 'collapse', background: '#f9f9f9' }}>
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0', textAlign: 'center' }}>
            <th style={cellStyle}>Username</th>
            <th style={cellStyle}>Email</th>
            {/* <th style={cellStyle}>Age</th>
            <th style={cellStyle}>Location</th> */}
            <th style={cellStyle}>Edit</th>
            <th style={cellStyle}>Delete</th>

          </tr>
        </thead>
        <tbody>
  {users.map(user => (
    <tr
      key={user.username}
      style={{ cursor: 'pointer', borderBottom: '1px solid #ccc', textAlign: 'center' }}
      onClick={() => navigate(`/user/${user.username}`)} 
    >
      <td>{user.username}</td>
      <td>{user.email}</td>
      {/* <td>{user.age}</td>
      <td>{user.location}</td> */}
      <td onClick={(e) => e.stopPropagation()}>
  <button
    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
    onClick={() => handleEdit(user.username)}
  >
    <FaEdit color="blue" />
  </button>
</td>
<td onClick={(e) => e.stopPropagation()}>
  <button
    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
    onClick={() => handleDelete(user.username)}
  >
    <FaTrash color="red" />
  </button>
</td>

      
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
};

// Reusable cell style
const cellStyle = {
  padding: '12px',
  fontSize: '16px',
  
};

// Icon button style
const iconBtnStyle = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
};

export default AdminDashboard;
