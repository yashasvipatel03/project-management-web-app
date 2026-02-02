import React, { useState, useEffect } from 'react';


const TimesheetRow = ({ username, weekDates, log }) => {
    const [editableLog, setEditableLog] = useState(log);


    useEffect(() => {
        setEditableLog((prevLog) => {
            const newLog = { ...log };
            weekDates.forEach(date => {
                const dateKey = date.toISOString().split('T')[0];
                const day = date.getDay();
                if (!(dateKey in newLog)) {
                    newLog[dateKey] = (day === 0 || day === 6) ? '-' : '';
                }
            });
            return newLog;
        });
    }, [log, weekDates]);

    const handleTimeChange = (date, newTime) => {
        const updatedLog = { ...editableLog, [date]: newTime };
        setEditableLog(updatedLog);
        saveToLocalStorage(username, updatedLog);
    };

    const saveToLocalStorage = (username, updatedLog) => {
        const existing = JSON.parse(localStorage.getItem('timesheet')) || {};
        existing[username] = updatedLog;
        localStorage.setItem('timesheet', JSON.stringify(existing));
    };

    const getTotalMinutes = () => {
        return weekDates.reduce((total, date) => {

            const cellData = editableLog[date];
            const time = typeof cellData === 'string' ? cellData : cellData?.duration;
            if (typeof time !== 'string' || !time.includes(':')) {
                console.warn('Invalid time format detected:', time);
                return total;
            }
            const [h, m] = time.split(':').map(Number);

            return total + (isNaN(h) ? 0 : h * 60) + (isNaN(m) ? 0 : m);
        }, 0);
    };


    const formatMinutes = (min) => {
        const h = Math.floor(min / 60);
        const m = min % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
    };

    return (
        <tr>
            <td style={{ textAlign: 'center', border: '1px solid #ccc' }}>{username}</td>
            {weekDates.map((date) => {
                // const value = editableLog[date] || '';
                const cellData = editableLog[date];
                const value = typeof cellData === 'string' ? cellData : (cellData?.duration || '');

                const day = new Date(date).getDay();
                const isWeekend = value === '-' || day === 0 || day === 6;

                return (
                    <td key={date} style={{ textAlign: 'center', border: '1px solid #ccc', padding: '0px' }}>
                        
                        {isWeekend ? (
                            <span style={{ padding: '6px 40px' }}>–</span>
                        ) : (
                            <input
                                type="text"  // <-- Change from 'time' to 'text'
                                style={{
                                    width: '90%',
                                    padding: '6px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    textAlign: 'center',
                                    marginBottom: '0px',
                                    width: '100px',
                                    margin:'0px 3px'
                                }}
                                value={value}
                                onChange={(e) => handleTimeChange(date, e.target.value)}
                                placeholder="HH:MM"
                            />
                        )}

                    </td>
                );
            })}
            <td style={{ textAlign: 'center', border: '1px solid #ccc' }}>
                <b>{formatMinutes(getTotalMinutes())}</b>
            </td>
        </tr>
    );
};

export default TimesheetRow;
