import { FaRegHeart } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='text-gray-400 text-center py-10'>
      <div className='flex justify-center space-x-4 mb-3'>
        <Link to='/project-todo-frontend/' className='hover:text-teal-300'>
          Home
        </Link>
        <Link to='/project-todo-frontend/about' className='hover:text-teal-300'>
          About
        </Link>
        <Link
          to='/project-todo-frontend/contact'
          className='hover:text-teal-300'
        >
          Contact
        </Link>
      </div>
      <p className='flex justify-center text-center'>
        Made with <FaRegHeart size={24} className='text-teal-400 mx-2' /> in
        Ankara
      </p>
    </footer>
  );
};

export default Footer;
