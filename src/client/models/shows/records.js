import {Record, List, Map, Set, OrderedMap} from 'immutable';

const Item = new Record({
    'id': null,
    'bands': new List(),
    'date': null,
    'venue': null,
    'time': null,
    'soldOut': null,
    'pit': null,
    'multiDay': null,
    'ages': null,
    'price': null,
});

const Shows = new Record({
    isFetching: false,
    didInvalidate: false,
    lastUpdated: null,
    items: new List(), // List of Items
});

export default {
    Item,
    Shows,
};
