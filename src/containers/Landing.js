import React from 'react';

import API from 'api';
import splash02 from 'assets/splash-02.svg';
import splash03 from 'assets/splash-03.svg';
import splash04 from 'assets/splash-04.svg';
import splash05 from 'assets/splash-05.svg';
import splash06 from 'assets/splash-06.svg';
import splash07 from 'assets/splash-07.svg';
import likeometer from 'assets/likeometer.svg';

const getRandomImage = () => {
  const images = [
    splash02,
    splash03,
    splash04,
    splash05,
    splash06,
    splash07,
  ];

  const min = 0;
  const max = images.length - 1;
  const previewIndex = Math.floor(Math.random() * (max - min + 1)) + min;

  return images[previewIndex];
};

const Landing = () => {
  const onLoginClick = () => {
    API.auth.login();
  };

  return (
    <div className={'landing'}>
      <div className={'likeometer'}>
        <img src={likeometer} alt={''} />
      </div>
      <div className={'preview'}>
        <img src={getRandomImage()} alt={'Likeometer'} />
      </div>
      <div className={'login-button'}>
        <button type={'button'} onClick={onLoginClick}>
          Войти через
          <i className={'fa fa-vk'} />
        </button>
      </div>
    </div>
  );
};

export default Landing;
