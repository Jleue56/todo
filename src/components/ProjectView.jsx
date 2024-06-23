import Task from './Task';
import NewTaskModal from './NewTaskModal';
import { useRef } from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import './ProjectView.css';

export default function ProjectView({ project, addTask, deleteTask }) {
  const dialogRef = useRef();

  function handleCreateTask(newTask) {
    addTask(project.id, newTask);
  }

  function handleDeleteTask(taskId) {
    deleteTask(project.id, taskId);
  }

  function openDialog() {
    dialogRef.current.open();
  }

  if (project != null) {
    return (
      <div className="project-view">
        <NewTaskModal createNewTask={handleCreateTask} ref={dialogRef} />
        <div className="project-view-top-section">
          <h1 className="project-view-title">{project.title}</h1>
          <p className="project-view-date">
            {project.dueDate.toLocaleDateString()}
          </p>
          <p className="project-view-days-remaining">
            Due {formatDistanceToNow(project.dueDate, { addSuffix: true })}
          </p>
          <h2 className="project-view-description">{project.description}</h2>
          <button className="project-view-complete">Complete</button>
        </div>
        <button onClick={openDialog} className="project-view-button">
          <p>Create New Task</p>
          <i className="fa-solid fa-plus"></i>
        </button>
        <ul>
          {project.tasks.map((task) => (
            <li key={task.id}>
              <Task {...task} deleteTask={handleDeleteTask} />
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return (
      <div className="project-view-none-selected">
        <h1>No Project Selected</h1>
      </div>
    );
  }
}
