import {Record, List, Map, Set, OrderedMap} from 'immutable';
import {Application} from '../records/application';
import {Event} from '../../calendars/records/calendars';

import {
  LOGIN_MODAL_TOGGLE,
  EVENT_MODAL_TOGGLE,
  USER_AUTHENTICATED,
  GET_GEOLOCATION,
} from '../actions';

const initialAppState = new Application();

export default (state = initialAppState, action )=> {
    switch (action.type) {

    case GET_GEOLOCATION:
        console.log(action);
        const longitude = action.payload.coords.longitude;
        const latitude = action.payload.coords.latitude;
        return state
                .set('geolocation', {
                   latitude,
                   longitude,
                });

    case LOGIN_MODAL_TOGGLE:
        return state
                .set('loginModalOpen', (!state.get('loginModalOpen')));

    case EVENT_MODAL_TOGGLE:
        return state
                .set('eventModal', {
                    'open': (!state.get('eventModal').open),
                    'event': new Event(action.event),
                });

    case USER_AUTHENTICATED:
        return state
                .set('auth', action.jwt);

    default:
        return state;
    }
};
