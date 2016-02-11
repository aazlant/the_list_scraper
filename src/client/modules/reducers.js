import application from './application/reducers';
import shows from './shows/reducers';
import calendars from './calendars/reducers';


export default {
    ...application,
    ...shows,
    ...calendars,
};
