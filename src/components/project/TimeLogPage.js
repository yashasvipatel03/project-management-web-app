
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TimeLogModal from './TimeLogModal';
import { useSelector } from 'react-redux';
import { FaTrash } from 'react-icons/fa';


const TimeLogPage = () => {
    const { projectId, folderId, taskId } = useParams();
    const user = useSelector((state) => state.auth.user);
    const username = user?.username;

    const projects = useSelector((s) => s.project.projects);
    const project = projects.find((p) => p.id === projectId);
    const folder = project?.folders.find((f) => f.id === folderId);
    const task = folder?.tasks.find((t) => t.id === taskId);

    const [logs, setLogs] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const timesheetData = JSON.parse(localStorage.getItem('timesheet')) || {};
        const taskKey = `${projectId}_${folderId}_${taskId}`;
        const savedLogs = timesheetData[username]?.logs?.[taskKey] || [];
        setLogs(savedLogs);
    }, [projectId, folderId, taskId, username, showModal]);

    const handleSaveLog = (log) => {
    const timesheetData = JSON.parse(localStorage.getItem('timesheet')) || {};
    const taskKey = `${projectId}_${folderId}_${taskId}`;

    if (!timesheetData[username]) timesheetData[username] = {};
    if (!timesheetData[username].logs) timesheetData[username].logs = {};
    if (!timesheetData[username].logs[taskKey]) timesheetData[username].logs[taskKey] = [];

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

    timesheetData[username][log.date] = { duration: `${h}:${m}` };

    // Save to LocalStorage
    localStorage.setItem('timesheet', JSON.stringify(timesheetData));
    setShowModal(false);
    setLogs(timesheetData[username].logs[taskKey]);

    // Dispatch Timesheet Update Event (Optional)
    window.dispatchEvent(new Event('timesheetUpdated'));
};


    const handleDeleteLog = (idx) => {
        const timesheetData = JSON.parse(localStorage.getItem('timesheet')) || {};
        const taskKey = `${projectId}_${folderId}_${taskId}`;
        timesheetData[username].logs[taskKey].splice(idx, 1);
        localStorage.setItem('timesheet', JSON.stringify(timesheetData));
        setLogs([...timesheetData[username].logs[taskKey]]);
    };

    if (!task) return <p>Task not found</p>;

    return (
        <div style={{ padding: 20 }}>
            <h2>Time Logs for: {task.name}</h2>

            <button onClick={() => setShowModal(true)}>Add Time Log</button>

            {showModal && (
                <TimeLogModal
                    taskName={task.name}
                    onSave={handleSaveLog}
                    onClose={() => setShowModal(false)}
                />
            )}

            <table style={{ marginTop: '20px', borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Start – End</th>
                        <th>Duration</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log, idx) => (
                        <tr key={idx}>
                            <td>{log.date}</td>
                            <td>{log.startTime} – {log.endTime}</td>
                            <td>{log.duration}</td>
                            <td>{log.description}</td>
                            <td>
                                <FaTrash
                                    style={{ color: 'red', cursor: 'pointer' }}
                                    onClick={() => {
                                        if (window.confirm("Are you sure you want to delete this log?")) {
                                            handleDeleteLog(idx);
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TimeLogPage;
