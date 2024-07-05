import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, deleteTask, openTrash, changeListName } from './todoSlice';
import Task from './components/Task';

function Todo({ listId }) {
  const todoState = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  const taskInputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const task = taskInputRef.current.value;
    if (!task) return;
    dispatch(
      addTask({
        taskId: Date.now(),
        text: task,
        status: 'pending',
        completedDate: 0,
        deletedDate: 0,
        listId,
      })
    );
    taskInputRef.current.value = '';
  };

  useEffect(() => {
    const listNameInput = document.querySelector('#list-name');
    listNameInput.value = todoState.lists[listId].name;
  }, [todoState.activeList]);

  return (
    todoState.lists[listId] && (
      <div>
        <div className='flex justify-end mb-4'>
          <div className='invisible px-5 py-1'></div>
          <div className='flex-grow'>
            <input
              id='list-name'
              type='text'
              placeholder='¯\_(ツ)_/¯'
              defaultValue={todoState.lists[todoState.activeList].name}
              onBlur={(e) => {
                dispatch(changeListName({ name: e.target.value, listId }));
              }}
              spellCheck='false'
              className='text-2xl font-semibold text-center w-full focus:outline-none'
            />
            <div className='border-b-2 border-t-0 border-dashed border-gray-300 w-1/2 mx-auto'></div>
          </div>
          <div className='invisible px-3 py-1'></div>
          {(todoState.lists[listId].tasks.filter((k) => k.status === 'deleted')
            .length > 0 && (
            <button
              onClick={() => dispatch(openTrash())}
              className='bg-red-500 text-white px-3 py-1 rounded'
            >
              Trash
            </button>
          )) || <div className='invisible px-8 py-1'></div>}
        </div>
        <div className='mb-4'>
          <form onSubmit={handleSubmit} className='flex gap-2'>
            <input
              type='text'
              placeholder='Enter your task'
              ref={taskInputRef}
              className='w-full border-gray-300 border-2 px-6 py-2 rounded'
            />
            <button
              type='submit'
              className='bg-blue-500 text-white px-5 py-2 rounded'
            >
              Add
            </button>
          </form>
        </div>
        <div className='p-4 bg-gray-100 rounded'>
          {todoState.lists[listId].tasks
            .filter((e) => e.status !== 'deleted')
            .map((k) => (
              <Task
                listId={listId}
                key={k.id}
                task={k}
                icon='delete'
                func={() => dispatch(deleteTask({ taskId: k.id, listId }))}
              />
            ))}
        </div>
      </div>
    )
  );
}

export default Todo;
