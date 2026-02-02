// src/components/project/TaskDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateTaskDescription } from '../../store/projectSlice';
import TimeLogModal from './TimeLogModal';
import { addTimeLog } from '../../store/timesheetSlice';
import './TaskDetail.css';
import { FaEdit, FaTrash, FaFolder, FaFileAlt, FaEye, FaSave } from 'react-icons/fa';


const TaskDetail = () => {
  const { projectId, folderId, taskId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const projects = useSelector((s) => s.project.projects);
  const user = useSelector((state) => state.auth.user);
  const username = useSelector((state) => state.auth.user.username);
  const project = projects.find((p) => p.id === projectId);
  const folder = project?.folders.find((f) => f.id === folderId);
  const task = folder?.tasks.find((t) => t.id === taskId);


  const [description, setDescription] = useState(task?.description || '');
  const [showTimeLogModal, setShowTimeLogModal] = useState(false);

  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const timesheetData = JSON.parse(localStorage.getItem('timesheet')) || {};
    const taskKey = `${projectId}_${folderId}_${taskId}`;
    const savedLogs = timesheetData[user.username]?.logs?.[taskKey] || [];
    setLogs(savedLogs);
  }, [projectId, folderId, taskId, user.username, showTimeLogModal]);


  if (!task) return <p>Task not found</p>;


  const handleSave = () => {
    dispatch(updateTaskDescription({
      projectId,
      folderId,
      taskId,
      description,
    }));

    alert('Saved!');
  };

  const handleTimeLogSave = (log) => {
    const username = user.username;
    const timesheetData = JSON.parse(localStorage.getItem('timesheet')) || {};

    // Initialize structure
    if (!timesheetData[username]) timesheetData[username] = {};
    if (!timesheetData[username].logs) timesheetData[username].logs = {};

    const taskKey = `${projectId}_${folderId}_${taskId}`;
    if (!timesheetData[username].logs[taskKey]) {
        timesheetData[username].logs[taskKey] = [];
    }

    // Add Time Log Entry
    timesheetData[username].logs[taskKey].push(log);

    // --- Update Daily Duration for Timesheets ---
    const existing = timesheetData[username][log.date]?.duration || '00:00';

    const toMinutes = (timeStr) => {
        const [h, m] = timeStr.split(':').map(Number);
        return h * 60 + m;
    };

    const totalMinutes = toMinutes(existing) + toMinutes(log.duration);
    const h = String(Math.floor(totalMinutes / 60)).padStart(2, '0');
    const m = String(totalMinutes % 60).padStart(2, '0');

    // Store date-wise duration object
    timesheetData[username][log.date] = { duration: `${h}:${m}` };

    // Save to LocalStorage
    localStorage.setItem('timesheet', JSON.stringify(timesheetData));

    // Update UI
    setShowTimeLogModal(false);
    setLogs(timesheetData[username].logs[taskKey]);

    // Dispatch Timesheet Update Event (Optional, for live update)
    window.dispatchEvent(new Event('timesheetUpdated'));
};

  return (
    <div style={{ padding: 20 }}>
      <h2>Edit Task: {task.name}</h2>
      <textarea
        rows={10}
        cols={60}
        placeholder="Write notes, bullet points, or description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <button onClick={handleSave} style={{ marginTop: 10 }}>save</button>
      <br />
      <button
        style={{ marginTop: 10, width:'150px' }}
        onClick={() => navigate(`/time-log/${projectId}/${folderId}/${taskId}`)}
      >
        View Time Logs
      </button>
    </div>
  );
};

export default TaskDetail;
