import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../modules/reducers';
import { browserHistory } from 'react-router';
import { syncHistory, routeReducer } from 'react-router-redux';

const reduxRouterMiddleware = syncHistory(browserHistory);

const reducer = combineReducers({
    ...rootReducer,
    routing: routeReducer,
});

const createStoreWithMiddleware = compose(
applyMiddleware(
  thunkMiddleware,
  reduxRouterMiddleware,
  createLogger()
),
window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

export default function configureStore(initialState) {
    const store = createStoreWithMiddleware(reducer, initialState);

    reduxRouterMiddleware.listenForReplays(store);

    if (module.hot) {
      // Enable Webpack hot module replacement for reducers
        module.hot.accept('../modules/reducers', () => {
            const nextRootReducer = require('../modules/reducers');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
