import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../modules/reducers';

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  createLogger()
)(createStore);

export default function configureStore(initialState) {
    const store = createStoreWithMiddleware(rootReducer, initialState);

    if (module.hot) {
      // Enable Webpack hot module replacement for reducers
        module.hot.accept('../modules/reducers', () => {
            const nextRootReducer = require('../modules/reducers');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
