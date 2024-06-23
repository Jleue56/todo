import { useRef } from 'react';
import Project from './Project';
import NewProjectModal from './NewProjectModal';
import './ProjectList.css';

export default function ProjectList({
  projects,
  createNewProject,
  selectProject,
  activeProject,
}) {
  const dialogRef = useRef();

  function openDialog() {
    dialogRef.current.open();
  }

  return (
    <nav className="project-list">
      <NewProjectModal createNewProject={createNewProject} ref={dialogRef} />
      <ul className="project-list-ul">
        <button onClick={openDialog} className="project-list-button">
          <p>New Project</p>
          <i className="fa-solid fa-plus"></i>
        </button>
        {projects.map((project) => (
          <Project
            project={project}
            selectProject={selectProject}
            key={project.id}
            active={project.id === activeProject}
          />
        ))}
      </ul>
    </nav>
  );
}
