import { useDispatch } from 'react-redux';
import { toggleCompletion, updateTaskText } from '../todoSlice';
import { FaRegTrashCan, FaCheck } from 'react-icons/fa6';
import { LiaTrashRestoreAltSolid } from 'react-icons/lia';

const Task = ({ listId, task, icon = 'delete', func = null }) => {
  const dispatch = useDispatch();

  return (
    <div
      className={`flex items-center gap-3 p-2 even:bg-gray-200 ${
        task.status === 'done' ? 'bg-teal-100 even:bg-teal-200' : ''
      } rounded-sm`}
    >
      {icon === 'delete' && (
        <button
          type='checkbox'
          onClick={() => {
            dispatch(toggleCompletion({ taskId: task.id, listId }));
          }}
          className={`mx-3 ${
            task.status === 'pending'
              ? 'text-gray-400 hover:text-teal-500'
              : 'text-teal-600 hover:text-purple-300'
          }`}
        >
          <FaCheck size={22} />
        </button>
      )}
      <textarea
        defaultValue={task.text}
        onBlur={(event) => {
          dispatch(
            updateTaskText({
              taskId: task.id,
              listId,
              text: event.target.value,
            })
          );
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && event.shiftKey) {
            event.target.blur();
          }
        }}
        className={`${
          task.status === 'done' ? 'text-gray-400 italic' : ''
        } ellipsis p-2 flex-auto bg-transparent`}
      />
      {func && (
        <button onClick={func}>
          {icon === 'delete' ? (
            <FaRegTrashCan
              size={24}
              className='mx-1 md:mx-3 text-gray-400 hover:text-red-500'
            />
          ) : (
            <LiaTrashRestoreAltSolid
              size={32}
              className='mx-1 md:mx-3 mt-4 text-gray-400 hover:text-teal-500'
            />
          )}
        </button>
      )}
    </div>
  );
};

export default Task;
