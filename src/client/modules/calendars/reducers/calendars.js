import {Record, List, Map, Set, OrderedMap} from 'immutable';
import {Calendar, Event} from '../records/calendars';

import {
  ADD_EVENT_TO_CURRENT_CALENDAR, REMOVE_EVENT_FROM_CURRENT_CALENDAR,
} from '../actions';

const initialCalendarState = new Calendar();

export default (state = initialCalendarState, action )=> {
    switch (action.type) {

    case ADD_EVENT_TO_CURRENT_CALENDAR:
        debugger;
        return state.get('events')
                .push({date: action.date, ...action});

    case REMOVE_EVENT_FROM_CURRENT_CALENDAR:
        debugger;
        return state
                .set('events', new List());

    default:
        return state;
    }
};
