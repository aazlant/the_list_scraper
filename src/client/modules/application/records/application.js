import {Record, List, Map, Set, OrderedMap} from 'immutable';
import {Event} from '../../calendars/records/calendars';

const Application = new Record({
    'loginModalOpen': false,
    'geolocation': {
        'longitude': null,
        'latitude': null,
    },
    'eventModal': {
        'open': false,
        'event': new Event(),
    },
    'auth': null,
});

export default {
    Application,
};
