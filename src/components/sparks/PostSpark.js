import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import OwlFuseButton from "../../util/OwlFuseButton";
import AddSparkIcon from "../icons/AddSparkIcon";
import CloseIcon from "../icons/CloseIcon";
//MUI Stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
// Redux Stuff
import { connect } from "react-redux";
import { postSpark, clearErrors } from "../../redux/actions/dataActions";

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
    top: "4%"
  },
  textField: {
      textAlign: 'center'
  }
});

class PostSpark extends Component {
  state = {
    open: false,
    body: "",
    errors: {}
  };
  
  UNSAFE_componentWillReceiveProps(nextProps){
      if(nextProps.UI.errors){
          this.setState({
              errors: nextProps.UI.errors
          })
      }
      if(!nextProps.UI.errors && !nextProps.UI.loading){
          this.setState({ body: '', open: false, errors: {} })
      }
  }

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false, errors: {} });
  };
  handleChange = (event) => {
      this.setState({ [event.target.name]: event.target.value})
  }
  handleSubmit = (event) => {
      event.preventDefault();
      this.props.lightSpark({ body: this.state.body })
  }
  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading }
    } = this.props;
    return (
      <Fragment>
        <OwlFuseButton onClick={this.handleOpen} tip="POST A SPARK">
          <AddSparkIcon />
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
            <CloseIcon/>
          </OwlFuseButton>
          <DialogTitle variant="h5">POST A NEW SPARK</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                label="SPARK AN INTEREST"
                multiline
                rows="6"
                placeholder="SPARK IT"
                error={errors.spark ? true : false}
                helperText={errors.spark}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
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

PostSpark.propTypes = {
  postSpark: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  UI: state.UI
});

export default connect(
  mapStateToProps,
  { postSpark, clearErrors }
)(withStyles(styles)(PostSpark));