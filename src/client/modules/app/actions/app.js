import * as shows from '../../shows/actions';

export const APP_INITIALIZE = 'APP_INITIALIZE';

export const initializeApp = ()=> dispatch => {
    dispatch(shows.fetchShows());
    return {
        type: APP_INITIALIZE,
    };
};
