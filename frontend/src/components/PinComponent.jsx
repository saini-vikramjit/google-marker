// REACT
import React, { Component }                         from 'react';
import Proptypes                                    from 'prop-types';

// MATERIAL UI
import { withStyles }                               from '@material-ui/core/styles';


// Component style
const styles = theme => ({
    pin: {
        width: "30px",
        height: "30px",
        borderRadius: "70% 45% 70% 0",
        background: "#00cae9",
        position: "absolute",
        transform: "rotate(-45deg)",
        left: "50%",
        top: "50%",
        margin: "-20px 0 0 -20px",
        backgroundColor: "#e7463c",
        cursor: 'pointer'
    },

});

class PinComponent extends Component {

    /* Props
    * ------------------------------------------------
    *   @prop { string }          name                  - String representing the location name.
    */

    constructor(props) {
        super(props);
    }

    // Lifecycle methods
    render() {
        const { classes, name } = this.props;
        
        return (
            <div className={ classes.pin }
                title= { name }
            />
        );
    }
}

PinComponent.propTypes = {
    classes: Proptypes.object.isRequired
}
  
export default withStyles(styles)(PinComponent);