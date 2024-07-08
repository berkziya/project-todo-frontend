import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, deleteTask, openTrash, changeListName } from './todoSlice';
import Task from './components/Task';
import { FaPlus, FaTrash, FaPencil } from 'react-icons/fa6';

function Todo({ listId }) {
  const todoState = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  const taskInputRef = useRef(null);
  const trashAmount = todoState.lists[listId].tasks.filter(
    (e) => e.status === 'deleted'
  ).length;

  const handleSubmit = (event) => {
    event.preventDefault();
    const task = taskInputRef.current.value.trim();
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
    listNameInput.value = todoState.lists[todoState.activeList].name;
  }, [todoState.activeList, todoState.lists]);

  return (
    todoState.lists[listId] && (
      <div>
        <div className='flex justify-end mb-4'>
          <div className='invisible px-5 py-1'></div>
          <div className='flex-grow'>
            <div className='flex items-center justify-center'>
              <div className='text-3xl'>
                {todoState.lists[listId].emoji ?? '👻'}
              </div>
              <input
                id='list-name'
                type='text'
                placeholder='¯\_(ツ)_/¯'
                defaultValue={todoState.lists[todoState.activeList].name}
                onBlur={(e) => {
                  dispatch(changeListName({ name: e.target.value, listId }));
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    event.target.blur();
                  }
                }}
                spellCheck='false'
                className='text-2xl font-semibold text-center w-full focus:outline-none'
              />
              <button
                onClick={() => {
                  const listNameInput = document.querySelector('#list-name');
                  listNameInput.focus();
                }}
              >
                <FaPencil className=' text-gray-400 ml-2' />
              </button>
            </div>
            <div className='border-b-2 border-t-0 border-dashed border-gray-300 w-1/2 mx-auto'></div>
          </div>
          <div className='invisible px-3 py-1'></div>
          <button
            disabled={!trashAmount}
            onClick={() => dispatch(openTrash())}
            className={`${
              !trashAmount
                ? 'px-7 bg-gray-50 text-gray-200'
                : 'bg-red-100 text-red-400 hover:bg-red-200 hover:text-red-600'
            } px-5 py-1 rounded-lg`}
          >
            <div className='flex items-center'>
              <div>
                <FaTrash />
              </div>
              {trashAmount > 0 && (
                <div className='ml-2 text-sm font-semibold'>{trashAmount}</div>
              )}
            </div>
          </button>
        </div>
        <div className='mb-4'>
          <form onSubmit={handleSubmit} className='flex gap-2'>
            <input
              type='text'
              placeholder='Enter your task'
              ref={taskInputRef}
              className='w-full border-gray-300 border-2 px-6 py-2 rounded-lg'
            />
            <button
              type='submit'
              className='bg-teal-100 hover:bg-teal-200 text-teal-500 hover:text-teal-700 px-5 py-1 rounded-lg'
            >
              <FaPlus />
            </button>
          </form>
        </div>
        <div className='p-4 bg-gray-100 rounded'>
          {todoState.lists[listId].tasks.filter((e) => e.status !== 'deleted')
            .length > 0 ? (
            todoState.lists[listId].tasks
              .filter((e) => e.status !== 'deleted')
              .map((k) => (
                <Task
                  listId={listId}
                  key={k.id}
                  task={k}
                  icon='delete'
                  func={() => dispatch(deleteTask({ taskId: k.id, listId }))}
                />
              ))
          ) : (
            <div className='ml-8 text-gray-400 min-h-[40px] mt-4'>
              No tasks yet
            </div>
          )}
        </div>
      </div>
    )
  );
}

export default Todo;
