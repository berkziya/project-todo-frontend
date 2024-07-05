import { createPortal } from 'react-dom';
import { useEffect } from 'react';

const Popup = ({ children, toClose, closable = true, closeIcon = null }) => {
  const handleOverlayClick = (event) => {
    if (!closable) return;
    if (event.target === event.currentTarget) {
      toClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (closable) {
          toClose();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return createPortal(
    <div
      onClick={handleOverlayClick}
      className='fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center'
    >
      <div className='max-w-full sm:max-w-lg min-w-full sm:min-w-96 mx-auto bg-white p-5 mt-10 rounded-md'>
        {closeIcon}
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Popup;
