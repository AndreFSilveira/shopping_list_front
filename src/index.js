import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Routes from './app/config/routes';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux'
import promise from 'redux-promise'
import multi from 'redux-multi'
import thunk from 'redux-thunk'
import reducers from './app/config/reducers'
import { applyMiddleware, createStore } from 'redux'
import configAxios from './app/config/configAxios'

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
  && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = applyMiddleware(multi, thunk, promise)(createStore)(reducers,
  devTools)

configAxios();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename="/">
      <Routes />
    </BrowserRouter>
  </Provider>
, document.getElementById('root'));

serviceWorker.unregister();