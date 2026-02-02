// store/timesheetSlice.js
import { createSlice } from '@reduxjs/toolkit';

const timesheetSlice = createSlice({
  name: 'timesheet',
  initialState: {
    logs: {} // { username: { 'YYYY-MM-DD': [log1, log2, ...] } }
  },
  reducers: {
    addTimeLog: (state, action) => {
      const { log } = action.payload;
      const user = action.payload.user || 'defaultUser'; // Replace with actual user logic
      const date = log.date;

      if (!state.logs[user]) state.logs[user] = {};
      if (!state.logs[user][date]) state.logs[user][date] = [];

      state.logs[user][date].push(log);

      // Optional: Save to localStorage to persist
      localStorage.setItem('timesheetLogs', JSON.stringify(state.logs));
    },
    loadTimeLogsFromStorage: (state) => {
      const saved = JSON.parse(localStorage.getItem('timesheetLogs'));
      if (saved) state.logs = saved;
    },
  },
});

export const { addTimeLog, loadTimeLogsFromStorage } = timesheetSlice.actions;
export default timesheetSlice.reducer;
