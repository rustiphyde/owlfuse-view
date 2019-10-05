import React, { Component, Fragment } from "react";
import OwlFuseButton from "../../util/OwlFuseButton";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
// Icons
import ChoozByListIcon from "../icons/ChoozByListIcon";
// Redux
import { connect } from "react-redux";
import {
  choozByList,
  clearSuccess,
  clearErrors
} from "../../redux/actions/dataActions";

const styles = theme => ({
  ...theme.themeMinusPalette
});

class ListChoozer extends Component {
  state = {
    open: false,
    success: {},
    errors: {}
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.UI.success && !nextProps.UI.errors) {
      this.setState({ success: nextProps.UI.success });
      this.setState({ errors: {}})
    }
    if (nextProps.UI.errors && !nextProps.UI.success) {
      this.setState({ errors: nextProps.UI.errors });
      this.setState({ success: {}})
    }
  }
  handleOpen = () => {
    this.setState({ open: true });
    this.props.choozByList(this.props.okeId);
    this.setState({ success: this.state.success });
    this.setState({ errors: this.state.errors });
  };
  handleClose = () => {
    this.setState({ open: false });
    this.setState({ success: {} });
    this.setState({ errors: {} });
    this.props.clearSuccess();
    this.props.clearErrors();
  };

  render() {
    const {
      classes,
      user: { authenticated },
      UI: { loading }
    } = this.props;
    const dialogMarkup = loading ? (
      <CircularProgress className={classes.progress} />
    ) : (
      <Fragment>
        {this.state.success.message ? (
          <DialogTitle variant="h5" className="rusty oke-border">
            {this.state.success.message}
          </DialogTitle>
        ) : (<DialogTitle variant="h5" className="rusty oke-border">
            {this.state.errors.error}
          </DialogTitle>)}
        <DialogActions>
          <Button
            onClick={this.handleClose}
            color="primary"
            variant="contained"
          >
            OK
          </Button>
          {this.state.success.message && (
            <Button
              onClick={this.handleOpen}
              color="primary"
              variant="contained"
            >
              NEXT
            </Button>
          )}
        </DialogActions>
      </Fragment>
    );
    const choozButton = authenticated ? (
      <Fragment>
        <OwlFuseButton tip="CHOOZ FROM THIS LIST" onClick={this.handleOpen}>
          <ChoozByListIcon className="icon2 rusty oakleaf" />
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
  clearSuccess: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = {
  choozByList,
  clearSuccess,
  clearErrors
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ListChoozer));
