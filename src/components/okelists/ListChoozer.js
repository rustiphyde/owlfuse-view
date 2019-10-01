import React, { Component, Fragment } from "react";
import OwlFuseButton from "../../util/OwlFuseButton";
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';

import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
// Icons
import ChoozByListIcon from "../icon/ChoozByListIcon";
// Redux
import { connect } from "react-redux";
import { choozByList, clearSuccess } from "../../redux/actions/dataActions";

const styles = theme => ({
    ...theme.themeMinusPalette,
})

class ListChoozer extends Component {
  state ={
      open: false,
      success: {},
      errors: {}
  };
  UNSAFE_componentWillReceiveProps(nextProps){
    if(nextProps.UI.success){
        this.setState({ success: nextProps.UI.success });
    }
    }
  handleOpen = () => {
    this.setState({ open: true });
    this.props.choozByList(this.props.okeId);
    this.setState({ success: this.state.success });
  };
  handleClose = () => {
    this.setState({ open: false });
    this.setState({ success: {} })
    this.props.clearSuccess();
  };

  render() {
    const { classes, user: { authenticated }, 
    UI: { loading } 
    } = this.props;
    const dialogMarkup = loading ? (
        <CircularProgress className={classes.progress}/>
    ) : (
        <Fragment>
        {this.state.success.message && (<DialogTitle variant="h5">
                   {this.state.success.message}
                </DialogTitle>)}
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary" variant="contained">
                        OK
                    </Button>
                    <Button onClick={this.handleOpen} color="primary" variant="contained">
                        NEXT
                    </Button>
                </DialogActions>
                </Fragment>
    )
    const choozButton = authenticated ? (
     <Fragment>
                <OwlFuseButton tip="CHOOZ FROM THIS LIST"
                onClick={this.handleOpen}>
                <ChoozByListIcon color="primary" className="icon2"/>
                </OwlFuseButton>
                <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                fullWidth
                maxWidth="sm"
                className="container"
                >
                {dialogMarkup}
                </Dialog>
            </Fragment>
        ) : null;
    return choozButton;
  }
}
ListChoozer.propTypes = {
classes: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  okeId: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  choozByList: PropTypes.func.isRequired,
  clearSuccess: PropTypes.func.isRequired
 
};

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = {
  choozByList,
  clearSuccess
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)((ListChoozer)));
