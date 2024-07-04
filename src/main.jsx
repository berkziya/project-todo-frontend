import { createRoot } from 'react-dom/client';
import './index.css';

import store from './store';
import { Provider, useSelector, useDispatch } from 'react-redux';

import Todo from './features/todo/Todo.jsx';
import { closeTrash } from './features/todo/todoSlice';
import TrashPopup from './features/todo/components/Trash/TrashPopup.jsx';

const App = () => {
  const todoState = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  return (
    <div>
      <div className='max-w-full sm:max-w-lg mx-auto mt-10 p-4 bg-white shadow-md rounded-lg'>
        <Todo listId={1} />
      </div>
      <TrashPopup toClose={() => dispatch(closeTrash())} listId={1} />
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
