import { useSelector, useDispatch } from 'react-redux';
import Popup from '../../../../shared/components/Popup';
import Trash from './Trash';
import { closeTrash } from '../../todoSlice';

const TrashPopup = () => {
  const todoState = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  if (todoState.isTrashOpen !== true) return null;

  const toClose = () => {
    dispatch(closeTrash());
  };

  return (
    <Popup toClose={toClose}>
      <Trash toClose={toClose} />
    </Popup>
  );
};

export default TrashPopup;
