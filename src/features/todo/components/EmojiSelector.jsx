import { useDispatch, useSelector } from 'react-redux';
import { closeEmojiSelector, safeEmojis, setEmoji } from '../todoSlice';
import Popup from '../../../shared/components/Popup';

const EmojiSelector = () => {
  const todoState = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  if (todoState.isEmojiSelectorOpen !== true) return null;

  const toClose = () => {
    dispatch(closeEmojiSelector());
  };

  return (
    <Popup toClose={toClose}>
      <div>
        <div className='text-xl font-semibold text-gray-600 mb-3 ml-3'>
          Select an Emoji
        </div>
        <div className='border-b border-gray-200 mb-4'></div>
        <div>
          {safeEmojis.map((emoji, _i) => (
            <button
              key={emoji}
              onClick={() => {
                dispatch(setEmoji({ emoji }));
                toClose();
              }}
            >
              <div className='m-1'>{emoji}</div>
            </button>
          ))}
        </div>
      </div>
    </Popup>
  );
};

export default EmojiSelector;
