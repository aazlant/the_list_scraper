import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';

import App from './root/containers/App.js';
import GoogleCallback from './googleCallback/containers/GoogleCallback.js';

import configureStore from '../store/configureStore';
import * as actions from '../modules/actions';

const store = configureStore();
const { dispatch } = store;

// TODO: move Router logic to routes.js

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}/>
      <Route path="auth/google/callback" component={GoogleCallback}/>
    </Router>
  </Provider>,
  document.getElementById('root')
);

dispatch(actions.initializeApp());
