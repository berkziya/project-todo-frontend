import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import Todo from './features/todo/Todo';
import { closeTrash, createList } from './features/todo/todoSlice';
import TrashPopup from './features/todo/components/Trash/TrashPopup';
import Lists from './features/todo/components/Lists/Lists';
import Footer from './shared/components/Footer';
import EmojiSelector from './features/todo/components/EmojiSelector';

const App = () => {
  const todoState = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  let listId = todoState.activeList;

  useEffect(() => {
    if (!listId || !todoState.lists[listId]) {
      listId = Object.keys(todoState.lists)[0] || '0';
      if (!todoState.lists[listId]) {
        dispatch(createList({ listId: '0' }));
      }
    }
  }, [dispatch, listId, todoState.lists]);

  return (
    <div className='flex flex-col'>
      <div className='flex-grow'>
        <div className='flex flex-col-reverse md:flex-row mt-10'>
          <div className='basis-1/3'>
            <div className='p-4 mt-4 md:mt-0 md:mr-4 md:min-w-80 md:max-w-96 bg-white shadow-md rounded-lg'>
              <Lists />
            </div>
          </div>
          <div className='basis-2/3'>
            <div
              className={`p-4 px-3 md:px-5 md:max-w-2xl min-h-[230px] ${
                todoState.lists[listId] ? 'bg-white' : 'bg-gray-100'
              } shadow-md rounded-lg`}
            >
              {todoState.lists[listId] ? (
                <Todo listId={listId} />
              ) : (
                <div className='text-center text-xl mt-8 font-semibold text-gray-400'>
                  Select a list or create a new one ¯\_(ツ)_/¯
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <EmojiSelector />
      <TrashPopup toClose={() => dispatch(closeTrash())} listId={listId} />
    </div>
  );
};

export default App;
