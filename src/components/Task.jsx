import './Task.css';

export default function Task({ title, id, deleteTask }) {
  function handleDeleteTask() {
    deleteTask(id);
  }

  return (
    <div className="task">
      <button className="task-delete" onClick={handleDeleteTask}>
        <i className="fa-solid fa-square-check"></i>
      </button>
      <p className="task-title">{title}</p>
    </div>
  );
}
