import React, { useEffect, useState } from 'react';
import TimesheetRow from './TimesheetRow';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Calendar from './Calendar';
import TimeLogModal from '../project/TimeLogModal';



const TimesheetDashboard = () => {
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();

    const [timesheetData, setTimesheetData] = useState({});
    const [weekDates, setWeekDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const [showTimeLogModal, setShowTimeLogModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState('');
    const [refreshFlag, setRefreshFlag] = useState(false);


    // Util: Get week from Monday to Sunday for a selected date
    const getWeekFromMonday = (date) => {
        const start = new Date(date);
        const day = start.getDay(); // Sunday = 0, Monday = 1, ...
        const diff = (day === 0 ? -6 : 1 - day); // shift Sunday to end
        start.setDate(start.getDate() + diff); // go back to Monday

        const week = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date(start);
            d.setDate(start.getDate() + i);
            week.push(d);
        }
        return week;
    };

    const isToday = (date) => {
        const today = new Date().toDateString();
        return date instanceof Date && date.toDateString() === today;
    };

    const formatDate = (date) => {
        if (!date) return '';
        return new Date(date).toLocaleDateString('en-CA'); // YYYY-MM-DD format
    };

    useEffect(() => {
        if (!user) {
            navigate('/');
            return;
        }
        const week = getWeekFromMonday(selectedDate);
        setWeekDates(week);
    }, [user, selectedDate, navigate]);

    useEffect(() => {
        if (!user) return;

        const week = getWeekFromMonday(selectedDate);
        const data = JSON.parse(localStorage.getItem('timesheet')) || {};
        const username = user.username;
        const userLog = data[username] || {};

        week.forEach((dateObj) => {
            const dateStr = dateObj.toISOString().split('T')[0];
            const day = new Date(dateStr).getDay();
            if (!(dateStr in userLog)) {
                if (day === 0 || day === 6) {
                    userLog[dateStr] = '-';
                } else {
                    userLog[dateStr] = ''; // Empty for manual entry
                }
            }
        });

        data[username] = userLog;

        localStorage.setItem('timesheet', JSON.stringify(data));
        setTimesheetData(data);
        setWeekDates(week);
    }, [selectedDate, user]);

    useEffect(() => {
        const handleStorageChange = () => {
            const data = JSON.parse(localStorage.getItem('timesheet')) || {};
            setTimesheetData(data);
            setRefreshFlag((prev) => !prev);  // optional, in case component needs to re-render
        };

        window.addEventListener('timesheetUpdated', handleStorageChange);

        return () => {
            window.removeEventListener('timesheetUpdated', handleStorageChange);
        };
    }, []);



    const handleTimeLogSave = (log) => {
        const data = JSON.parse(localStorage.getItem('timesheet')) || {};
        const username = user.username;

        if (!data[username]) {
            data[username] = {};
        }

        const existingDuration = data[username][log.date] || '00:00';

        const totalMinutes = (timeStr) => {
            const [h, m] = timeStr.split(':').map(Number);
            return h * 60 + m;
        };

        const newTotalMinutes = totalMinutes(existingDuration) + totalMinutes(log.duration);
        const newHours = Math.floor(newTotalMinutes / 60).toString().padStart(2, '0');
        const newMinutes = (newTotalMinutes % 60).toString().padStart(2, '0');
        const newDuration = `${newHours}:${newMinutes}`;

        data[username][log.date] = newDuration;

        localStorage.setItem('timesheet', JSON.stringify(data));

        setShowTimeLogModal(false);

        // Dispatch Event to Notify Dashboard
        window.dispatchEvent(new Event("timesheetUpdated"));
    };

    if (!user) {
        return null; // Loader or redirect fallback
    }

    return (
        <div className='timesheet-container' style={{ padding: '20px', maxWidth: '1300px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Timesheet Dashboard</h2>
            <button style={{ width: '200px' }} onClick={() => navigate('/monthly-timesheet')}>
                View Monthly Timesheet
            </button>

            <div style={{ marginBottom: '30px', textAlign: 'center' }}>
                <h3 style={{ marginBottom: '10px' }}>Select Week</h3>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                            width: '250px'
                        }}
                    >
                        {weekDates.length === 7 && (
                            <div>{`${formatDate(weekDates[0])} to ${formatDate(weekDates[6])}`}</div>
                        )}
                    </button>

                    {showCalendar && (
                        <div className="calendar-overlay">
                            <Calendar
                                selectedDate={selectedDate}
                                onSelectDate={(date) => {
                                    setSelectedDate(date);
                                    setWeekDates(getWeekFromMonday(date));
                                }}
                                onClose={() => setShowCalendar(false)}
                            />
                        </div>
                    )}
                </div>
            </div>

            <table className="timesheet-table" style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontFamily: 'Arial, sans-serif',
                tableLayout: 'fixed'
            }}>
                <thead>
                    <tr style={{ backgroundColor: '#f4f4f4' }}>
                        <th style={{
                            padding: '10px',
                            border: '1px solid #ccc',
                            fontSize: '14px',
                            textAlign: 'center'
                        }}>User</th>
                        {weekDates.map((date, idx) => (
                            <th
                                key={idx}
                                style={{
                                    backgroundColor: isToday(date) ? '#d3e5ff' : 'inherit',
                                    padding: '10px',
                                    border: '1px solid #ccc',
                                    fontSize: '14px',
                                    textAlign: 'center'
                                }}
                            >
                                {date.toLocaleDateString("en-GB", {
                                    weekday: "short",
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric"
                                })}
                            </th>
                        ))}
                        <th style={{
                            padding: '10px',
                            border: '1px solid #ccc',
                            fontSize: '14px',
                            textAlign: 'center'
                        }}>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <TimesheetRow
                        username={user.username}
                        weekDates={weekDates}
                        log={timesheetData[user.username] || {}}
                    />
                </tbody>
            </table>
        </div>
    );
};

export default TimesheetDashboard;
