// NOTE: As the app picks up additional routes, this needs to be refactored.

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App.js';
import configureStore from '../../store/configureStore';
import * as actions from '../../modules/actions';

const store = configureStore();
const { dispatch } = store;

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

dispatch(actions.initializeApp());
