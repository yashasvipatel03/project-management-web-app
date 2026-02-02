import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProject } from '../../store/projectSlice';
import { FaEdit, FaTrash, FaFolder, FaFileAlt, FaEye, FaSave  } from 'react-icons/fa';


const ProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const project = useSelector((s) =>
    s.project.projects.find((x) => x.id === projectId)
  );

  if (!project) return <p>Project not found</p>;

  return (
    <div>
      <h2>{project.name}</h2>
      <p>{project.description}</p>
      <button style={{background:"none"}} onClick={() => navigate(`/project/${projectId}/folders`)}><FaFolder color="black"/> View Folders</button>
      <button style={{background:"none"}} onClick={() => {
        if (window.confirm('Delete this project?')) {
          dispatch(deleteProject(projectId));
          navigate('/projects');
        }
      }}><FaTrash color="red"/> Delete</button>
    </div>
  );
};

export default ProjectDetail;
