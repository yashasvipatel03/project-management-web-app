import React, { useState, useEffect } from 'react';
import './Calendar.css';

const Calendar = ({ onSelectDate, selectedDate, onClose }) => {
    const today = new Date();
    const initialMonth = selectedDate ? selectedDate.getMonth() : today.getMonth();
    const initialYear = selectedDate ? selectedDate.getFullYear() : today.getFullYear();

    const [currentMonth, setCurrentMonth] = useState(initialMonth);
    const [currentYear, setCurrentYear] = useState(initialYear);

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const getDaysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };


    // sunday thi start thase
    // const getFirstDayOfMonth = (month, year) => {
    //     return new Date(year, month, 1).getDay();
    // };

    //monday thi start thase
    const getFirstDayOfMonth = (month, year) => {
        const day = new Date(year, month, 1).getDay();
        return (day + 6) % 7; // Shift Sunday (0) to be 6
    };


    const handlePrevMonth = () => {
        setCurrentMonth(prev => {
            if (prev === 0) {
                setCurrentYear(year => year - 1);
                return 11;
            }
            return prev - 1;
        });
    };

    const handleNextMonth = () => {
        setCurrentMonth(prev => {
            if (prev === 11) {
                setCurrentYear(year => year + 1);
                return 0;
            }
            return prev + 1;
        });
    };

    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const todayDate = today.getDate();

    const isCurrentMonth = currentMonth === today.getMonth() && currentYear === today.getFullYear();

    const dates = [];
    for (let i = 0; i < firstDay; i++) {
        dates.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        dates.push(i);
    }

    return (
        <div className="calendar-modal">
            <div className="calendar-header">
                <button className="nav-button" onClick={handlePrevMonth}>‹</button>
                <h3 className="month-title">{monthNames[currentMonth]} {currentYear}</h3>

                <button className="nav-button" onClick={handleNextMonth}>›</button>

                <div style={{display:'flex', flexDirection:'column', gap:'5px'}}>

                    {/* Month Dropdown */}
                    <select
                        value={currentMonth}
                        onChange={(e) => setCurrentMonth(parseInt(e.target.value))}
                        className="month-dropdown"
                    >
                        {monthNames.map((month, index) => (
                            <option key={month} value={index}>
                                {month}
                            </option>
                        ))}
                    </select>

                    <select
                        value={currentYear}
                        onChange={(e) => setCurrentYear(parseInt(e.target.value))}
                        className="year-dropdown"
                    >
                        {Array.from({ length: 50 }, (_, i) => {
                            const year = 2000 + i;
                            return (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            );
                        })}
                    </select>
                </div>
            </div>

            <div className="calendar-grid">
                {/* sunday thi start thase */}
                {/* {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div className="calendar-day" key={day}>{day}</div>
                ))} */}


                {/* monday this start thase */}
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                    <div className="calendar-day" key={day}>{day}</div>
                ))}


                {dates.map((date, idx) => {
                    const isToday = isCurrentMonth && date === todayDate;

                    return (
                        <div
                            key={idx}
                            className={`calendar-date ${isToday ? 'today' : ''}`}
                            onClick={() => {
                                if (!date) return;
                                const selected = new Date(currentYear, currentMonth, date);
                                onSelectDate(selected);  // Send to parent
                                onClose();               // Close calendar
                            }}
                        >
                            {date || ''}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Calendar;
