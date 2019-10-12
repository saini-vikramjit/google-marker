// CONSTANTS
import types                         from '../types';


export const markerListSuccess = ( data ) => ({
    type: types.MARKER_LIST_SUCCESS,
    payload: {
        data
    }
});

export const markerListFail = ( error ) => ({
    type: types.MARKER_LIST_FAIL,
    payload: {
        error
    }
});

export const updateMarkerStart = () => ({
    type: types.MARKER_UPDATE_START
});

export const updateMarkerSuccess = () => ({
    type: types.MARKER_UPDATE_SUCCESS
});

export const updateMarkerFail = ( error ) => ({
    type: types.MARKER_UPDATE_FAIL,
    payload: {
        error
    }
});

export const searchGeoLocationSuccess = ( data ) => ({
    type: types.SEARCH_GEO_LOCATION_SUCCESS,
    payload: {
        data
    }
});

export const searchGeoLocationFail = ( error ) => ({
    type: types.SEARCH_GEO_LOCATION_FAIL,
    payload: {
        error
    }
});

export const resetSearchResults = ( ) => ({
    type: types.RESET_SEARCH_RESULTS
});

export const resetNotification = ( ) => ({
    type: types.RESET_NOTIFICATION
});