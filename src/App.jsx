import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import Todo from './features/todo/Todo';
import {
  closeTrash,
  createList,
  setActiveList,
} from './features/todo/todoSlice';
import TrashPopup from './features/todo/components/Trash/TrashPopup';
import Lists from './features/todo/components/Lists/Lists';
import Footer from './shared/components/Footer';
import EmojiSelector from './features/todo/components/EmojiSelector';
import { useParams, useNavigate } from 'react-router-dom';

const App = () => {
  const todoState = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  let { listId } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    if (!listId || !todoState.lists[listId]) {
      listId = todoState.lists ? Object.keys(todoState.lists)[0] : '0';
    }
    if (!todoState.lists[listId]) {
      dispatch(createList({ listId: '0' }));
    }
    dispatch(setActiveList({ listId }));
    navigate(`/project-todo-frontend/${listId}`);
  }, [dispatch, listId, todoState.lists]);

  if (!listId) {
    return null;
  }

  return (
    <div className='flex flex-col'>
      <div className='flex flex-col-reverse md:flex-row'>
        <div className='p-4 md:mr-4 md:min-w-80 md:max-w-96 shadow-md basis-1/3 min-h-screen'>
          <div className='m-3'>
            <img
              src='logo.svg'
              className='mb-0 md:mb-10 max-w-64 mx-auto invisible h-0 md:visible md:h-auto'
              alt='logo'
            />
            <Lists />
            <Footer />
          </div>
        </div>
        <div className='basis-3/4 flex-col'>
          <img
            src='logo.svg'
            className='mb-0 md:mb-10 max-w-64 mx-auto visible h-auto md:invisible md:h-0 mt-10'
            alt='logo'
          />
          <div className='p-4 mt-10 px-3 sm:px-10 transition-all'>
            {todoState.lists[listId] ? (
              <Todo listId={listId} />
            ) : (
              <div className='text-center text-xl mt-8 font-semibold text-gray-400'>
                Select a list or create a new one ¯\_(ツ)_/¯
              </div>
            )}
          </div>
          <div className='flex-grow'></div>
        </div>
      </div>

      <EmojiSelector />
      <TrashPopup toClose={() => dispatch(closeTrash())} listId={listId} />
    </div>
  );
};

export default App;
