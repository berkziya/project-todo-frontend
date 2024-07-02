import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, removeTask, toggleCompletion } from './todoSlice';

function Todo() {
  const todoState = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  const taskInputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const task = taskInputRef.current.value;
    dispatch(addTask({ id: Date.now(), text: task, completed: false, completedDate: null }));
    taskInputRef.current.value = '';
  };

  return (
    <div>
      <div className='mb-4'>
        <form onSubmit={handleSubmit} className='flex gap-2'>
          <input type='text' placeholder='Enter your task' ref={taskInputRef} className='w-full border-gray-300 border-2 px-4 py-2 rounded' />
          <button type='submit' className='bg-blue-500 text-white px-5 py-2 rounded'>Add</button>
        </form>
      </div>
      <div className='p-4 bg-gray-100 rounded'>
        {todoState.tasks.map((task) => (
          <div key={task.id} className={`flex items-center gap-3 p-2 even:bg-gray-200 ${task.completed ? 'bg-green-100 even:bg-green-200' : ''} rounded-sm`}>
            <input type='checkbox' checked={task.completed} onChange={() => dispatch(toggleCompletion(task.id))} className='size-5 flex-shrink-0' />
            <span className={`${task.completed ? 'text-gray-500 italic' : ''}`}>{task.text}</span>
            <button onClick={() => dispatch(removeTask(task.id))} className='ml-auto'>
              <svg className="size-8 fill-current text-gray-400 hover:text-red-400" viewBox='-4 -4 25 25'>
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div >
  );
}

export default Todo;