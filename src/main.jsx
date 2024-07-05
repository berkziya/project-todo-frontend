import { createRoot } from "react-dom/client";
import "./index.css";

import store from "./store";
import { Provider, useSelector, useDispatch } from "react-redux";

import Todo from "./features/todo/Todo.jsx";
import { closeTrash, createList } from "./features/todo/todoSlice";
import TrashPopup from "./features/todo/components/Trash/TrashPopup.jsx";
import Lists from "./features/todo/components/Lists/Lists";

const App = () => {
  const todoState = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  let listId = todoState.activeList;

  if (!listId || !todoState.lists[listId]) {
    listId = 0;
  }
  if (!todoState.lists[listId]) {
    listId = Object.keys(todoState.lists)[0];
  }
  if (!listId) {
    dispatch(createList({ listId: "0" }));
  }

  return (
    <div>
      <div>
        <Lists />
      </div>
      <div className="max-w-full sm:max-w-lg mx-auto mt-10 p-4 bg-white shadow-md rounded-lg">
        <Todo listId={listId} />
      </div>
      <TrashPopup toClose={() => dispatch(closeTrash())} listId={listId} />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
