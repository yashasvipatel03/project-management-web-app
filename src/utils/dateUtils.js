// src/utils/dateUtils.js
export const toISODate = (dateInput) => {
    const date = new Date(dateInput);
    return date.toISOString().split('T')[0];  // YYYY-MM-DD
};

export const formatDisplayDate = (dateInput) => {
    const date = new Date(dateInput);
    return date.toLocaleDateString('en-GB', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
};
