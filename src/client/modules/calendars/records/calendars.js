import {Record, List, Map, Set, OrderedMap} from 'immutable';

const Event = new Record({
    'date': null,
    'show': null,
});

const Calendar = new Record({
    'events': new List(), // list of Events
});

export default {
    Calendar,
    Event,
};
