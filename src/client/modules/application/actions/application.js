import * as shows from '../../shows/actions';
import jwt from 'jsonwebtoken';
import { push } from 'react-router-redux';

export const APP_INITIALIZE = 'APP_INITIALIZE';
export const LOGIN_MODAL_TOGGLE = 'LOGIN_MODAL_TOGGLE';
export const EVENT_MODAL_TOGGLE = 'EVENT_MODAL_TOGGLE';
export const USER_AUTHENTICATED = 'USER_AUTHENTICATED';

const googleAuth = 'auth.google';
const auth = 'auth';

const authenticate = (url)=> (dispatch, getState) => {
    if (url.pathname === '/auth/google/callback') {
        const code = url.query.code;
        fetch(`/api/auth/google`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code: code,
            }),
        })
            .then((response)=> response.json())
            .then((json) => {
                localStorage.removeItem(googleAuth);
                localStorage.setItem(auth, json.token);
                dispatch(push('/'));
                dispatch({type: USER_AUTHENTICATED, jwt: json.token});
            });
        return;
    }
    const authFromStorage = localStorage.getItem(auth);
    if (!(authFromStorage === null)) {
        dispatch(push('/'));
        dispatch({type: USER_AUTHENTICATED, jwt: authFromStorage});
    }
};

export const initializeApp = ()=> (dispatch, getState) => {
    const { routing: {location: pathname }} = getState();
    dispatch(shows.fetchShows());
    dispatch(authenticate(pathname));
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

export function getAuthRedirect() {
    return dispatch => {
        return fetch(`/api/auth/google/redirect`)
            .then((response)=> response.json())
            .then((json) => {
                localStorage.setItem(googleAuth, json.token);
                window.location = jwt.decode(json.token).url;
            });
    };
}

