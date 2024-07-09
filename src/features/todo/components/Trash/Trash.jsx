import Task from '../Task';
import { useSelector, useDispatch } from 'react-redux';
import { restoreTask, emptyTrash } from '../../todoSlice';
import CloseIcon from '../../../../shared/components/CloseIcon';

const deleteIcon = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='size-8 mr-1'
    viewBox='0 4 28 24'
    fill='none'
  >
    <path
      d='m3 3 3 3m0 0 4 4M6 6v12a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3M6 6H4m6 4 4 4m-4-4v7m4-3 4 4m-4-4v3m4 1 3 3M18 6v6.4M18 6h-2m2 0h2m-4 0-.5-1.6a2 2 0 0 0-2-1.4h-3a2 2 0 0 0-1.4.5M16 6h-4.4'
      stroke='#EF5350'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const Trash = ({ toClose }) => {
  const todoState = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  const deletedTasks = todoState.lists[todoState.activeList].tasks.filter(
    (task) => task.status === 'deleted',
  );

  const areYouSure = () => {
    if (
      window.confirm(' Are you sure? This will delete all tasks permanently.')
    ) {
      dispatch(emptyTrash({ listId: todoState.activeList }));
      toClose();
    }
  };

  return (
    <div>
      <div className='flex justify mx-4 mb-3'>
        <h1 className='text-xl font-semibold mx-auto'>Deleted tasks</h1>
        <button onClick={areYouSure}>{deleteIcon}</button>
        <CloseIcon toClose={toClose} className='size-9 pb-2' />
      </div>
      <div className='p-4 pt-0 bg-gray-100 rounded'>
        {deletedTasks.map((k) => (
          <Task
            key={k.id}
            task={k}
            icon='restore'
            func={() =>
              dispatch(
                restoreTask({ taskId: k.id, listId: todoState.activeList }),
              )
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Trash;
