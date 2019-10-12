// CONSTANTS
import types                                       from '../types';

const initialState = {
    markers:            [],
    inProgress:         false,
    isSuccess:          false,
    searchResults:      [],
    displayResults:     false,
    enableNotification: false, 
    error:              null
};

export default function markerListReducer(state = initialState, action) {
    switch (action.type){
            
        case types.MARKER_LIST_SUCCESS:
            return { ...state, 
                markers: action.payload.data
            };
            
        case types.MARKER_LIST_FAIL:
            return { ...state, 
                error: action.payload.error,
                enableNotification: true
            };
        
        case types.MARKER_UPDATE_START:
            return { ...state,
                inProgress: true
            };
            
        case types.MARKER_UPDATE_SUCCESS:
            return { ...state, 
                inProgress: false,
                isSuccess: true
            };
        
        case types.MARKER_UPDATE_FAIL:
            return {
                inProgress: false,
                error: action.payload.error,
                enableNotification: true
            }

        case types.SEARCH_GEO_LOCATION_SUCCESS:
            return { ...state, 
                searchResults: action.payload.data,
                displayResults: true
            };
            
        case types.SEARCH_GEO_LOCATION_FAIL:
            return { ...state, 
                error: action.payload.error,
                enableNotification: true
            };

        case types.RESET_SEARCH_RESULTS:
            return { ...state,
                searchResults: [],
                displayResults: false   
            }

        case types.RESET_NOTIFICATION:
            return { ...state, 
                enableNotification: false,
                msg: null
            };

        default:
            return state;
            
    }
}

