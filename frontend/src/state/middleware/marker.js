// AXIOS
import { instance as axios }                        from '../utils/axios';

// LODASH
import {
    get, toLower 
}                                                   from 'lodash';

// ACTION CREATIONS
import { 
    markerListSuccess, markerListFail,
    updateMarkerStart, updateMarkerSuccess,
    updateMarkerFail, searchGeoLocationSuccess,
    searchGeoLocationFail, resetSearchResults
}                                                   from '../actions/marker';

// UTILS
import { filterResults }                            from '../utils/utils';

// IMPORT CONFIG
import { default as configJSON }                    from '../../config';


export const fetchMarkerList = () => {
    return (dispatch, getState) => {

        const markerListLoader = () => {

            axios
            .get('/marker-list', {
                timeout: 10000
            })
            .then(res => {
                dispatch(markerListSuccess(res.data));
            })
            .catch(err => {
                dispatch(markerListFail(err.message));
            });
        }
        
        markerListLoader();
    };
};

export const updateMarkers = (data) => {
    return (dispatch, getState) => {

        dispatch(updateMarkerStart());
  
        axios({
            method: "post",
            url: "/marker-update",
            data: data
        })
        .then(res => {
            dispatch(updateMarkerSuccess());
            dispatch(fetchMarkerList());
        })
        .catch(err => {
            dispatch(updateMarkerFail(err.message));
        });
    };
};


export const addMarker = (data) => {
    return (dispatch, getState) => {
        
        const tempMarkers = [...get(getState(), "markerList.markers", [])];
        const found = tempMarkers.find((marker) => {
            return ( (toLower(marker.name) == toLower(data.name)) && (marker.lat == data.lat) && (marker.lng == data.lng) );
        });
        !found && tempMarkers.push(data);

        dispatch(updateMarkers(tempMarkers));
  
    };
};

export const deleteMarker = (id) => {
    return (dispatch, getState) => {
        
        const tempMarkers = [...get(getState(), "markerList.markers", [])];
        const temp = tempMarkers.filter((marker) => {
            return marker.id != id 
        });
        
        dispatch(updateMarkers(temp));
  
    };
};

export const searchGeoLocation = (address) => {
    return (dispatch, getState) => {

        const { applicationKey } = configJSON;

        dispatch(resetSearchResults());
    
        axios
        .get(`/search-geo-location?address=${address}&key=${applicationKey}`, {
        })
        .then(res => {
            dispatch(searchGeoLocationSuccess(filterResults(res.data)));
        })
        .catch(err => {
            dispatch(searchGeoLocationFail(err.message));
        });
    };
}
