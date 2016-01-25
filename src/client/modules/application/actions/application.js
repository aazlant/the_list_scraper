import * as shows from '../../shows/actions';

export const APP_INITIALIZE = 'APP_INITIALIZE';
export const LOGIN_MODAL_TOGGLE = 'LOGIN_MODAL_TOGGLE';

export const initializeApp = ()=> dispatch => {
    dispatch(shows.fetchShows());
    return {
        type: APP_INITIALIZE,
    };
};

export function toggleLoginModal() {
    return {
        type: LOGIN_MODAL_TOGGLE,
    };
}
