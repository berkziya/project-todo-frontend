import Popup from './Popup';
import { useDispatch, useSelector } from 'react-redux';
import { closeAboutPopup } from '../../features/todo/todoSlice';

export const AboutPopup = () => {
  const todoState = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  if (!todoState.isAboutPopupOpen) {
    return null;
  }

  return (
    <Popup
      toClose={() => {
        dispatch(closeAboutPopup());
      }}
    >
      <div className='flex flex-col items-center'>
        <h2 className='text-3xl font-semibold'>About</h2>
      </div>
    </Popup>
  );
};
