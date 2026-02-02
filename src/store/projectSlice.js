// src/store/projectSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projects: JSON.parse(localStorage.getItem('projects')) || [],
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    addProject: (state, action) => {
      state.projects.push(action.payload);
      localStorage.setItem('projects', JSON.stringify(state.projects));
    },
   
toggleProjectVisibility: (state, action) => {
  const { projectId } = action.payload;
  const project = state.projects.find(p => p.id === projectId);
  if (project) {
    project.isPublic = !project.isPublic;
    if (project.isPublic) {
      project.allowedUsers = []; // Clear all roles
    }
    localStorage.setItem('projects', JSON.stringify(state.projects));
  }
},




    addFolderToProject: (state, action) => {
      const { projectId, folder } = action.payload;
      const project = state.projects.find(p => p.id === projectId);
      if (project) {
        project.folders.push(folder);
        localStorage.setItem('projects', JSON.stringify(state.projects));
      }
    },
    addTaskToFolder: (state, action) => {
      const { projectId, folderId, task } = action.payload;
      const project = state.projects.find(p => p.id === projectId);
      if (project) {
        const folder = project.folders.find(f => f.id === folderId);
        if (folder) {
          folder.tasks.push({ ...task, description: '' });
          localStorage.setItem('projects', JSON.stringify(state.projects));
        }
      }
    },


  deleteProject: (state, action) => {
    state.projects = state.projects.filter(p => p.id !== action.payload);
    localStorage.setItem('projects', JSON.stringify(state.projects));
  },

  deleteFolderFromProject: (state, action) => {
    const { projectId, folderId } = action.payload;
    const project = state.projects.find(p => p.id === projectId);
    if (project) {
      project.folders = project.folders.filter(f => f.id !== folderId);
      localStorage.setItem('projects', JSON.stringify(state.projects));
    }
  },

  deleteTaskFromFolder: (state, action) => {
    const { projectId, folderId, taskId } = action.payload;
    const project = state.projects.find(p => p.id === projectId);
    if (project) {
      const folder = project.folders.find(f => f.id === folderId);
      if (folder) {
        folder.tasks = folder.tasks.filter(t => t.id !== taskId);
        localStorage.setItem('projects', JSON.stringify(state.projects));
      }
    }
   },
   updateTaskDescription: (state, action) => {
  const { projectId, folderId, taskId, description } = action.payload;
  const project = state.projects.find(p => p.id === projectId);
  if (project) {
    const folder = project.folders.find(f => f.id === folderId);
    if (folder) {
      const task = folder.tasks.find(t => t.id === taskId);
      if (task) {
        task.description = description;
      }
    }
  }

  localStorage.setItem('projects', JSON.stringify(state.projects));
},

setAllowedUsers: (state, action) => {
  const { projectId, users, currentUser } = action.payload;
  const project = state.projects.find(p => p.id === projectId);

  if (project && !project.isPublic) {
    // Only the project owner or users with canManageUsers: true can update allowedUsers
    const isOwner = project.owner === currentUser;
    const isManager = project.allowedUsers?.some(
      u => u.username === currentUser && u.canManageUsers
    );

    if (isOwner || isManager) {
      project.allowedUsers = users;
      localStorage.setItem('projects', JSON.stringify(state.projects));
    } else {
      console.warn("Unauthorized to set allowed users");
    }
  }
},


  }
});

export const { addProject, toggleProjectVisibility, addFolderToProject, addTaskToFolder, deleteProject, 
    deleteFolderFromProject, deleteTaskFromFolder, updateTaskDescription, setAllowedUsers  } = projectSlice.actions;
export default projectSlice.reducer;
