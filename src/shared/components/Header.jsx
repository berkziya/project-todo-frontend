import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  const isCurrentLanguage = (language) => i18n.language === language;

  const navigate = useNavigate();
  return (
    <header className='text-gray-400 py-7'>
      <div className='flex justify-center md:justify-end mx-20 space-x-20'>
        <button
          onClick={() => {
            navigate('/project-todo-frontend/about');
          }}
        >
          {t('about')}
        </button>{' '}
        <div className='space-x-4'>
          <button
            onClick={() => changeLanguage('en')}
            className={isCurrentLanguage('en') ? 'font-bold' : ''}
          >
            EN
          </button>
          <button
            onClick={() => changeLanguage('tr')}
            className={isCurrentLanguage('tr') ? 'font-bold' : ''}
          >
            TR
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
