import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
// import Profile from './components/Profile';
// import { AuthContext } from './context/AuthContext';
// // Manages authentication (login, logout, user data)
// // Makes auth data available to all components
import EditProfile from './components/EditProfile';
import ChangePassword from './components/ChangePassword';
import ProfileDetails from './components/profile/ProfileDetails';
import { useSelector } from 'react-redux';
import AdminDashboard from './components/AdminDashboard';
import UserDetail from './components/UserDetail';
import EditUser from './components/EditUser';
import ProjectList from './components/project/ProjectList';
import CreateProject from './components/project/CreateProject';
import ProjectDetail from './components/project/ProjectDetail';
import FolderList from './components/project/FolderList';
import FolderDetail from './components/project/FolderDetail';
import TaskDetail from './components/project/TaskDetail'
import AllProjectTable from './components/project/AllProjectTable';
// import ProjectTable from './components/project/ProjectTable';
// import VisibilitySettings from './components/project/VisibilitySettings';
import TimesheetDashboard from './components/timesheet/TimesheetDashboard';
import MonthlyTimesheet from './components/timesheet/MonthlyTimesheet';
import TimeLogPage from './components/project/TimeLogPage';






function App() {
  // const { user } = useContext(AuthContext);

  //using redux
  const user = useSelector((state) => state.auth.user);

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/profile" /> : <Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      {/* <Route path="/profile" element={user ? <Profile /> : <Navigate to="/" />} /> */}
      <Route path="/profile" element={user ? <ProfileDetails /> : <Navigate to="/" />} />
      <Route path="/edit-profile" element={user ? <EditProfile /> : <Navigate to="/" />} />
      <Route path="/change-password" element={user ? <ChangePassword /> : <Navigate to="/" />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/user/:username" element={<UserDetail />} />
      <Route path="/admin" element={user?.username === "admin" ? <AdminDashboard /> : <Navigate to="/" />} />
      <Route path="/admin/edit/:username" element={<EditUser />} />
      {/* <Route path="/projects" element={<ProjectList />} />
      <Route path="/create-project" element={<CreateProject />} />
      <Route path="/project/:projectId" element={<ProjectDetail />} /> */}
              {/* <Route path="/profile" element={<ProfileDetails />} />
        <Route path="/my-projects" element={<ProjectList />} /> */}
        <Route path="/" element={<Navigate to="/projects" />} />
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/project/:projectId" element={<ProjectDetail />} />
        <Route path="/project/:projectId/folders" element={<FolderList />} />
        <Route path="/project/:projectId/folder/:folderId" element={<FolderDetail />} />
        <Route path="/project/:projectId/folder/:folderId/task/:taskId" element={<TaskDetail />} />
        <Route path="/all" element={<AllProjectTable />} />
        {/* <Route path="/all" element={<ProjectTable />} /> */}
        {/* <Route path="/project/:projectId/visibility-settings" element={<VisibilitySettings />} /> */}
        <Route path="/timesheet" element={<TimesheetDashboard />} />
        <Route path="/monthly-timesheet" element={<MonthlyTimesheet />} />
        <Route path="/time-log/:projectId/:folderId/:taskId" element={<TimeLogPage />} />


    </Routes>
  );
}

export default App;
