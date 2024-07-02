import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './features/todo/todoSlice';
// import statsReducer from './features/stats/statsReducer';

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    // stats: statsReducer,
  },
});

export default store;
