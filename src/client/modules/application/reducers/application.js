import {Record, List, Map, Set, OrderedMap} from 'immutable';
import {Application} from '../records/application';
import {Event} from '../../calendars/records/calendars';

import {
  LOGIN_MODAL_TOGGLE,
  EVENT_MODAL_TOGGLE,
} from '../actions';

const initialAppState = new Application();

export default (state = initialAppState, action )=> {
    switch (action.type) {

    case LOGIN_MODAL_TOGGLE:
        return state
                .set('loginModalOpen', (!state.get('loginModalOpen')));

    case EVENT_MODAL_TOGGLE:
        return state
                .set('eventModal', {
                    'open': (!state.get('eventModal').open),
                    'event': new Event(action.event),
                });

    default:
        return state;
    }
};
