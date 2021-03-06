export const ADD_EVENT_TO_CURRENT_CALENDAR = 'ADD_EVENT_TO_CURRENT_CALENDAR';
export const REMOVE_EVENT_FROM_CURRENT_CALENDAR = 'REMOVE_EVENT_FROM_CURRENT_CALENDAR';


export function addEventToCurrentCalendar(event, boundActions) {
    return {
        type: ADD_EVENT_TO_CURRENT_CALENDAR,
        event: event,
        boundActions: boundActions,
    };
}

export function removeEventFromCurrentCalendar(event) {
    return {
        type: REMOVE_EVENT_FROM_CURRENT_CALENDAR,
        event: event,
    };
}
