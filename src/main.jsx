import { createRoot } from 'react-dom/client';
import './index.css';

import store from './store';
import { Provider } from 'react-redux';

import App from './App';
import { About } from './About';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './i18n';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/project-todo-frontend/' element={<App />} />
        <Route path='/project-todo-frontend/:listId' element={<App />} />
        <Route path='/project-todo-frontend/about' element={<About />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
);
