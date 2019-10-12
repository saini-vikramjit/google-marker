// REACT
import React, { Component, Fragment }                from 'react';
import classNames                                    from 'classnames';

// MATERIAL UI
import CssBaseline                                  from '@material-ui/core/CssBaseline';
import { withStyles }                               from '@material-ui/core/styles';
import { 
    Typography, TextField, Grid, 
    Button, Snackbar  
}                                                   from '@material-ui/core';

// GOOGLE MAP
import GoogleMapReact                               from 'google-map-react';

// LODASH
import {
    isEmpty, replace, toLower, now
}                                                   from 'lodash';

// COMPONENTS
import PinComponent                                 from './PinComponent.jsx';
import MarkerComponent                              from './MarkerComponent.jsx';

// UTILITY COMPONENT
import SnackbarComponent                            from './utils/SnackbarComponent.jsx';

// IMPORT CONFIG
import { default as configJSON }                    from '../config';


// Component style
const styles = theme => ({
    root: {
      display : 'flex'
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 3,
      height: '100vh',
      overflow: 'auto',
    },
    mapContainerArea: {
        display: 'flex',
        justifyContent: 'left',
        flexWrap: 'wrap',
        padding: theme.spacing.unit,
        height: '100vh',
        borderRadius: "5px",
        background: "#eeeeee",
        borderWidth: 'thin'
    },
    markerContainerArea: {
        display: 'flex',
        justifyContent: 'left',
        flexWrap: 'wrap',
        padding: theme.spacing.unit,
        borderRadius: "5px",
        background: "#eeeeee",
        borderWidth: 'thin'
    },
    searchAreaHidden: {
        display: "none"
    },
    searchButton: {
        marginTop: "28px"
    },
    markerListTitle: {
        padding: "5px 0px 5px 5px",
        backgroundColor: "#000",
        color: "#fff",
        borderRadius: "5px"
    },
    markerListTitleHidden: {
        display: "none"
    },
    markerListView: {
        paddingTop: "10px"
    },
    searchResultAreaHidden: {
        display: "none"
    }
});

class AppComponent extends Component {

    /* Props
    * ------------------------------------------------
    *   @prop { boolean }         displayResults            - Boolean repesenting to display the results or not.  
    *   @prop { string }          notificationMsg           - String representing the error message in case of failure.
    *   @prop { array }           markers                   - Array containing the markers.
    *   @prop { array }           searchResults             - Array containing the search results.
    *   @prop { boolean }         enableNotification        - Boolean repesenting to raise notification or not.  
    *   @prop { function }        fetchMarkerList           - Callback function to fetch the markers.
    *   @prop { function }        addNewMarker              - Callback function to add new marker.
    *   @prop { function }        deleteMarker              - Callback function to delete a marker.
    *   @prop { function }        searchGeoLocation         - Callback function to search the address. 
    *   @prop { function }        resetSearchResults        - Callback function to reset the search results. 
    *   @prop { function }        resetNotification         - Callback function to reset the notification flag. 
    */


    // Lifecycle methods
    constructor(props) {
        super(props);
        this.state = this._getInitialState();
    }

    componentDidMount(){
        this.props.fetchMarkerList();
    }

    static getDerivedStateFromProps(props, state) {

        if(props.displayResults !== state.displaySearchResults) {
            return {
                searchResults: props.searchResults,
                displaySearchResults: props.displayResults
            }
        }

        if(props.enableNotification !== state.showNotification) {
            return {
                showNotification: props.enableNotification,
                notificationMsg:  props.notificationMsg   
            }
        }

        if(props.markers !== state.markers) {
            return {
                markers: props.markers  
            }
        }

        return null;
    }

    render() {
        const { classes, searchResults } = this.props;
        const { address, showSearchArea, displaySearchResults, markers } = this.state;
        const { applicationKey, center, zoom } = configJSON;

        return (
            <Fragment>
                <div className={classNames(classes.root)} >
        
                    <CssBaseline />
          
                    <main className={classes.content}>

                        <Grid container spacing={16} >
                            <Grid item md={12} lg={8} className={classes.mapContainerArea}>
                                <GoogleMapReact
                                    bootstrapURLKeys={{ 
                                        key: applicationKey,
                                        language: "en"
                                    }}
                                    defaultCenter={ center }
                                    defaultZoom={ zoom }
                                    options = {{
                                        disableDefaultUI: false,
                                        mapTypeControl: true,
                                        streetViewControl: false,
                                        scrollwheel: false
                                    }}
                                >
                                    
                                    { this._handleDisplayPins() }

                                </GoogleMapReact>
                            </Grid>
                            <Grid 
                                container item md={12} lg={4} 
                                alignContent = "flex-start"
                                className={classes.markerContainerArea}
                                alignItems="center"
                                spacing= {8} 
                            >
                                <Grid item md={12}>
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        onClick={ this._handleShowAddAddress } 
                                    >
                                        Add Location
                                    </Button>
                                </Grid>
                                <Grid 
                                    item md={12} 
                                    container 
                                    spacing={8}
                                    className={classNames(!showSearchArea && classes.searchAreaHidden)} 
                                > 
                                    <Grid item md={8}>
                                        <TextField
                                            name="address"
                                            label="Search field"
                                            value={ address.value.name }
                                            onChange={ this._handleAddressChange }
                                            autoFocus = { false }
                                            required
                                            fullWidth
                                            margin="normal"
                                            error = { address.isInvalid }
                                        />
                                    </Grid>
                                    <Grid item md={4}>
                                        <Button 
                                            variant="contained" 
                                            color="primary"
                                            className = {classes.searchButton} 
                                            onClick={ this._handleSearch } 
                                            disabled={ address.isInvalid }
                                        >
                                            Search
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid item container className={ classNames(!displaySearchResults && classes.searchResultAreaHidden) }>
                                    <Grid  item md={12}>
                                        <Typography
                                            variant="h6" 
                                            gutterBottom 
                                            align="left"
                                            className={ classes.markerListTitle }  
                                        >
                                            Search results
                                        </Typography>
                                    </Grid>
                                    { this._displayResults() }
                                </Grid>
                                <Grid item container spacing={8} className={ classes.markerListView }>
                                    <Grid  item md={12}>
                                        <Typography
                                            variant="h6" 
                                            gutterBottom 
                                            align="left"
                                            className={classNames(classes.markerListTitle, isEmpty(markers) && classes.markerListTitleHidden)} 
                                        >
                                            Markers list
                                        </Typography>
                                    </Grid>
                                    { this._displayMarkers() }
                                </Grid>
                            </Grid>
                        </Grid>
                    </main>
                </div>
                { this._handleErrorResponse() } 
            </Fragment>  
        );
    }

    // User defined methods
    _getInitialState = () => {
        const initialState = {
            address: {
                value: {
                    name: "",
                    lat: "",
                    lng: ""
                },
                isInvalid: true,
                msg: ""
            },
            showSearchArea: false,
            displaySearchResults: false,
            markers: [],
            searchResults: [],
            showNotification: false,
            notificationMsg:  null
        }
        return initialState;
    }

    _handleAddressChange = (e) => {
        const { name, value } = e.target;
        const newAddressState = {
            value: {}
        }

        if(isEmpty(value)) {
            newAddressState.value.name = value;
            newAddressState.isInvalid= true;
            newAddressState.msg= "Please enter an address";
        } else {
            newAddressState.value.name = value;
            newAddressState.isInvalid= false;
            newAddressState.msg= "";
        }

        this.setState({ 
            address: newAddressState
        });
    }

    _handleShowAddAddress = () => {
        const { showSearchArea } = this.state;

        this.setState({
            showSearchArea: !showSearchArea
        });
    }

    _handleDisplayPins = () => {
        const { markers } = this.state;

        if ( !isEmpty(markers) ) {
            return markers.map((marker, index) => {
                return (
                    <PinComponent
                        key={index} 
                        lat={marker.lat}
                        lng={marker.lng}
                        name={marker.name}
                    />
                )
            })
        }
    }

    _displayMarkers = () => {
        const { classes } = this.props;
        const { markers } = this.state;

        if ( !isEmpty(markers) ) {    
            return markers.map(({ lat, lng, name, id }, i, markers) => {   
                
                return (
                    <MarkerComponent
                        key = { id }
                        lat={ lat }
                        lng={ lng }
                        name={ name }
                        actionButtons = {
                            [
                                { key: "edit", label: "Edit", onClick: this._handleEditMarker(id) },
                                { key: "delete", label: "Delete", onClick:  this._handleDeleteMarker(id) }
                            ]
                        }
                    />
                );
            })     
        }
    }

    _displayResults = () => {
        const { classes } = this.props;
        const { address, searchResults } = this.state;
        
        if ( !isEmpty(searchResults) ) {    
            return searchResults.map(({ lat, lng, name }, i) => {

                const disabled = !!( address.value.name == name && address.value.lat == lat && address.value.lng == lng);
                return (
                    <MarkerComponent
                        key = { i }
                        lat={ lat }
                        lng={ lng }
                        name={ name }
                        actionButtons = {
                            [
                                { key: "add", label: "Add", onClick: this._handleAddMarker(name, lat, lng), disabled: disabled }
                            ]
                        }
                    />
                );
            });
        } else {
            return (
                <Typography
                    variant="subtitle1"
                >
                    Sorry, No results found
                </Typography>
            )
        }
        
    }

    _handleSearch = () => {
        const { address: { value: { name } } } = this.state;

        const safeAddress = replace(toLower(name), /\s/g, '+');
        this.props.searchGeoLocation(safeAddress);
    }

    _handleAddMarker = (name, lat, lng) => () => {

        const data = {
            id: now(),
            name: name,
            lat: lat, 
            lng: lng 
        }
        this.props.addNewMarker(data);
    }

    _handleDeleteMarker = (id) => () => {
        
        this.props.deleteMarker(id);
    }

    _handleEditMarker = (id) => () => {
        const { markers } = this.state;
        const { resetSearchResults } = this.props;

        const filterMarkerArr = markers.filter((marker) => {
            return marker.id == id 
        });
        const currentMarker = filterMarkerArr[0];
        const newAddressState = {
            value: currentMarker,
            isInvalid: false,
            msg: ""
        }

        this.setState({ 
            address: newAddressState,
            showSearchArea: true,
            displaySearchResults: false,
            searchResults: []
        }, () => { resetSearchResults() }
        );

    }

    _handleErrorResponse = () => {

        const { classes } = this.props;
        const { showNotification, notificationMsg } = this.state;

        const varient = "error";

        return ( 
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                open={ showNotification }
                autoHideDuration={ 5000 }
                onClose={ this._handleNotificationClose }
                resumeHideDuration = { 500 }
            >
                <SnackbarComponent
                    variant= { varient }
                    className={classes.margin}
                    message={ notificationMsg }
                />
            </Snackbar>
            
        );
    }

    _handleNotificationClose = () => {

        const { resetNotification } = this.props;

        this.setState({
            ...this.state,
            showNotification: false,
            notificationMsg:  null  

        }, () => { resetNotification() } );
        
    }

}

export default withStyles(styles)(AppComponent);

