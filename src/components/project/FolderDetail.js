// // src/components/project/FolderDetail.js

import React, { useState } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addTaskToFolder, deleteTaskFromFolder } from '../../store/projectSlice';
import { v4 as uuidv4 } from 'uuid';
// import { FaTrash } from 'react-icons/fa';
import { FaEdit, FaTrash, FaFolder, FaFileAlt, FaEye, FaSave  } from 'react-icons/fa';


const FolderDetail = () => {
  const { projectId, folderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const project = useSelector((s) => s.project.projects.find((x) => x.id === projectId));
  const folder = project?.folders.find((f) => f.id === folderId);
  const [taskName, setTaskName] = useState('');

  if (!folder) return <p>Folder not found</p>;

  return (
    <div>
      <h2>Tasks in {folder.name}</h2>
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Details</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {folder.tasks.map((t) => (
            <tr key={t.id}>
              <td>{t.name}</td>
              <td>
                <button style={{background:"none"}} onClick={() => navigate(`/project/${projectId}/folder/${folderId}/task/${t.id}`)}><FaFileAlt color="black"/></button>

              </td>
              <td>
                <button style={{background:"none"}} onClick={() => window.confirm('Delete?') &&
                  dispatch(deleteTaskFromFolder({ projectId, folderId, taskId: t.id }))}><FaTrash color="red"/></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <input value={taskName} onChange={(e) => setTaskName(e.target.value)} placeholder="New task" />
      <button onClick={() => {
        if (!taskName.trim()) return;
        dispatch(addTaskToFolder({ projectId, folderId, task: { id: uuidv4(), name: taskName } }));
        setTaskName('');
      }}>+ Add Task</button>
    </div>
  );
};

export default FolderDetail;
