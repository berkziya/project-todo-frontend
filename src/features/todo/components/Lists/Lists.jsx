import { useSelector, useDispatch } from 'react-redux';
import { setActiveList, deleteList, createList } from '../../todoSlice';
import { randomString } from '../../../../shared/utils/misc';

const Lists = () => {
  const todoState = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => dispatch(createList({ listId: randomString() }))}>
        Add list
      </button>
      {Object.entries(todoState.lists).map(([listId, list], _i) => (
        <div
          key={listId}
          className='flex items-center justify-between p-2 border-b border-gray-200'
        >
          <div className='flex items-center'>
            <button
              className={`text-gray-500 hover:text-gray-700 ${
                todoState.activeList === listId ? 'font-semibold' : ''
              }`}
              onClick={() => dispatch(setActiveList({ listId }))}
            >
              {list.name}
            </button>
          </div>
          <button
            className='text-gray-500 hover:text-gray-700'
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
