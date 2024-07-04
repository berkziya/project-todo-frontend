import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './features/todo/todoSlice';
// import statsReducer from './features/stats/statsReducer';

const localStorageMiddleware = store => next => action => {
  const result = next(action);
  const state = store.getState();
  localStorage.setItem('lists', JSON.stringify(state.todo.lists));
  return result;
};

const reHydrateStore = () => {
  const storedLists = localStorage.getItem('lists');
  if (storedLists !== null) {
    return { todo: { lists: JSON.parse(storedLists) } };
  }
  return undefined;
};

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    // stats: statsReducer,
  },
  preloadedState: reHydrateStore(),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;
