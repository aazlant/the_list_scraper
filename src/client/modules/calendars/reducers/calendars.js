import {Record, List, Map, Set, OrderedMap} from 'immutable';
import {Calendar, Event} from '../records/calendars';

import {
  ADD_EVENT_TO_CURRENT_CALENDAR, REMOVE_EVENT_FROM_CURRENT_CALENDAR,
} from '../actions';

const initialCalendarState = new Calendar();

export default (state = initialCalendarState, action )=> {
    switch (action.type) {

    case ADD_EVENT_TO_CURRENT_CALENDAR:
        return state.updateIn(['events'], (events)=> events.add(new Event({
            start: action.event.date,
            end: action.event.date,
            title: `${action.event.show.venue}`,
        })));

    case REMOVE_EVENT_FROM_CURRENT_CALENDAR:
        return state
                .set('events', new List());

    default:
        return state;
    }
};
