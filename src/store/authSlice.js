import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  allUsers: JSON.parse(localStorage.getItem("allUsers")) || [],
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
    updateUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
      localStorage.setItem('allUsers', JSON.stringify(action.payload));
    },
  },
});

export const { login, logout, updateUser, setAllUsers } = authSlice.actions;
export default authSlice.reducer;









