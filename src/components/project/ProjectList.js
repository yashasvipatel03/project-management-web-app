import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProject } from '../../store/projectSlice';
import { FaEdit, FaTrash, FaFolder, FaFileAlt, FaEye, FaSave } from 'react-icons/fa';


const ProjectList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projects } = useSelector((s) => s.project);
  const user = useSelector((s) => s.auth.user);
  const visibleProjects = projects.filter(p =>
    p.isPublic ||
    p.owner === user.username ||
    (p.allowedUsers || []).some(u => u.username === user.username)
  );



  return (
    <div>
      <h2>All Projects</h2>
      <table>
        <thead>
          <tr>
            {/* <th>Public/private</th> */}
            <th>Project Name</th>
            <th>Description</th>
            <th>Open</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr key={p.id}>
        
              <td>{p.name}</td>
              <td>{p.description}</td>
              <td>
                {/* <button onClick={() => navigate(`/project/${p.id}`)}><FaFolder /></button> */}
                <button style={{ background: "none" }} onClick={() => navigate(`/project/${p.id}/folders`)}><FaFolder color="black" /></button>

              </td>
              <td>
                <button style={{ background: "none" }} onClick={() => {
                  if (window.confirm('Delete this project?')) dispatch(deleteProject(p.id));
                }}><FaTrash color="red" /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button style={{ width: "250px" }} onClick={() => navigate('/create-project')}>+ Create Project</button>
    </div>
  );
};

export default ProjectList;

