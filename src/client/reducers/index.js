import { combineReducers } from 'redux';
import filter from './filter';
import shows from './shows';

const rootReducer = combineReducers({
    shows,
    filter,
});

export default rootReducer;
