import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import VK from 'VK';

import './settings';
import App from './App';
import configureStore from './redux/configureStore';
import './styles/index.scss';

// INIT VK CLIENT
VK.init({ apiId: 3188729 });

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);