export const SET_FILTER_BY_VENUE = 'ADD_FILTER_BY_VENUE';
export const CLEAR_FILTER_BY_VENUE = 'CLEAR_FILTER_BY_VENUE';
export const SET_FILTER_BY_BAND = 'ADD_FILTER_BY_BAND';
export const CLEAR_FILTER_BY_BAND = 'CLEAR_FILTER_BY_BAND';


export function setVenueFilter(_, venues) {
    const finalVenues = [];
    for (const venue in venues) {
        finalVenues.push(venues[venue].label);
    }
    return {
        type: SET_FILTER_BY_VENUE,
        venues: finalVenues,
    };
}

export function clearVenueFilter() {
    return {
        type: CLEAR_FILTER_BY_VENUE,
    };
}

export function setBandFilter(_, bands) {
    const finalBands = [];
    for (const band in bands) {
        finalBands.push(bands[band].label);
    }
    return {
        type: SET_FILTER_BY_BAND,
        bands: finalBands,
    };
}

export function clearBandFilter() {
    return {
        type: CLEAR_FILTER_BY_BAND,
    };
}
