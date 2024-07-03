import { toggleCompletion } from '../todoSlice';
import { useDispatch } from 'react-redux';

const Task = ({ task, icon = 'delete', func = null }) => {
  const dispatch = useDispatch();
  return (
    <div className={`flex items-center gap-3 p-2 even:bg-gray-200 ${task.status === 'done' ? 'bg-green-100 even:bg-green-200' : ''} rounded-sm`}>
      {icon === 'delete' && (
        <input type='checkbox' checked={task.completed} onChange={() => dispatch(toggleCompletion(task.id))} className='size-5 flex-shrink-0' />
      )}
      <span className={`${task.status === 'done' ? 'text-gray-400 italic' : ''}`}>{task.text}</span>
      {func && icon === 'delete' && (
        <button onClick={func} className='ml-auto'>
          <svg xmlns='http://www.w3.org/2000/svg' className='size-8 fill-current text-gray-400 hover:text-red-400' viewBox='0 0 64 64'><path d='M19.186 16.493v-1.992c.043-3.346 2.865-6.296 6.277-6.427 3.072-.04 10.144-.04 13.216 0 3.346.129 6.233 3.012 6.277 6.427v1.992h9.106v4H49.62v29.11c-.043 3.348-2.865 6.296-6.278 6.428-7.462.095-14.926.002-22.39.002-3.396-.044-6.385-2.96-6.429-6.43v-29.11H10.08v-4h9.106zm26.434 4H18.521c-.014 9.72-.122 19.441.002 29.16.049 1.25 1.125 2.33 2.379 2.379a875.45 875.45 0 0 0 22.338 0c1.273-.049 2.363-1.163 2.38-2.455V20.493zm-4.701-4c-.014-.83 0-1.973 0-1.973s-.059-2.418-2.343-2.447a723.348 723.348 0 0 0-13.01 0c-1.273.049-2.363 1.162-2.38 2.454v1.966h17.733z' /><path d='M22.58 28.099h3v16.327h-3zM30.571 28.099h3v16.327h-3zM38.58 28.099h3v16.327h-3z' /></svg>
        </button>
      )}
      {func && icon === 'restore' && (
        <button onClick={func} className='ml-auto'>
          <svg xmlns='http://www.w3.org/2000/svg' className='size-8 fill-current text-gray-400 hover:text-green-500' viewBox='0 0 64 64'><path d='M49.71 20.332v29.11c-.043 3.347-2.864 6.296-6.277 6.427-7.463.096-14.927.002-22.391.002-3.396-.043-6.385-2.959-6.429-6.429v-29.11H10.17v-4h9.106V14.34c.043-3.347 2.865-6.296 6.278-6.428a746.323 746.323 0 0 1 13.215 0c3.346.129 6.234 3.013 6.277 6.428v1.992h9.106v4H49.71zm-4 0H18.611c-.014 9.72-.122 19.44.003 29.159.048 1.251 1.125 2.331 2.379 2.379 7.445.096 14.892.096 22.337 0 1.273-.049 2.363-1.162 2.38-2.454V20.332zM34.165 49.27H30.16V30.161l-7.414 7.413-2.832-2.832L32.16 22.496l.001.001.001-.001 12.247 12.246-2.833 2.832-7.411-7.411V49.27zm6.845-32.938c-.014-.831 0-1.973 0-1.973s-.059-2.418-2.344-2.448a742.383 742.383 0 0 0-13.01 0c-1.273.049-2.363 1.163-2.38 2.455v1.966H41.01z' /></svg>
        </button>
      )}
    </div>
  );
};

export default Task;
