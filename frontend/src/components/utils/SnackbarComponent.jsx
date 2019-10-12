// REACT
import React, { Component, Fragment }               from 'react';
import Proptypes                                    from 'prop-types';
import classNames                                   from 'classnames';

// LODASH
import {
    isString                             
}                                                   from 'lodash';

// MATERIAL UI
import { withStyles }                               from '@material-ui/core/styles';
import {
    IconButton, SnackbarContent
}                                                   from '@material-ui/core';
import { 
    CheckCircle as CheckCircleIcon, 
    Error as ErrorIcon, Info as InfoIcon, 
    Close as CloseIcon, Warning as WarningIcon 
}                                                   from '@material-ui/icons';
import {
    green, amber
}                                                   from '@material-ui/core/colors';

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

const styles = theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.dark,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
});


class SnackbarComponent extends Component {

    /* Props
    * ------------------------------------------------
    *   @prop { object }          className                 - Object representing the stylesheet class applied to the component. 
    *   @prop { string }          message                   - String representing the message to be displayed.
    *   @prop { function }        onClose                   - Callback function applied on onClose event.
    *   @prop { string }          variant                   - String information the type of toast notification like success, error, message, info.
    */

    constructor(props) {
        super(props);
    }

    // Lifecycle methods
    render() {
        const { classes, className, message, onClose, variant, ...other } = this.props;
        const Icon = isString(variant) && variantIcon[variant];

        return (
            <SnackbarContent
                className={ classNames(className, isString(variant) && classes[variant]) }
                aria-describedby="client-snackbar"
                message={
                    <span id="client-snackbar" className={classes.message}>
                    { isString(variant) && <Icon className={classNames(classes.icon, classes.iconVariant)} /> }
                    {message}
                    </span>
                }
                action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        className={classes.close}
                        onClick={onClose}
                    >
                        <CloseIcon className={classes.icon} />
                    </IconButton>,
                ]}
                {...other}
            />
        );
    }
}

SnackbarComponent.proptypes = {
    classes: Proptypes.object.isRequired
}

export default withStyles(styles)(SnackbarComponent);