import {Record, List, Map, Set, OrderedMap} from 'immutable';
import {Application} from '../records/application';

import {
  LOGIN_MODAL_TOGGLE,
} from '../actions';

const initialAppState = new Application();

export default (state = initialAppState, action )=> {
    switch (action.type) {

    case LOGIN_MODAL_TOGGLE:
        return state
                .set('loginModalOpen', (!state.get('loginModalOpen')));

    default:
        return state;
    }
};
