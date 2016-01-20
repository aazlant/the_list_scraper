import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import configureStore from './store/configureStore';
import * as actions from './modules/actions';

const store = configureStore();
const { dispatch } = store;

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

dispatch(actions.initializeApp());
