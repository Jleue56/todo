import { forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import './NewProjectModal.css';

const NewProjectModal = forwardRef(function NewProjectModal(
  { createNewProject },
  ref
) {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const dueDateRef = useRef();
  const dialogRef = useRef();

  function handleClose() {
    titleRef.current.value = '';
    descriptionRef.current.value = '';
    dueDateRef.current.value = '';
    dialogRef.current.close();
  }

  function handleSave() {
    const newProject = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      dueDate: new Date(dueDateRef.current.value),
      tasks: [],
      id: uuid(),
    };
    createNewProject(newProject);
    handleClose();
  }

  function handleCancel() {
    handleClose();
  }

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialogRef.current.showModal();
      },
    };
  });

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        handleClose();
      }
    }

    const dialog = dialogRef.current;
    dialog.addEventListener('keydown', handleKeyDown);

    return () => {
      dialog.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <dialog ref={dialogRef} className="new-project-modal">
      <h2>Title</h2>
      <input ref={titleRef} type="text" />
      <h2>Description</h2>
      <textarea ref={descriptionRef} />
      <h2>Due Date</h2>
      <input ref={dueDateRef} type="datetime-local" />
      <div className="new-project-modal-buttons">
        <button onClick={handleCancel}>
          <p>Cancel</p>
        </button>
        <button onClick={handleSave}>
          <p>Save</p>
        </button>
      </div>
    </dialog>
  );
});

export default NewProjectModal;
