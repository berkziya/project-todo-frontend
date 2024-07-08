import { useSelector, useDispatch } from 'react-redux';
import { setActiveList, deleteList, createList } from '../../todoSlice';
import { randomString } from '../../../../shared/utils/misc';
import { FaRegTrashCan, FaPlus } from 'react-icons/fa6';

import Stats from './Stats';

const Lists = () => {
  const todoState = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  function areYouSure(listId) {
    if (
      window.confirm(
        'Are you sure? This will delete the list and all its tasks.'
      )
    ) {
      dispatch(deleteList({ listId }));
    }
  }

  return (
    <div>
      <div className='border-b border-gray-200'></div>
      {Object.entries(todoState.lists).map(([listId, list], _i) => (
        <button
          key={listId}
          className={`flex w-full items-center justify-between p-3 border-b border-gray-200 text-gray-500 hover:bg-teal-100 hover:text-gray-700 hover:font-semibold ${
            todoState.activeList === listId ? 'font-bold bg-teal-50' : ''
          }`}
          onClick={() => dispatch(setActiveList({ listId }))}
        >
          <div className='flex items-center'>{list.name}</div>
          <div className='flex items-center'>
            <Stats listId={listId} />
            <FaRegTrashCan
              size={20}
              onClick={() => areYouSure(listId)}
              className='text-gray-500 hover:text-red-500 ml-3'
            />
          </div>
        </button>
      ))}
      <FaPlus
        size={36}
        onClick={() => dispatch(createList({ listId: randomString() }))}
        className='p-2 m-3 mx-1 mb-0 rounded-lg bg-teal-100 hover:bg-teal-200 text-teal-500 hover:text-teal-700'
      />
    </div>
  );
};

export default Lists;
