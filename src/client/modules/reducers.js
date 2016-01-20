import { combineReducers } from 'redux';
import shows from './shows/reducers';

export default combineReducers({
    ...shows,
});
