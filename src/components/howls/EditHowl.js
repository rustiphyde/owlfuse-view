import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Dialog, DialogContent, DialogActions, DialogTitle } from '@material-ui/core';


const styles = {

};

class EditHowl extends Component(){
    render(){

        const { classes, howl } = this.props;

        return(
            <div></div>
        )
    }
}

EditHowl.propTypes = {
    classes: PropTypes.object.isRequired,
    howl: PropTypes.object.isRequired
}

export default withStyles(styles)(EditHowl);