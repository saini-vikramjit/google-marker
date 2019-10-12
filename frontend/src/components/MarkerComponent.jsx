// REACT
import React, { Component }                         from 'react';
import Proptypes                                    from 'prop-types';

// MATERIAL UI
import { withStyles }                               from '@material-ui/core/styles';
import { 
    Typography, Paper, Grid, Button
}                                                   from '@material-ui/core';


// Component style
const styles = theme => ({
    markerArea: {
        display: 'flex',
        justifyContent: 'left',
        flexWrap: 'wrap',
        padding: theme.spacing.unit,
        borderRadius: "5px",
        background: "#ffffff",
        borderWidth: "thin",
        borderStyle: "solid",
        borderColor: "#aaa"
    },
    actionButton: {
        marginTop: "10px"
    },

});

class MarkerComponent extends Component {

    /* Props
    * ------------------------------------------------
    *   @prop { string }          lat                   - String representing the location latitude.
    *   @prop { string }          lng                   - String representing the location longitude.
    *   @prop { string }          name                  - String representing the location name.
    *   @prop { array }           actionButtons         - Array providing the list of button objects.
    */

    constructor(props) {
        super(props);
    }

    // Lifecycle methods
    render() {
        const { classes, lat, lng, name, key, actionButtons } = this.props;
        
        return (
            <Grid 
                item md={3} lg={6} 
                container={true} 
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                key = { key }
            >
                <Paper 
                    className={ classes.markerArea }
                >
                    <Grid container >
                        <Grid item md={12} >
                            <Typography variant="subtitle1" >
                                {name}
                            </Typography>
                        </Grid>
                        <Grid item md={12} >
                            <Typography variant="body2" >
                                {`Latitude: ${lat}`}
                            </Typography>
                        </Grid>
                        <Grid item md={12} >
                            <Typography variant="body2" >
                                {`Longitude: ${lng}`}
                            </Typography>
                        </Grid>
                        <Grid item md={12} container >
                        { 
                            actionButtons.map( (button) => {

                                const { key, label, onClick, disabled = false } = button;
                                return (
                                    <Grid item md={6} key= {key}>
                                        <Button 
                                            variant="contained"
                                            color="secondary"
                                            onClick= { onClick }
                                            className = { classes.actionButton }
                                            disabled = { disabled }
                                        >
                                            { label }
                                        </Button>
                                    </Grid>
                                );
                            })
                        }
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        );
    }
}

MarkerComponent.propTypes = {
    classes: Proptypes.object.isRequired
}
  
export default withStyles(styles)(MarkerComponent);