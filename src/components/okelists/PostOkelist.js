import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

import { buildNewOkeList, clearErrors } from "../../redux/actions/dataActions";
import AddOkelistIcon from "../icons/AddOkelistIcon";
import OwlFuseButton from "../../util/OwlFuseButton";
import CloseIcon from "../icons/CloseIcon";
// MUI Stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
    ...theme.themeMinusPalette,
    submitButton: {
      position: "relative",
      margin: '10px auto'
    },
    progressSpinner: {
      position: "absolute"
    },
    closeButton: {
      position: "absolute",
      left: "80%",
      top: "2%"
    },
    textField: {
        textAlign: 'center'
    }
  });

class PostOkelist extends Component {
  state = {
    open: false,
    listName: '',
    description: '',
    errors: {}
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors
      });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({
        listName: '',
        description: '',
        open: false,
        errors: {}
      });
    }
  }
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false, errors: {} });
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    this.props.buildNewOkeList({
      listName: this.state.listName,
      description: this.state.description
    });
  };

  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading }
    } = this.props;
    return (
      <Fragment>
        <OwlFuseButton onClick={this.handleOpen} tip="COMPOSE A NEW OKE LIST">
          <AddOkelistIcon className="icon5 rusty oakleaf" />
        </OwlFuseButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <OwlFuseButton
            tip="CLOSE"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon className="rust"/>
          </OwlFuseButton>
          <DialogTitle variant="h5" className="rusty">CREATE AN OKE LIST</DialogTitle>
          <DialogContent className="oke-border">
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="listName"
                type="text"
                label="THE NAME OF YOUR OKE LIST"
                placeholder="OKE LIST NAME"
                error={errors.okeList ? true : false}
                helperText={errors.okeList}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="description"
                type="text"
                label="DESCRIBE YOUR OKE LIST"
                placeholder="A BRIEF DESCRIPTION"
                multiline
                rows="3"
                error={errors.description ? true : false}
                helperText={errors.description}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <hr />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
              >
                DONE
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

PostOkelist.propTypes = {
  buildNewOkeList: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  UI: state.UI
});

const mapActionsToProps = {
  buildNewOkeList,
  clearErrors
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(PostOkelist));
