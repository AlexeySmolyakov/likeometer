import React from 'react';
import PropTypes from 'prop-types';

import API from 'api';
import { getRandomImage } from 'helpers';
import likeometer from 'assets/likeometer.svg';

const Landing = props => {
  const { onLogin } = props;

  const onLoginClick = () => {
    API.auth.login()
      .then(response => {
        onLogin(response.session.user);
      })
      .catch(e => {
        console.warn(e);
      });
  };

  return (
    <div className="landing">
      <div className="likeometer">
        <img src={likeometer} alt="Likeometer" />
      </div>
      <div className="preview">
        <img src={getRandomImage()} alt="Likeometer" />
      </div>
      <div className="login-button">
        <button type="button" onClick={onLoginClick}>
          Войти через VK
        </button>
      </div>
    </div>
  );
};

Landing.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Landing;
