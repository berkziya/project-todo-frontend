import React from 'react';
import { useSelector } from 'react-redux';
import Popup from '../../../../shared/components/Popup';
import Trash from './Trash';

const TrashPopup = ({ toClose }) => {
  const todoState = useSelector((state) => state.todo);
  if (todoState.isTrashOpen !== true) return null;

  return (
    <Popup {toClose}>
      <Trash />
    </Popup>
  );
};

export default TrashPopup;
