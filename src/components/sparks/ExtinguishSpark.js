import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import OwlFuseButton from '../../util/OwlFuseButton';

// MUI Stuff
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
// Icons
import ExtinguishIcon from '../icons/ExtinguishIcon';

import { connect } from 'react-redux';
import { extinguishSpark } from '../../redux/actions/dataActions';

const styles = {
}


class ExtinguishSpark extends Component {
    state = {
        open: false
    };
    handleOpen = () => {
        this.setState({ open: true });
    }
    handleClose = () => {
        this.setState({ open: false });
    }
    extinguishSpark = () => {
        this.props.extinguishSpark(this.props.sparkId)
        this.setState({ open: false });
    }
    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <hr />
                <OwlFuseButton tip="EXTINGUISH THIS SPARK"
                onClick={this.handleOpen}
                btnClassName ={classes.deleteButton}>
                <ExtinguishIcon color="primary" className="icon3"/>
                </OwlFuseButton>
                <span className="warning-label"><b>IN CASE OF EMERGENCY</b></span>
                <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                fullWidth
                maxWidth="sm"
                >
                <DialogTitle variant="h5" className="orng">
                   Are you sure you wish to extinguish all light from this spark? This action is irreversible.
                </DialogTitle>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary" variant="contained">
                        CANCEL
                    </Button>
                    <Button onClick={this.extinguishSpark} color="primary" variant="contained">
                        EXTINGUISH
                    </Button>
                </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

ExtinguishSpark.propTypes = {
    extinguishSpark: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    sparkId: PropTypes.string.isRequired
}


export default connect(null, { extinguishSpark })(withStyles(styles)(ExtinguishSpark));
