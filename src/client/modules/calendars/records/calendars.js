import {Record, List, Map, Set, OrderedMap} from 'immutable';

const Event = new Record({
    'id': null,
    'start': null,
    'end': null,
    'title': null,
    'show': null,
    'boundActions': null,
});

const Calendar = new Record({
    'events': new Set(), // set of Events
});

export default {
    Calendar,
    Event,
};
