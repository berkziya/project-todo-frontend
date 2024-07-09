import { FaRegHeart } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';

const Footer = () => {
  const dispatch = useDispatch();

  return (
    <footer className='text-gray-400 text-center py-10'>
      <div className='flex justify-center space-x-4 mb-3'>
        {/* <button
          onClick={() => {
            // dispatch(openAboutPopup());
          }}
        >
          About
        </button> */}
      </div>
      <p className='flex justify-center text-center'>
        Made with <FaRegHeart size={24} className='text-teal-400 mx-2' /> in
        Ankara
      </p>
    </footer>
  );
};

export default Footer;
