import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import OwlFuseButton from "../../util/OwlFuseButton";
import AddSparkIcon from "../icons/AddSparkIcon";
import CloseIcon from "../icons/CloseIcon";
import SparkImage from './SparkImage';
import SparkVideo from './SparkVideo';
//MUI Stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from '@material-ui/core/DialogActions';
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
    top: "4%",
    color: "#f4db9d"
  },
  textField: {
      textAlign: 'center'
  },
  mediaButtons: {
    display: 'flex',
    justifyContent: 'space-around'
  }
});

class PostSpark extends Component {
  state = {
    open: false,
    mediaOpen: false,
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

  openMediaPanel = (sparkID) => {
      this.setState({ sparkID, mediaOpen: true });
  }

  closeMediaPanel = () => {
    this.setState({ mediaOpen: false });
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
      this.props.postSpark({ body: this.state.body });
      setTimeout(() => this.openMediaPanel(this.props.sparkID), 2000);
  }
  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading }
    } = this.props;
    return (
      <Fragment>
        <OwlFuseButton onClick={this.handleOpen} tip="SPARK AN INTEREST">
          <AddSparkIcon className="icon5 rust oaky"/>
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
            <CloseIcon className="orange"/>
          </OwlFuseButton>
          <DialogTitle variant="h5" className="orng">POST A NEW SPARK</DialogTitle>
          <DialogContent className="orange-border">
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                label="SPARK AN INTEREST"
                multiline
                rows="3"
                placeholder="SPARK IT"
                error={errors.spark ? true : false}
                helperText={errors.spark}
                className={`${this.props.classes.textField} ${this.props.classes.displayLinebreaks}`}
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
        <Dialog
        open={this.state.mediaOpen}
        onClose={this.closeMediaPanel}
        fullWidth
        maxWidth="sm">
          <DialogTitle variant="h5" className="orng">DO YOU WANT TO ADD EXTRA ELEMENTS TO YOUR SPARK?</DialogTitle>
          <DialogContent className={classes.mediaButtons}>
            <SparkImage sparkID={this.state.sparkID}/>
            <SparkVideo sparkID={this.state.sparkID}/>
          </DialogContent>
          <DialogActions>
          <Button onClick={this.closeMediaPanel} color="primary" variant="contained">
              <strong className="orange">DONE</strong>
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

PostSpark.propTypes = {
  postSpark: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
  sparkID: PropTypes.string
};

const mapStateToProps = state => ({
  UI: state.UI,
  sparkID: state.data.sparkID
});

export default connect(
  mapStateToProps,
  { postSpark, clearErrors }
)(withStyles(styles)(PostSpark));