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
            id: (events.size + 1), // Question: I think this is ugly - ordered set?
            start: new Date(action.event.date),
            end: new Date(action.event.date),
            title: `${action.event.show.venue}`,
            show: action.event.show,
            boundActions: action.boundActions,
        })));

    case REMOVE_EVENT_FROM_CURRENT_CALENDAR:
        return state.updateIn(['events'], (events)=> events.filter(
            (event)=> (event.id !== action.event.id)
        ));

    default:
        return state;
    }
};
