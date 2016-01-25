import { combineReducers } from 'redux';
import application from './application/reducers';
import shows from './shows/reducers';
import calendars from './calendars/reducers';


export default combineReducers({
    ...application,
    ...shows,
    ...calendars,
});
