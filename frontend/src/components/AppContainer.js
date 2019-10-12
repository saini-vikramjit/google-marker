// REDUX
import { connect }                                 from 'react-redux';

// COMPONENTS
import AppComponent                                from './AppComponent.jsx';

// MIDDLEWARE
import { 
    fetchMarkerList, addMarker, deleteMarker,
    searchGeoLocation
}                                                  from '../state/middleware/marker';

// ACTIONS
import {
    resetSearchResults, resetNotification
}                                                  from '../state/actions/marker';


const mapStateToProps = function(state) {
    return {
        markers:            state.markerList.markers,
        notificationMsg:    state.markerList.error,
        searchResults:      state.markerList.searchResults,
        displayResults:     state.markerList.displayResults,
        enableNotification: state.markerList.enableNotification
    }
} 

const mapDispatchToProps = {
    fetchMarkerList:       fetchMarkerList,
    addNewMarker:          addMarker,
    deleteMarker:          deleteMarker,
    searchGeoLocation:     searchGeoLocation,
    resetSearchResults:    resetSearchResults,
    resetNotification:     resetNotification
}

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(AppComponent);

export default AppContainer;

