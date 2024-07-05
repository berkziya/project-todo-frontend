import { createRoot } from 'react-dom/client';
import { useEffect } from 'react';
import './index.css';

import store from './store';
import { Provider, useSelector, useDispatch } from 'react-redux';

import Todo from './features/todo/Todo.jsx';
import { closeTrash, createList } from './features/todo/todoSlice';
import TrashPopup from './features/todo/components/Trash/TrashPopup.jsx';
import Lists from './features/todo/components/Lists/Lists';

const App = () => {
  const todoState = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  let listId = todoState.activeList;

  useEffect(() => {
    console.log('useEffect');
    if (!listId || !todoState.lists[listId]) {
      listId = Object.keys(todoState.lists)[0] || '0';
      if (!todoState.lists[listId]) {
        dispatch(createList({ listId: '0' }));
      }
    }
  }, [dispatch, listId, todoState.lists]);

  return (
    <div>
      <div className='flex flex-col-reverse md:flex-row p-4 mt-10'>
        <div className='w-full basis-1/3'>
          <div className='p-4 mt-4 md:mt-0 md:mr-4 md:min-w-80 md:max-w-96 bg-white shadow-md rounded-lg'>
            <Lists />
          </div>
        </div>
        {todoState.lists[listId] && (
          <div className='w-full basis-2/3'>
            <div className='p-4 md:max-w-2xl bg-white shadow-md rounded-lg'>
              <Todo listId={listId} />
            </div>
          </div>
        )}
      </div>
      <TrashPopup toClose={() => dispatch(closeTrash())} listId={listId} />
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
