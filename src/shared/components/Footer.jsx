import { FaRegHeart } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className='text-gray-400 text-center py-5'>
      <div className='flex justify-center space-x-4 mb-3'>
        {/* <Link to='/' className='hover:text-teal-300'>
          Home
        </Link>
        <Link to='/about' className='hover:text-teal-300'>
          About
        </Link>
        <Link to='/contact' className='hover:text-teal-300'>
          Contact
        </Link> */}
        <button to='/' className='hover:text-teal-400'>
          Home
        </button>
        <button to='/about' className='hover:text-teal-400'>
          About
        </button>
        <button to='/contact' className='hover:text-teal-400'>
          Contact
        </button>
      </div>
      <p className='flex justify-center text-center'>
        Made with <FaRegHeart size={24} className='text-teal-400 mx-2' /> in
        Ankara
      </p>
    </footer>
  );
};

export default Footer;
