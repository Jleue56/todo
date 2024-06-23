import { useState } from 'react';
import ProjectList from './components/ProjectList';
import ProjectView from './components/ProjectView';

function App() {
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [projects, setProjects] = useState([]);

  function createNewProject(newProject) {
    setProjects((prevProjects) => [...prevProjects, newProject]);
  }
  function addTask(projectId, newTask) {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId
          ? { ...project, tasks: [...project.tasks, newTask] }
          : project
      )
    );
  }

  function deleteTask(projectId, taskId) {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              tasks: project.tasks.filter((task) => task.id !== taskId),
            }
          : project
      )
    );
  }

  const activeProject = projects.find(
    (project) => project.id === activeProjectId
  );

  return (
    <div className="app">
      <ProjectList
        projects={projects}
        createNewProject={createNewProject}
        selectProject={setActiveProjectId}
        activeProject={activeProjectId}
      />
      <ProjectView
        project={activeProject}
        addTask={addTask}
        deleteTask={deleteTask}
      />
      {/* <h1 className="my-8 text-center text-5xl font-bold">Hello World :)</h1> */}
    </div>
  );
}

export default App;
