import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import store from './store';
import { Provider } from 'react-redux';

import Todo from './features/todo/Todo.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <div className='max-w-full sm:max-w-lg mx-auto mt-10 p-4 bg-white shadow-md rounded-lg'>
      <Todo />
    </div>
  </Provider>
);
