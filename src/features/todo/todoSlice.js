import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  isTrashOpen: false,
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks = [action.payload, ...state.tasks];
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.map((task) => {
        if (task.id === action.payload) {
          return {
            ...task,
            status: 'deleted',
            deletedDate: Date.now()
          };
        }
        return task;
      });
    },
    restoreTask: (state, action) => {
      state.tasks = state.tasks.map((task) => {
        if (task.id === action.payload) {
          return {
            ...task,
            status: task.status === 'deleted' ? 'pending' : task.status,
            deletedDate: 0
          };
        }
        return task;
      });
      if (state.tasks.filter((task) => task.status === 'deleted').length === 0) {
        state.isTrashOpen = false;
      }
    },
    toggleCompletion: (state, action) => {
      state.tasks = state.tasks.map((task) => {
        if (task.id === action.payload) {
          return {
            ...task,
            status: task.status === 'done' ? 'pending' : 'done',
            completedDate: task.status === 'done' ? 0 : Date.now()
          };
        }
        return task;
      });

      state.tasks.sort((a, b) => {
        if (a.status === 'pending' && b.status === 'pending') {
          return b.completedDate - a.completedDate;
        }
        return a.status === 'done' ? 1 : -1;
      });
    },
    openTrash: (state) => {
      state.isTrashOpen = true;
    },
    closeTrash: (state) => {
      state.isTrashOpen = false;
    },
    emptyTrash: (state) => {
      state.tasks = state.tasks.filter((task) => task.status !== 'deleted');
      state.isTrashOpen = false;
    }
  }
});

export const { addTask, deleteTask, restoreTask, toggleCompletion, openTrash, closeTrash, emptyTrash } = todoSlice.actions;
export default todoSlice.reducer;
