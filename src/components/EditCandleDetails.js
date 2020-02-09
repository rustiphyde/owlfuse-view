import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import OwlFuseButton from '../util/OwlFuseButton';
import EditDetailsIcon from './icons/EditDetailsIcon';
//MUI Stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
// Redux Stuff
import { connect } from "react-redux";
import { editUserDetails } from "../redux/actions/userActions";

const styles = {
  button: {
      float: 'right',
      
  },
  dialog: {
      padding: 16,
  borderRadius: "32px"
},
form: {
    padding: 16
},
title: {
    color: '#ff9800',
    textAlign: 'center'
}
};

class EditDetails extends Component {
  state = {
    bio: "",
    website: "",
    location: "",
    open: false
  };
  mapUserDetailsToState = credentials => {
    this.setState({
      bio: credentials.bio ? credentials.bio : "",
      website: credentials.website ? credentials.website : "",
      location: credentials.location ? credentials.location : ""
    });
  };
  handleOpen = () => {
    this.setState({ open: true });
    this.mapUserDetailsToState(this.props.credentials);
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  componentDidMount() {
    const { credentials } = this.props;
    this.mapUserDetailsToState(credentials);
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleSubmit = () => {
    const userDetails = {
      bio: this.state.bio,
      website: this.state.website,
      location: this.state.location
    };
    this.props.editUserDetails(userDetails);
    this.handleClose();
  };
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
          <OwlFuseButton tip="EDIT CANDLE DETAILS" onClick={this.handleOpen} btnClassName={classes.button}>
            <EditDetailsIcon color="primary" className="icon orange"/>
          </OwlFuseButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxwidth="sm"
        >
          <DialogTitle className="orng">Edit Your Details</DialogTitle>
          <DialogContent className="orange-border">
            <form>
              <TextField
                name="bio"
                type="text"
                label="Bio"
                multiline
                rows="3"
                placeholder="A short bio about yourself"
                className={classes.textField}
                value={this.state.bio}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="website"
                type="text"
                label="Website"
                placeholder="Your personal/professional website URL"
                className={classes.textField}
                value={this.state.website}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="location"
                type="text"
                label="Location"
                placeholder="Where you live"
                className={classes.textField}
                value={this.state.location}
                onChange={this.handleChange}
                fullWidth
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              CANCEL
            </Button>
            <Button onClick={this.handleSubmit} color="secondary">
              SAVE
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  credentials: state.user.credentials
});

export default connect(
  mapStateToProps,
  { editUserDetails }
)(withStyles(styles)(EditDetails));