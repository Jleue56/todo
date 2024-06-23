import { forwardRef, useImperativeHandle, useRef } from 'react';
import { v4 as uuid } from 'uuid';
import './NewTaskModal.css';

const NewTaskModal = forwardRef(function NewTaskModal({ createNewTask }, ref) {
  const titleRef = useRef();
  const dialogRef = useRef();

  function handleSave() {
    const newTask = {
      title: titleRef.current.value,
      id: uuid(),
    };
    createNewTask(newTask);
    handleCancel();
  }

  function handleCancel() {
    titleRef.current.value = '';
    dialogRef.current.close();
  }

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialogRef.current.showModal();
      },
    };
  });

  return (
    <dialog ref={dialogRef} className="new-task-modal">
      <h2>Task Name</h2>
      <input ref={titleRef} type="text" />
      <div className="new-task-modal-buttons">
        <form method="dialog" onClick={handleCancel}>
          <p>Cancel</p>
        </form>
        <form method="dialog" onClick={handleSave}>
          <p>Save</p>
        </form>
      </div>
    </dialog>
  );
});

export default NewTaskModal;
