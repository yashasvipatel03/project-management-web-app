import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProject, toggleProjectVisibility, addFolderToProject, addTaskToFolder, deleteProject, 
    deleteFolderFromProject, deleteTaskFromFolder, updateTaskDescription, setAllowedUsers  } from '../../store/projectSlice';
import UserSelector from './UserSelector'; 
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaFolder, FaFileAlt, FaEye, FaPlus } from 'react-icons/fa';



const AllProjectTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { projects } = useSelector((s) => s.project);
  const user = useSelector(state => state.auth.user);

  

const visibleProjects = projects.filter(project => {
  if (project.isPublic) return true;
  if (user && project.owner === user.username) return true;
  // if (user && project.allowedUsers?.includes(user.username)) return true;
  if (user && project.allowedUsers?.some(u => u.username === user.username)) return true;
  return false;
});


  const [openProjectId, setOpenProjectId] = useState(null);
  const [openFolderId, setOpenFolderId] = useState(null);
  const [folderInputs, setFolderInputs] = useState({});
  const [taskInputs, setTaskInputs] = useState({});

  const toggleProject = (id) => {
    setOpenProjectId(openProjectId === id ? null : id);
    setOpenFolderId(null);
  };

  const toggleFolder = (id) => {
    setOpenFolderId(openFolderId === id ? null : id);
  };

  const handleAddFolder = (projectId) => {
    if (!folderInputs[projectId]) return;
    dispatch(addFolderToProject({
      projectId,
      folder: { id: Date.now().toString(), name: folderInputs[projectId], tasks: [] }
    }));
    setFolderInputs({ ...folderInputs, [projectId]: '' });
  };

  const handleAddTask = (projectId, folderId) => {
    if (!taskInputs[folderId]) return;
    dispatch(addTaskToFolder({
      projectId,
      folderId,
      task: { id: Date.now().toString(), name: taskInputs[folderId], description: '' }
    }));
    setTaskInputs({ ...taskInputs, [folderId]: '' });
  };

  return (
    <div style={{ padding: 20 }}>


<style>
{`
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }

  th, td {
    padding: 12px 16px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    font-size: 16px;
  }

  th {
    background-color: #f7f7f7;
    font-weight: bold;
  }

  h2 {
    text-align: center;
    margin-bottom: 20px;
  }

//   button, input {
//     font-size: 14px;
//     padding: 6px 12px;
//     border-radius: 5px;
//     border: 1px solid #ccc;
//   }

  button {
    cursor: pointer;
    background-color: #007bff;
    color: white;
    border: none;
  }

  button:hover {
    background-color: #0056b3;
  }

  .icon-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
  }

  .icon-btn:hover {
    transform: scale(1.1);
    background:none
  }

  .trash-icon {
    color: red;
  }

  .folder-icon {
    color: black;
  }

  .task-container {
    background: #f9f9f9;
    padding: 10px;
    border-radius: 5px;
    margin-top: 10px;
  }
`}
</style>

      <h2 style={{ textAlign: 'center' }}>All Projects</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }} border={0}>
        <thead>
          <tr>
            <th style={{textAlign:"left"}}>Public/private</th>
            <th style={{textAlign:"center"}}>Project Name</th>
            <th style={{textAlign:"center"}}>Description</th>
            <th style={{textAlign:"center"}}>Open</th>
            <th style={{textAlign:"center"}}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {visibleProjects.map(project => (
            <React.Fragment key={project.id}>
              <tr>
                <td style={{ textAlign: 'left' }}>
  <strong>Owner:</strong> {project.owner} <br />
  <strong>Visibility:</strong>{" "}
  <span style={{ color: project.isPublic ? "green" : "gray" }}>
    {project.isPublic ? "Public" : "Private"}
  </span>
  <br />


{/* Only project owner or canManageUsers can see toggle and selector */}
{(user.username === project.owner ||
  project.allowedUsers?.some(u => u.username === user.username && u.canManageUsers)) ? (
  <>
    <button
      onClick={() =>
        dispatch(toggleProjectVisibility({ projectId: project.id }))
      }
    >
      {project.isPublic ? "Make Private" : "Make Public"}
    </button>

    {!project.isPublic && (
      <UserSelector
        projectId={project.id}
        selectedUsers={project.allowedUsers || []}
      />
    )}
  </>
) : (
  // If private project and current user is allowed but not manager, show list only
  !project.isPublic && (
    <div>
      <strong style={{marginTop:'5px'}}>Allowed Users:</strong>
      <ul style={{ paddingLeft: '20px', margin:'5px 0px' }}>
        {project.allowedUsers?.map(u => (
          <li key={u.username}>
            {u.username} {u.canManageUsers && "(manager)"}
          </li>
        ))}
      </ul>
    </div>
  )
)}




</td>

                <td style={{ verticalAlign: 'middle', textAlign:"center" }}>{project.name}</td>
                <td style={{ verticalAlign: 'middle', textAlign:"center" }}>{project.description}</td>
                <td style={{textAlign:"center", verticalAlign: 'middle'}}>
                  <button className="icon-btn" onClick={() => toggleProject(project.id)}>
                    <FaFolder className="folder-icon" />
                  </button>

                </td>
                <td style={{textAlign:"center", verticalAlign: 'middle'}}>
                  {/* <FaTrash color="red" style={{ cursor: 'pointer' }} onClick={() => dispatch(deleteProject(project.id))} /> */}
                    <button className="icon-btn" onClick={() => dispatch(deleteProject(project.id))}>
                       <FaTrash className="trash-icon" />
                  </button>
                </td>
              </tr>

              {/* FOLDERS TABLE */}
              {openProjectId === project.id && (
                <>
                  <tr>
                    <th></th>
                    <th colSpan={3}>
                      <h4>Folders in {project.name}</h4>
                      <table width="100%" border={0}>
                        <thead>
                          <tr>
                            <th style={{textAlign:"center"}}>Folder Name</th>
                            <th style={{textAlign:"center"}}>View Tasks</th>
                            <th style={{textAlign:"center"}}>Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {project.folders?.map(folder => (
                            <React.Fragment key={folder.id}>
                              <tr>
                                <td>{folder.name}</td>
                                <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                                  {/* <FaFileAlt style={{ cursor: 'pointer' }} onClick={() => toggleFolder(folder.id)} /> */}
                                  <button className="icon-btn" onClick={() => toggleFolder(folder.id)}>
                                    <FaFileAlt className="folder-icon" />
                                  </button>
                                </td>
                                <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                                  {/* <FaTrash color="red" style={{ cursor: 'pointer' }}
                                    onClick={() =>
                                      dispatch(deleteFolderFromProject({ projectId: project.id, folderId: folder.id }))
                                    }
                                  /> */}
                                  <button className="icon-btn" onClick={() => dispatch(deleteFolderFromProject({ projectId: project.id, folderId: folder.id }))}>
                                       <FaTrash className="trash-icon" />
                                  </button>
                                </td>
                              </tr>

                              {/* TASKS TABLE */}
                              {openFolderId === folder.id && (
                                <>
                                  <tr>
                                    <th></th>
                                    <td colSpan={2}>
                                      <h5>Tasks in {folder.name}</h5>
                                      <table width="100%" border={0}>
                                        <thead>
                                          <tr>
                                            <th>Task Name</th>
                                            <th style={{textAlign:"center"}}>Details</th>
                                            <th style={{textAlign:"center"}}>Delete</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {folder.tasks?.map(task => (
                                            <tr key={task.id}>
                                              <td>{task.name}</td>
                                              <td>
                                                {/* <FaEye style={{ cursor: 'pointer' }}
                                                  onClick={() => navigate(`/project/${project.id}/folder/${folder.id}/task/${task.id}`)} /> */}
                                                  <button className="icon-btn" onClick={() => navigate(`/project/${project.id}/folder/${folder.id}/task/${task.id}`)}>
                                                    <FaEye className="folder-icon" />
                                                  </button>
                                              </td>
                                              <td>
                                                {/* <FaTrash color="red" style={{ cursor: 'pointer' }}
                                                  onClick={() =>
                                                    dispatch(deleteTaskFromFolder({
                                                      projectId: project.id,
                                                      folderId: folder.id,
                                                      taskId: task.id
                                                    }))
                                                  }
                                                /> */}
                                                <button className="icon-btn" onClick={() => dispatch(deleteTaskFromFolder({ projectId: project.id, folderId: folder.id, taskId: task.id }))}>
                                                     <FaTrash className="trash-icon" />
                                                </button>
                                              </td>
                                            </tr>
                                          ))}
                                          <tr>
                                            <td>
                                              <input
                                                value={taskInputs[folder.id] || ''}
                                                onChange={(e) =>
                                                  setTaskInputs({ ...taskInputs, [folder.id]: e.target.value })
                                                }
                                                placeholder="New Task"
                                              />
                                            </td>
                                            <td colSpan={2}>
                                              <button onClick={() => handleAddTask(project.id, folder.id)}>
                                                <FaPlus /> Add Task
                                              </button>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </>
                              )}
                            </React.Fragment>
                          ))}

                          <tr>
                            <td colSpan={3}>
                              <input
                                value={folderInputs[project.id] || ''}
                                onChange={(e) =>
                                  setFolderInputs({ ...folderInputs, [project.id]: e.target.value })
                                }
                                placeholder="New Folder"
                              />
                              <button onClick={() => handleAddFolder(project.id)}>
                                <FaPlus /> Add Folder
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </th>
                  </tr>
                </>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <button style={{width:"250px", marginTop:"20px"}} onClick={() => navigate('/create-project')}>+ Create Project</button>
    </div>
  );
};

export default AllProjectTable;
