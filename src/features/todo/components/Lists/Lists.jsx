import { useSelector, useDispatch } from 'react-redux';
import { setActiveList, deleteList, createList } from '../../todoSlice';
import { randomString } from '../../../../shared/utils/misc';
import { FaRegTrashCan, FaPlus } from 'react-icons/fa6';

import Stats from './Stats';
import { useNavigate } from 'react-router-dom';

const Lists = () => {
  const todoState = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  let navigate = useNavigate();

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
    <div className='flex flex-col'>
      <div className='text-xl font-semibold text-gray-600 mb-3 ml-3'>
        My Lists
      </div>
      <div className='border-b border-gray-200'></div>
      <div className='flex-grow overflow-y-auto'>
        {Object.entries(todoState.lists).map(([listId, list], _i) => (
          <button
            key={listId}
            className={`rounded-lg flex w-full items-center justify-between p-3 border-b border-gray-200 text-gray-500 hover:bg-teal-100 hover:text-gray-700 hover:font-semibold ${
              todoState.activeList === listId ? 'font-bold bg-teal-50' : ''
            }`}
            onClick={() => {
              dispatch(setActiveList({ listId }));
              navigate(`/project-todo-frontend/${listId}`);
            }}
            onDoubleClick={() => {
              const listNameInput = document.querySelector('#list-name');
              listNameInput.focus();
            }}
          >
            <div className='flex items-center'>
              <div className='mr-3'>{list.emoji ?? '👻'}</div>
              <div>{list.name}</div>
            </div>
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
        <button
          onClick={() => dispatch(createList({ listId: randomString() }))}
          className='p-2 px-4 m-3 mx-1 mb-0 flex items-center rounded-lg bg-teal-100 hover:bg-teal-200 text-teal-500 hover:text-teal-700'
        >
          <FaPlus size={20} />
          <span className='ml-2'>Add List</span>
        </button>
      </div>
    </div>
  );
};

export default Lists;
