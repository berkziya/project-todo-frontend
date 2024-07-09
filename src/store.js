import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './features/todo/todoSlice';

const migrations = {
  1: (state) => {
    // Migration from tasks to a single list
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    return {
      ...state,
      todo: {
        ...state.todo,
        activeList: 'defaultList',
        lists: [{ id: 'defaultList', name: 'Default List', tasks }],
      },
      version: 1,
    };
  },
  2: (state) => {
    return {
      ...state,
      activeList: localStorage.getItem('activeList'),
      lists: JSON.parse(localStorage.getItem('lists') || '[]'),
      version: 2,
    };
  },
};

const currentVersion = 2;

const clearOldStorage = () => {
  const oldKeys = ['tasks', 'lists', 'activeList'];
  oldKeys.forEach(key => localStorage.removeItem(key));
};

const reHydrateStore = () => {
  const storedState = localStorage.getItem('state');

  if (storedState !== null) {
    let state = JSON.parse(storedState);
    const storedVersion = state.version || 0;
    for (let version = storedVersion + 1; version <= currentVersion; version++) {
      if (migrations[version]) {
        state = migrations[version](state);
      }
    }
    clearOldStorage();
    return state;
  }
};

const localStorageMiddleware = store => next => action => {
  const result = next(action);
  const state = store.getState();
  localStorage.setItem('state', JSON.stringify({ ...state, version: currentVersion }));
  return result;
};

export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
  preloadedState: reHydrateStore(),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;
