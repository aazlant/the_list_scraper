import { combineReducers } from 'redux';
import {
  INVALIDATE_SHOWS,
  REQUEST_SHOWS, RECEIVE_SHOWS,
} from '../actions';


function shows(state = {
    isFetching: false,
    didInvalidate: false,
    items: [],
}, action) {
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
}

const rootReducer = combineReducers({
    shows,
});

export default rootReducer;
