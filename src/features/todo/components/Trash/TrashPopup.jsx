import { createPortal } from 'react-dom';
import Trash from './Trash';
import { useSelector } from 'react-redux';

const TrashPopup = ({ toClose }) => {
  const todoState = useSelector((state) => state.todo);
  if (todoState.isTrashOpen !== true) return null;

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      toClose();
    }
  };

  return createPortal(
    <div onClick={handleOverlayClick} className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
      <div className='max-w-full sm:max-w-lg min-w-full sm:min-w-96 mx-auto bg-white p-5 mt-10 rounded-md'>
        <Trash closeFunc />
      </div>
    </div>,
    document.body
  );
};

export default TrashPopup;