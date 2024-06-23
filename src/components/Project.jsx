import './Project.css';

export default function Project({ project, selectProject, active }) {
  function handleClick() {
    selectProject(project.id);
  }

  const projectClass = `project ${active ? 'active' : ''}`;

  return (
    <li onClick={handleClick} className={projectClass}>
      <p className="project-title">{project.title}</p>
    </li>
  );
}
