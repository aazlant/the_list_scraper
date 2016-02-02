import * as shows from '../../shows/actions';

export const APP_INITIALIZE = 'APP_INITIALIZE';
export const LOGIN_MODAL_TOGGLE = 'LOGIN_MODAL_TOGGLE';
export const EVENT_MODAL_TOGGLE = 'EVENT_MODAL_TOGGLE';

export const initializeApp = ()=> dispatch => {
    dispatch(shows.fetchShows());
    return {
        type: APP_INITIALIZE,
    };
};

export function toggleEventModal(event) {
    return {
        type: EVENT_MODAL_TOGGLE,
        event: event,
    };
}

export function toggleLoginModal() {
    return {
        type: LOGIN_MODAL_TOGGLE,
    };
}
