import { combineReducers } from 'redux';
import shows from './shows/reducers';
import calendars from './calendars/reducers';

export default combineReducers({
    ...shows,
    ...calendars,
});
