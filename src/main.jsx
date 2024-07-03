import ReactDOM from 'react-dom/client';
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
        <Todo />
      </div>
      <TrashPopup isOpen={todoState.IsTrashOpen === true} toClose={() => dispatch(closeTrash())} />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);