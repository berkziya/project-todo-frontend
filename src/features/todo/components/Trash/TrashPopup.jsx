import { useSelector } from "react-redux";
import Popup from "../../../../shared/components/Popup";
import Trash from "./Trash";

const TrashPopup = ({ toClose, listId }) => {
  const todoState = useSelector((state) => state.todo);
  if (todoState.isTrashOpen !== true) return null;

  return (
    <Popup toClose={toClose}>
      <Trash toClose={toClose} listId={listId} />
    </Popup>
  );
};

export default TrashPopup;
