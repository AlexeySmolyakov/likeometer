import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import VK from 'VK';

import App from './App';
import './styles/index.scss';

// INIT VK CLIENT
VK.init({ apiId: 3188729 });

// const store = configureStore();

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);
