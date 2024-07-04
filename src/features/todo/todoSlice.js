import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeList: 1,
  lists: {
    1: {
      name: 'Todo List',
      tasks: [
        {
          id: 1,
          text: 'Learn React',
          status: 'pending',
          completedDate: 0,
          deletedDate: 0
        },
        {
          id: 2,
          text: 'Learn Redux',
          status: 'done',
          completedDate: Date.now(),
          deletedDate: 0
        },
        {
          id: 3,
          text: 'Learn Redux Toolkit',
          status: 'deleted',
          completedDate: 0,
          deletedDate: Date.now()
        }
      ]
    },
    isTrashOpen: false,
  }
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { taskId, text, status, completedDate, deletedDate, listId } = action.payload;
      state.lists[listId].tasks = [
        {
          id: taskId,
          text,
          status,
          completedDate,
          deletedDate
        },
        ...state.lists[listId].tasks
      ];
    },
    deleteTask: (state, action) => {
      const { listId, taskId } = action.payload;
      state.lists[listId].tasks = state.lists[listId].tasks.map((task) => {
        if (task.id === taskId) {
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
      const { taskId, listId } = action.payload;
      state.lists[listId].tasks = state.lists[listId].tasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            status: 'pending',
            deletedDate: 0
          };
        }
        return task;
      });
      if (state.lists[listId].tasks.filter((task) => task.status === 'deleted').length === 0) {
        state.isTrashOpen = false;
      }
    },
    toggleCompletion: (state, action) => {
      const { taskId, listId } = action.payload;
      console.log('toggleCompletion', taskId, listId);
      state.lists[listId].tasks = state.lists[listId].tasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            status: task.status === 'pending' ? 'done' : 'pending',
            completedDate: task.status === 'pending' ? Date.now() : 0,
          };
        }
        return task;
      }).sort((a, b) => {
        if (a.status === 'done' && b.status === 'done') {
          return b.completedDate - a.completedDate; // Sort done tasks by completedDate descending
        }
        return a.status === 'pending' ? -1 : 1; // Pending tasks first
      });
    },
    openTrash: (state) => {
      state.isTrashOpen = true;
    },
    closeTrash: (state) => {
      state.isTrashOpen = false;
    },
    emptyTrash: (state, action) => {
      const { listId } = action.payload;
      state.lists[listId].tasks = state.lists[listId].tasks.filter((task) => task.status !== 'deleted');
      state.isTrashOpen = false;
    },
    changeList: (state, action) => {
      state.activeList = action.payload;
    },
    createList: (state) => {
      const randomListString = Math.random().toString(36).substring(2);
      state.lists = {
        ...state.lists,
        [randomListString]: {
          name: 'New List',
          tasks: []
        }
      };
    },
    deleteList: (state, action) => {
      const { listId } = action.payload;
      delete state.lists[listId];
    },
    changeListName: (state, action) => {
      const { listId, name } = action.payload;
      state.lists = {
        ...state.lists,
        [listId]: {
          name,
          tasks: state.lists[listId].tasks
        }
      };
    }
  }
});

export const {
  addTask,
  deleteTask,
  restoreTask,
  toggleCompletion,
  openTrash,
  closeTrash,
  emptyTrash,
  changeList,
  createList,
  deleteList,
  changeListName
} = todoSlice.actions;
export default todoSlice.reducer;
