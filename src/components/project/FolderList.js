// // src/components/project/FolderList.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addFolderToProject, deleteFolderFromProject } from '../../store/projectSlice';
import { v4 as uuidv4 } from 'uuid';
import { FaEdit, FaTrash, FaFolder, FaFileAlt, FaEye, FaSave  } from 'react-icons/fa';


const FolderList = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const project = useSelector((s) =>
    s.project.projects.find((x) => x.id === projectId)
  );
  const [name, setName] = useState('');

  if (!project) return <p>Project not found</p>;

  return (
    <div>
      <h2>Folders in {project.name}</h2>
      <table>
        <thead>
          <tr>
            <th>Folder Name</th>
            <th>View Tasks</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {project.folders.map((f) => (
            <tr key={f.id}>
              <td>{f.name}</td>
              <td><button style={{background:"none"}} onClick={() => navigate(`/project/${projectId}/folder/${f.id}`)}><FaFileAlt color="black"/></button></td>
              <td><button style={{background:"none"}} onClick={() => {
                if (window.confirm('Delete folder?')) dispatch(deleteFolderFromProject({ projectId, folderId: f.id }));
              }}><FaTrash color="red"/></button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="New folder" />
      <button onClick={() => {
        dispatch(addFolderToProject({ projectId, folder: { id: uuidv4(), name, tasks: [] } }));
        setName('');
      }}>+ Add Folder</button>
    </div>
  );
};

export default FolderList;
