import { createSlice } from '@reduxjs/toolkit';

export const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    tasks: [],
    deletedTasks: 0,
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks = [action.payload, ...state.tasks];
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      state.deletedTasks += 1;
    },
    toggleCompletion: (state, action) => {
      state.tasks = state.tasks.map((task) => {
        if (task.id === action.payload) {
          return { ...task, completed: !task.completed, completedDate: task.completed ? null : Date.now() };
        }
        return task;
      });

      state.tasks.sort((a, b) => {
        if (!a.completed && !b.completed) {
          return b.completedDate - a.completedDate;
        }
        return a.completed ? 1 : -1;
      });
    }
  }
});

export const { addTask, removeTask, toggleCompletion } = todoSlice.actions;
export default todoSlice.reducer;
