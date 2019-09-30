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
import EmptyIcon from '../icons/EmptyIcon';

import { connect } from 'react-redux';
import { emptyBoozula } from '../../redux/actions/dataActions';

const styles = {

}

class EmptyBoozula extends Component {
    state = {
        open: false
    };
    handleOpen = () => {
        this.setState({ open: true });
    }
    handleClose = () => {
        this.setState({ open: false });
    }
    emptyBoozula = () => {
        this.props.emptyBoozula(this.props.boozId)
        this.setState({ open: false });
    }
    render() {
        const { classes } = this.props;
        return (
            <Fragment>
            <hr />
                <OwlFuseButton tip="EMPTY THIS BOOZULA"
                onClick={this.handleOpen}
                btnClassName ={classes.deleteButton}>
                <EmptyIcon color="primary" className="icon4"/>
                </OwlFuseButton>
                <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                fullWidth
                maxWidth="sm"
                className="container"
                >
                <DialogTitle variant="h5" className="rusty">
                   Are you sure you wish to empty this boozula? This action is irreversible.
                </DialogTitle>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary" variant="contained">
                        CANCEL
                    </Button>
                    <Button onClick={this.emptyBoozula} color="primary" variant="contained">
                        EMPTY
                    </Button>
                </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

EmptyBoozula.propTypes = {
    emptyBoozula: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    boozId: PropTypes.string.isRequired
}


export default connect(null, { emptyBoozula })(withStyles(styles)(EmptyBoozula));
