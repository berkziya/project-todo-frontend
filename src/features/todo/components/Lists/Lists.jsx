import { useSelector, useDispatch } from 'react-redux';
import { setActiveList, deleteList, createList } from '../../todoSlice';
import { randomString } from '../../../../shared/utils/misc';

const Lists = () => {
  const todoState = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  return (
    <div>
      <button
        onClick={() => dispatch(createList({ listId: randomString() }))}
        className='p-2 text-gray-500 hover:text-gray-700 hover:font-semibold'
      >
        Add list
      </button>
      <div className='border-b border-gray-200'></div>
      {Object.entries(todoState.lists).map(([listId, list], _i) => (
        <div
          key={listId}
          className='flex items-center justify-between p-2 border-b border-gray-200'
        >
          <div className='flex items-center'>
            <button
              className={`text-gray-500 hover:text-gray-700 hover:font-semibold ${
                todoState.activeList === listId ? 'font-semibold' : ''
              }`}
              onClick={() => dispatch(setActiveList({ listId }))}
            >
              {list.name}
            </button>
          </div>
          <button
            className='text-gray-500 hover:text-red-500 hover:font-semibold'
            onClick={() => dispatch(deleteList({ listId }))}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Lists;
