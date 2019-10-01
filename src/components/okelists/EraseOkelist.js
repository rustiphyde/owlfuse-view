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
import EraseOkelistIcon from '../icon/EraseOkelistIcon';


import { connect } from 'react-redux';
import { eraseOkelist } from '../../redux/actions/dataActions';

const styles = {
    deleteButton: {
        float: 'right'
    }
}

class EraseOkelist extends Component {
    state = {
        open: false
    };
    handleOpen = () => {
        this.setState({ open: true });
    }
    handleClose = () => {
        this.setState({ open: false });
    }
    eraseOkelist = () => {
        this.props.eraseOkelist(this.props.okeId)
        this.setState({ open: false });
    }
    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <OwlFuseButton tip="ERASE THIS OKELIST"
                onClick={this.handleOpen}
                btnClassName ={classes.deleteButton}>
                <EraseOkelistIcon color="primary" className="icon3"/>
                </OwlFuseButton>
                <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                fullWidth
                maxWidth="sm"
                className="container"
                >
                <DialogTitle variant="h5">
                   Are you sure you wish to erase this Oke List? This action is irreversible.
                </DialogTitle>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary" variant="contained">
                        CANCEL
                    </Button>
                    <Button onClick={this.eraseOkelist} color="primary" variant="contained">
                        ERASE
                    </Button>
                </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

EraseOkelist.propTypes = {
    eraseOkelist: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    okeId: PropTypes.string.isRequired
}


export default connect(null, { eraseOkelist })(withStyles(styles)(EraseOkelist));
