import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeList: 0,
  lists: {
    0: {
      name: 'To Do',
      tasks: []
    }
  },
  isTrashOpen: false
};

const safeEmojis = [
  '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍',
  '😘', '😗', '😙', '😚', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐',
  '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥', '😌', '😔', '😪', '🤤', '😴', '😷',
  '🤒', '🤕', '🤢', '🤮', '🤧', '🥵', '🥶', '🥴', '😵', '🤯', '🤠', '🥳', '😎', '🤓', '🧐',
  '😕', '😟', '🙁', '😮', '😯', '😲', '😳', '🥺', '😦', '😧', '😨', '😰', '😥', '😢', '🥰',
  '😭', '😱', '😖', '😣', '😞', '😓', '😩', '😫', '😤', '😡', '😠', '🤬', '😈', '👿', '💀',
  '☠️', '💩', '🤡', '👹', '👺', '👻', '👽', '👾', '🤖', '😺', '😸', '😹', '😻', '😼', '😽',
  '🙀', '😿', '😾'
];
const getRandomEmoji = () => safeEmojis[Math.floor(Math.random() * safeEmojis.length)];


export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setActiveList: (state, action) => {
      const { listId } = action.payload;
      state.activeList = listId;
    },
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
    updateTaskText: (state, action) => {
      const { taskId, listId, text } = action.payload;
      state.lists[listId].tasks = state.lists[listId].tasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            text
          };
        }
        return task;
      });
    },
    toggleCompletion: (state, action) => {
      const { taskId, listId } = action.payload;
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
    createList: (state, action) => {
      const { listId } = action.payload;
      state.lists = {
        ...state.lists,
        [listId]: {
          name: `My Todo List ${Object.keys(state.lists).length + 1}`,
          emoji: getRandomEmoji(),
          tasks: []
        }
      };
    },
    deleteList: (state, action) => {
      const { listId } = action.payload;
      delete state.lists[listId];
    },
    changeListName: (state, action) => {
      const { name, listId } = action.payload;
      if (name) {
        state.lists[listId].name = name;
      } else {
        state.lists[listId].name = '¯\\_(ツ)_/¯';
      }
    }
  }
});

export const {
  setActiveList,
  addTask,
  deleteTask,
  restoreTask,
  updateTaskText,
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
