// src/components/project/VisibilitySettings.js

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleProjectVisibility, setAllowedUsers } from '../../store/projectSlice';

const VisibilitySettings = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const allUsers = useSelector((state) => state.auth.allUsers);
  const project = useSelector((state) =>
    state.project.projects.find((p) => p.id === projectId)
  );

  const [isPublic, setIsPublic] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    if (project) {
      setIsPublic(project.isPublic);
      setSelectedUsers(project.allowedUsers || []);
    }
  }, [project]);

  if (!project) return <p>Project not found</p>;
  if (project.owner !== user.username) return <p>Access denied</p>;

  const handleToggle = () => {
    setIsPublic(!isPublic);
    dispatch(toggleProjectVisibility({ projectId }));
  };

  const handleSave = () => {
    if (!isPublic) {
      dispatch(setAllowedUsers({ projectId, users: selectedUsers }));
    }
    alert('Visibility settings updated!');
    navigate('/projects');
  };

  const handleUserToggle = (username) => {
    setSelectedUsers((prev) =>
      prev.includes(username)
        ? prev.filter((u) => u !== username)
        : [...prev, username]
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Update Visibility for: {project.name}</h2>

      <label>
        <input type="checkbox" checked={isPublic} onChange={handleToggle} />
        {isPublic ? ' Public' : ' Private'}
      </label>

      {!isPublic && (
        <div style={{ marginTop: 20 }}>
          <strong>Select allowed users:</strong>
          <br />
          {allUsers
            .filter((u) => u.username !== user.username)
            .map((u) => (
              <div key={u.username}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(u.username)}
                    onChange={() => handleUserToggle(u.username)}
                  />
                  {u.username}
                </label>
              </div>
            ))}
        </div>
      )}

      <br />
      <button onClick={handleSave}>Save Changes</button>
    </div>
  );
};

export default VisibilitySettings;
