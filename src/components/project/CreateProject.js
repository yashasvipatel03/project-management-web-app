import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProject } from '../../store/projectSlice';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import UserSelector from './UserSelector';

const CreateProject = () => {
  const [name, setName] = useState('');
  const [description, setDesc] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreate = () => {
    const newProject = {
      id: uuidv4(),
      name,
      description,
      owner: user.username,
      isPublic,
      allowedUsers: selectedUsers,
      folders: [],
    };
    dispatch(addProject(newProject));
    navigate('/projects');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Create Project</h2>
      <input
        placeholder="Project Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ display: 'block', marginBottom: '10px', padding: '8px' }}
      />
      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDesc(e.target.value)}
        style={{ display: 'block', marginBottom: '10px', padding: '8px' }}
      />

      <button
        onClick={() => setIsPublic(prev => !prev)}
        style={{
          backgroundColor: isPublic ? 'green' : 'gray',
          color: 'white',
          padding: '8px 16px',
          border: 'none',
          marginBottom: '20px',
        }}
      >
        {isPublic ? 'Public' : 'Private'}
      </button>

      {/* Show user selector if private */}
      {!isPublic && (
        <UserSelector
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
        />
      )}

      <br />
      <button onClick={handleCreate}>Create</button>
    </div>
  );
};

export default CreateProject;
