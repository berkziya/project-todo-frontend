import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import { About } from './About';
import createStore from './store';
import './index.css';
import './i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));

(async () => {
  const store = await createStore();

  if (!store) {
    console.log('store', store);
    return;
  }
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
})();
