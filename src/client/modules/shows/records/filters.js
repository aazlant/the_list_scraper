import {Record, List, Map, Set, OrderedMap} from 'immutable';

const Filter = new Record({
    venues: new List(),
    bands: new List(),
});

export default {
    Filter,
};
