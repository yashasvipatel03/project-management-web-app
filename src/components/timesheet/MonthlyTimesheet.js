
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TimesheetRow from './TimesheetRow';
import Calendar from './Calendar'; // Adjust path if needed
import './MonthlyTimesheet.css'; // Style accordingly


const getAllDatesInMonth = (year, month) => {
    const days = [];
    const date = new Date(year, month, 1);
    while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return days;
};

const isToday = (date) => {
    const today = new Date();
    return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    );
};

const formatDate = (date) => {
    return date.toLocaleDateString('en-GB', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
};

const MonthlyTimesheet = () => {
    const navigate = useNavigate();
    // const timesheet = JSON.parse(localStorage.getItem('timesheet')) || {};
    const [timesheetData, setTimesheetData] = useState({});
    const [refreshFlag, setRefreshFlag] = useState(false);


    useEffect(() => {
        const handleStorageChange = () => {
            setRefreshFlag((prev) => !prev);
        };

        window.addEventListener('timesheetUpdated', handleStorageChange);

        return () => {
            window.removeEventListener('timesheetUpdated', handleStorageChange);
        };
    }, []);


    const users = useSelector((state) => state.auth?.allUsers || []);
    const loggedInUser = useSelector((state) => state.auth.user);

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);


    const selectedMonth = selectedDate.getMonth();
    const selectedYear = selectedDate.getFullYear();

    const allDatesInMonth = getAllDatesInMonth(selectedYear, selectedMonth);


    useEffect(() => {
        // Initial Load
        const data = JSON.parse(localStorage.getItem('timesheet')) || {};
        setTimesheetData(data);

        // Event Listener for Timesheet Updates
        const refreshTimesheet = () => {
            const updatedData = JSON.parse(localStorage.getItem('timesheet')) || {};
            setTimesheetData(updatedData);
        };

        window.addEventListener("timesheetUpdated", refreshTimesheet);

        return () => {
            window.removeEventListener("timesheetUpdated", refreshTimesheet);
        };
    }, []);

    if (!loggedInUser) {
        return null; // Optional: Add a loader or redirect if not logged in
    }

    return (
        <div className="monthly-timesheet-container">
            <h2>Monthly Timesheet</h2>

            <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                <button
                    onClick={() => setShowCalendar(true)}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#f4f4f4',
                        color: 'black',
                        border: '1px solid black',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        width: '170px',
                    }}
                >
                    {selectedDate.toLocaleDateString('en-GB', {
                        month: 'long',
                        year: 'numeric',
                    })}
                </button>

                {showCalendar && (
                    <div className="calendar-overlay">
                        <Calendar
                            selectedDate={selectedDate}
                            onSelectDate={(date) => {
                                setSelectedDate(date);
                                setShowCalendar(false);
                            }}
                            onClose={() => setShowCalendar(false)}
                        />
                    </div>
                )}
            </div>

            <table className="timesheet-table">
                <thead>
                    <tr style={{ backgroundColor: '#f4f4f4' }}>
                        <th style={{
                            fontSize: '12px',
                            padding: '4px',
                            border: '1px solid #ccc',
                            textAlign: 'center',
                        }}>User</th>
                        {allDatesInMonth.map((date, idx) => (
                            <th
                                key={idx}
                                style={{
                                    backgroundColor: isToday(date) ? '#d3e5ff' : 'inherit',
                                    fontSize: '12px',
                                    padding: '4px',
                                    border: '1px solid #ccc',
                                    textAlign: 'center',
                                }}
                            >
                                {date.toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "short",
                                    weekday: "short"
                                })}
                            </th>
                        ))}
                        <th style={{
                            fontSize: '12px',
                            padding: '4px',
                            border: '1px solid #ccc',
                            textAlign: 'center',
                        }}>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <TimesheetRow
                        key={loggedInUser.username}
                        username={loggedInUser.username}
                        weekDates={allDatesInMonth}
                        log={timesheetData[loggedInUser.username] || {}}
                    />

                </tbody>
            </table>
        </div>
    );
};

export default MonthlyTimesheet;
