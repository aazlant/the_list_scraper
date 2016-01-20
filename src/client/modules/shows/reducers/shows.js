import {Record, List, Map, Set, OrderedMap} from 'immutable';
import {Shows, Item} from '../records/shows';

import {
  INVALIDATE_SHOWS,
  REQUEST_SHOWS, RECEIVE_SHOWS,
} from '../actions';


const initialShowsState = new Shows();

export default (state = initialShowsState, action)=> {
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
