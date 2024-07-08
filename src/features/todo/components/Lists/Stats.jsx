import { useSelector } from 'react-redux';

const Stats = ({ listId }) => {
  const todoState = useSelector((state) => state.todo);
  const list = todoState.lists[listId];
  const done = list.tasks.filter((e) => e.status === 'done').length;
  const total = list.tasks.filter((e) => e.status !== 'deleted').length;

  return (
    <div
      className={`${
        done === total && total !== 0
          ? 'bg-teal-200 text-white'
          : 'bg-gray-100 text-gray-400'
      } px-2 py-1 rounded-lg `}
    >
      {done}/{total}
    </div>
  );
};

export default Stats;
