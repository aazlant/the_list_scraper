import {Record, List, Map, Set, OrderedMap} from 'immutable';
import {Filter} from '../models/filters/records';
import {Shows, Item} from '../models/shows/records';

import { combineReducers } from 'redux';
import {
  INVALIDATE_SHOWS,
  REQUEST_SHOWS, RECEIVE_SHOWS,
  SET_FILTER_BY_VENUE, CLEAR_FILTER_BY_VENUE,
  SET_FILTER_BY_BAND, CLEAR_FILTER_BY_BAND,
} from '../actions';


// Initial States

const initialFilterState = new Filter();
const initialShowsState = new Shows();

// Reducers

const filter = (state = initialFilterState, action )=> {
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

const shows = (state = initialShowsState, action)=> {
    switch (action.type) {

    case INVALIDATE_SHOWS:
        return state
                .set('didInvalidate', true);

    case REQUEST_SHOWS:
        return state
                .set('isFetching', true)
                .set('didInvalidate', false);

    case RECEIVE_SHOWS:
        const items = action.items.map(item => new Item(item));
        return state
                .set('isFetching', false)
                .set('didInvalidate', false)
                .set('items', new List(items))
                .set('lastUpdated', action.receivedAt);
    default:
        return state;
    }
};

const rootReducer = combineReducers({
    shows,
    filter,
});

export default rootReducer;
