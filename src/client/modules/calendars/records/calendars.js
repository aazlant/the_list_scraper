import {Record, List, Map, Set, OrderedMap} from 'immutable';

const Event = new Record({
    'start': null,
    'end': null,
    'title': null,
});

const Calendar = new Record({
    'events': new List(), // list of Events
});

export default {
    Calendar,
    Event,
};
