import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, deleteTask, openTrash } from './todoSlice';
import Task from './components/Task';

function Todo() {
  const todoState = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  const taskInputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const task = taskInputRef.current.value;
    if (!task) return;
    dispatch(addTask({ id: Date.now(), text: task, status: 'pending', completedDate: 0, deletedDate: 0 }));
    taskInputRef.current.value = '';
  };

  return (
    <div>
      <div className='flex justify mb-4'>
        <h1 className='text-2xl font-semibold text-center mx-auto'>Todo App</h1>
        {
          todoState.tasks.filter(k => k.status === 'deleted').length > 0 &&
          <button onClick={() => dispatch(openTrash())} className='bg-red-500 text-white px-3 py-1 rounded'>Trash</button>
          ||
          <div className='invisible px-8 py-1'></div>
        }
      </div>
      <div className='mb-4'>
        <form onSubmit={handleSubmit} className='flex gap-2'>
          <input type='text' placeholder='Enter your task' ref={taskInputRef} className='w-full border-gray-300 border-2 px-6 py-2 rounded' />
          <button type='submit' className='bg-blue-500 text-white px-5 py-2 rounded'>Add</button>
        </form>
      </div>
      <div className='p-4 bg-gray-100 rounded'>
        {todoState.tasks.filter(e => e.status !== 'deleted').map(k => (<Task key={k.id} task={k} icon='delete' func={() => dispatch(deleteTask(k.id))} />))}
      </div>
    </div >
  );
}

export default Todo;
