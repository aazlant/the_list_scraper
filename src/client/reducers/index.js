// #TODO: refactor with immutablejs

import { combineReducers } from 'redux';
import {
  INVALIDATE_SHOWS,
  REQUEST_SHOWS, RECEIVE_SHOWS,
  SET_FILTER_BY_VENUE, CLEAR_FILTER_BY_VENUE,
} from '../actions';


const filter = (state = {
    venues: [],
}, action )=> {
    switch (action.type) {

    case SET_FILTER_BY_VENUE:
        return Object.assign({}, state, {
            venues: [...action.venues],
        });

    case CLEAR_FILTER_BY_VENUE:
        return Object.assign({}, state, {
            venues: [],
        });

    default:
        return state;
    }
};

const shows = (state = {
    isFetching: false,
    didInvalidate: false,
    items: [],
}, action)=> {
    switch (action.type) {

    case INVALIDATE_SHOWS:
        return Object.assign({}, state, {
            didInvalidate: true,
        });

    case REQUEST_SHOWS:
        return Object.assign({}, state, {
            isFetching: true,
            didInvalidate: false,
        });

    case RECEIVE_SHOWS:
        return Object.assign({}, state, {
            isFetching: false,
            didInvalidate: false,
            items: action.items,
            lastUpdated: action.receivedAt,
        });

    default:
        return state;

    }
};

const rootReducer = combineReducers({
    shows,
    filter,
});

export default rootReducer;
