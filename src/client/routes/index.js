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

// Note: Look into a way to automate mapping routes.

render(
  <Provider store={store}>
    <div>
      <Router history={browserHistory}>
        <Route path="/" component={App}/>
        <Route path="/auth/google/callback" component={GoogleCallback}/>
      </Router>
    </div>
  </Provider>,
  document.getElementById('root')
);

dispatch(actions.initializeApp());
