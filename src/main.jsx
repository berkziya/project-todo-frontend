import { createRoot } from 'react-dom/client';
import './index.css';

import store from './store';
import { Provider } from 'react-redux';

import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/project-todo-frontend/' element={<App />} />
        <Route path='/project-todo-frontend/:listId' element={<App />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
