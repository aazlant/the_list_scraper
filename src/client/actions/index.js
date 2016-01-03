import fetch from 'isomorphic-fetch';
export const REQUEST_SHOWS = 'REQUEST_SHOWS';
export const RECEIVE_SHOWS = 'RECEIVE_SHOWS';
export const INVALIDATE_SHOWS = 'INVALIDATE_SHOWS';

export function invalidateShows() {
    return {
        type: INVALIDATE_SHOWS,
    };
}

function requestShows() {
    return {
        type: REQUEST_SHOWS,
    };
}

function receiveShows(json) {
    return {
        type: RECEIVE_SHOWS,
        items: json,
        receivedAt: Date.now(),
    };
}

function fetchShows() {
    return dispatch => {
        dispatch(requestShows());
        return fetch(`/api/shows`)
            .then((response)=> response.json())
            .then((json) => {
                dispatch(receiveShows(json));
            });
    };
}

function shouldFetchShows(state) {
    const shows = state.shows;
    if (!shows.items) {
        return true;
    }
    if (shows.isFetching) {
        return false;
    }
    return shows.didInvalidate;
}

export function fetchShowsIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchShows(getState())) {
            return dispatch(fetchShows());
        }
    };
}
