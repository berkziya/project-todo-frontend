import React from 'react';
import Task from '../Task';
import { useSelector, useDispatch } from 'react-redux';
import { restoreTask } from '../../todoSlice';


const Trash = () => {
  const todoState = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  return (
    <div>
      <div className='flex justify mb-4'>
        <h1 className='text-xl font-semibold mb-4'>Deleted tasks</h1>
        <button>

        </button>
      </div>
      <div className='p-4 pt-0 bg-gray-100 rounded'>
        {todoState.tasks.filter(task => task.status === 'deleted').map(k => (<Task key={k.id} task={k} icon='restore' func={() => dispatch(restoreTask(k.id))} />))}
      </div>
    </div>
  );
};

export default Trash;
