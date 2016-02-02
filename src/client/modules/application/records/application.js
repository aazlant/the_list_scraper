import {Record, List, Map, Set, OrderedMap} from 'immutable';
import {Event} from '../../calendars/records/calendars';

const Application = new Record({
    'loginModalOpen': false,
    'eventModal': {
        'open': false,
        'event': new Event(),
    },
});

export default {
    Application,
};
