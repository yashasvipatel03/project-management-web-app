import React, { useState, useEffect } from 'react';
import './TimeLogModal.css';


const TimeLogModal = ({ taskName, onSave, onClose }) => {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [duration, setDuration] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (startTime && endTime) {
            const start = new Date(`1970-01-01T${startTime}:00`);
            const end = new Date(`1970-01-01T${endTime}:00`);

            let diff = (end - start) / 1000 / 60; // in minutes
            if (diff < 0) diff += 24 * 60; // handle next day

            const hours = Math.floor(diff / 60);
            const minutes = diff % 60;

            const formattedDuration = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
            setDuration(formattedDuration);
        } else {
            setDuration('');
        }
    }, [startTime, endTime]);

    const handleSave = () => {
        const log = { taskName, date, startTime, endTime, duration, description };
        onSave(log);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">Add Time Log</div>

                <div className="form-row">
                    <label>Task Name:-</label>
                    <input type="text" value={taskName} disabled />
                </div>

                <div className="form-row">
                    <label>Date:-</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>

                <div className="form-row">
                    <label>Time:-</label>
                    <div className="time-input-group">
                        <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                        <span>to</span>
                        <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                    </div>
                </div>

                <div className="form-row">
                    <label>Duration:-</label>
                    <input type="text" value={duration} disabled />
                </div>

                <div className="form-row">
                    <label>Description:-</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>

                <div className="modal-actions">
                    <button onClick={handleSave}>Save</button>
                    <button className="cancel-btn" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default TimeLogModal;
