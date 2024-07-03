import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './features/todo/todoSlice';
// import statsReducer from './features/stats/statsReducer';

const localStorageMiddleware = store => next => action => {
  const result = next(action);
  const state = store.getState();
  localStorage.setItem('tasks', JSON.stringify(state.todo.tasks));
  return result;
};

// Function to rehydrate state from localStorage
const reHydrateStore = () => {
  const tasksFromStorage = localStorage.getItem('tasks');
  if (tasksFromStorage !== null) {
    return { todo: { tasks: JSON.parse(tasksFromStorage) } };
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
