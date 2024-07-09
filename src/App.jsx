import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import Todo from './features/todo/Todo';
import { createList, setActiveList } from './features/todo/todoSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { randomString } from './shared/utils/misc';
import CombinedUi from './shared/components/CombinedUi';

const App = () => {
  const todoState = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  let { listId } = useParams();

  useEffect(() => {
    if (!listId || !todoState.lists[listId]) {
      listId = Object.keys(todoState.lists)[0] ?? null;
    }
    if (!todoState.lists[listId]) {
      dispatch(createList({ listId: randomString() }));
    }
    dispatch(setActiveList({ listId }));
    navigate(`/project-todo-frontend/${listId}`);
  }, [dispatch, listId, todoState.lists]);

  return (
    <CombinedUi>
      {todoState.lists[listId] ? <Todo listId={listId} /> : null}
    </CombinedUi>
  );
};

export default App;
