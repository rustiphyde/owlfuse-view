import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { cancelRequest, getAllSentFuses } from '../../redux/actions/dataActions';


import OwlFuseButton from '../../util/OwlFuseButton';
import RejectRequestIcon from '../icons/RejectRequestIcon';
// MUI Stuff
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {

}

class CancelButton extends Component {
    state = {
        open: false
    }
    handleOpen = () => {
        this.setState({ open: true });
    }
    handleClose = () => {
        this.setState({ open: false });
    }
    cancelRequest = () => {
        this.props.cancelRequest(this.props.reqId);
        this.setState({ open: false });
        setTimeout(() => this.props.getAllSentFuses(), 4000);
    }
    render(){
        const { classes } = this.props;
        return(
            <Fragment>
                <OwlFuseButton
                tip="CANCEL FUSE REQUEST"
                onClick={this.handleOpen}
                btnClassName={classes.acceptBtn}

                >
                <RejectRequestIcon className="icon12 orange foam"/>
                </OwlFuseButton>
                <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                fullWidth
                maxWidth="sm"
                >
                <DialogTitle variant="h5" className="orng">
                   Are you sure you wish to cancel this fuse request?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary" variant="contained">
                        KEEP
                    </Button>
                    <Button onClick={this.cancelRequest} color="primary" variant="contained">
                        CANCEL
                    </Button>
                </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

CancelButton.propTypes = {
    reqId: PropTypes.string.isRequired,
    cancelRequest: PropTypes.func.isRequired,
    getAllSentFuses: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}

export default connect(null, { cancelRequest, getAllSentFuses })(withStyles(styles)(CancelButton));