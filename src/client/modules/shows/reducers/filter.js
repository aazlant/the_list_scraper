import {Record, List, Map, Set, OrderedMap} from 'immutable';
import {Filter} from '../records/filters';

import {
  SET_FILTER_BY_VENUE, CLEAR_FILTER_BY_VENUE,
  SET_FILTER_BY_BAND, CLEAR_FILTER_BY_BAND,
} from '../actions';

const initialFilterState = new Filter();

export default (state = initialFilterState, action )=> {
    switch (action.type) {

    case SET_FILTER_BY_VENUE:
        return state
                .set('venues', new List(action.venues));

    case CLEAR_FILTER_BY_VENUE:
        return state
                .set('venues', new List());

    case SET_FILTER_BY_BAND:
        return state
                .set('bands', new List(action.bands));

    case CLEAR_FILTER_BY_BAND:
        return state
                .set('bands', new List());

    default:
        return state;
    }
};
