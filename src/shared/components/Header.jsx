import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className='text-gray-400 py-7'>
      <div className='flex justify-center md:justify-end mx-20'>
        <button
          onClick={() => {
            navigate('/project-todo-frontend/about');
          }}
        >
          About
        </button>
      </div>
    </header>
  );
};

export default Header;
