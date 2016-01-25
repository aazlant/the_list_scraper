import application from './application/actions';
import shows from './shows/actions';
import calendars from './calendars/actions';

export default {
    ...application,
    ...shows,
    ...calendars,
};
