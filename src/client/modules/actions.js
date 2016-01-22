import app from './app/actions';
import shows from './shows/actions';
import calendars from './calendars/actions';

export default {
    ...app,
    ...shows,
    ...calendars,
};
