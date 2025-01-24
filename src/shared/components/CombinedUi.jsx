import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Lists from '../../features/todo/components/Lists/Lists';
import Footer from './Footer';
import EmojiSelector from '../../features/todo/components/EmojiSelector';
import TrashPopup from '../../features/todo/components/Trash/TrashPopup';
import Header from './Header';

const CombinedUi = ({ children }) => {
  const todoState = useSelector((state) => state.todo);
  let navigate = useNavigate();

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <div className='flex flex-col-reverse md:flex-row md:flex-grow'>
        <div className='p-4 md:mr-4 md:min-w-80 md:max-w-96 justify-items-start shadow-md basis-1/3'>
          <div className='m-3'>
            <button
              className='mb-10 hidden md:block'
              onClick={() => {
                navigate('/project-todo-frontend');
              }}
            >
              <img
                src={`${window.location.protocol}//${window.location.hostname}:${window.location.port}/${window.location.hostname=='todo.berk.tr'?'':'project-todo-frontend/'}logo.svg`}
                alt='logo'
              />
            </button>
            <Lists />
            <Footer />
          </div>
        </div>
        <div className='basis-3/4 flex-col'>
          <div className='flex justify-center md:hidden'>
            <button
              className='mb-0 max-w-64 mx-auto h-auto'
              onClick={() => {
                navigate('/project-todo-frontend');
              }}
            >
              <img
                src={`${window.location.protocol}//${window.location.hostname}:${window.location.port}/${window.location.hostname=='todo.berk.tr'?'':'project-todo-frontend/'}logo.svg`}
                alt='logo'
              />
            </button>
          </div>
          <div className='p-4 mt-10 px-3 sm:px-10 transition-all'>
            {children}
          </div>
          <div className='flex-grow'></div>
        </div>
      </div>

      <EmojiSelector />
      <TrashPopup />
    </div>
  );
};

export default CombinedUi;
