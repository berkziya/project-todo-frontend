import { useDispatch, useSelector } from 'react-redux';
import { closeEmojiSelector, safeEmojis, setEmoji } from '../todoSlice';
import Popup from '../../../shared/components/Popup';

import { useTranslation } from 'react-i18next';

const EmojiSelector = () => {
  const { t } = useTranslation();

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
          {t('selectEmoji')}
        </div>
        <div className='border-b border-gray-200 mb-4'></div>
        <div>
          {safeEmojis.map((emoji_, _i) => (
            <button
              key={emoji_}
              onClick={() => {
                dispatch(setEmoji({ emoji_, listId: todoState.activeList }));
                toClose();
              }}
            >
              <div className='m-1'>{emoji_}</div>
            </button>
          ))}
        </div>
      </div>
    </Popup>
  );
};

export default EmojiSelector;
